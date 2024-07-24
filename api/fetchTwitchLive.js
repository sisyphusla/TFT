import axios from 'axios';
import { readFileSync } from 'fs';
import path from 'path';

let cache = null;
let cacheTimestamp = null;

const getStreamerStatus = async (STREAMER_NAME) => {
  const CLIENT_ID = process.env.VITE_TWITCH_CLIENT_ID;
  const OAUTH_TOKEN = process.env.VITE_TWITCH_OAUTH_TOKEN;

  if (STREAMER_NAME === '#') {
    return null;
  }

  try {
    const response = await axios.get(
      `https://api.twitch.tv/helix/streams?user_login=${STREAMER_NAME}`,
      {
        headers: {
          'Client-ID': CLIENT_ID,
          Authorization: `Bearer ${OAUTH_TOKEN}`,
        },
      }
    );

    const data = response.data;

    if (data.data && data.data.length > 0) {
      return {
        streamerName: STREAMER_NAME,
      };
    }
  } catch (error) {
    console.error('Error fetching streamer status:', error);
    throw error;
  }
};

export default async (req, res) => {
  const now = Date.now();
  if (cache && now - cacheTimestamp < 120000) {
    return res.status(200).send(cache);
  }

  const file = path.join(
    process.cwd(),
    'pages',
    'index',
    'components',
    'playerList.json'
  );
  const jsonString = readFileSync(file, 'utf8');
  const playerList = JSON.parse(jsonString);

  let allPromises = [];

  for (const team in playerList) {
    const teamMembers = playerList[team];
    teamMembers.forEach((member) => {
      const STREAMER_NAME = member.twitchId;
      if (STREAMER_NAME !== '#') {
        allPromises.push(getStreamerStatus(STREAMER_NAME));
      }
    });
  }

  try {
    const results = await Promise.allSettled(allPromises);
    const flatResults = results
      .filter(
        (result) => result.status === 'fulfilled' && result.value !== null
      )
      .map((result) => result.value);
    cache = flatResults;
    cacheTimestamp = now;

    res.setHeader(
      'Cache-Control',
      'max-age=0, s-maxage=120, stale-while-revalidate=120'
    );

    res.status(200).send(flatResults);
  } catch (error) {
    console.error('Error processing requests:', error);
    res.status(500).send('Internal Server Error');
  }
};
