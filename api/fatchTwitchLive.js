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
    console.error('Error:', error);
  }
};

export default async (req, res) => {
  const now = Date.now();
  if (cache && now - cacheTimestamp < 120000) {
    return res.status(200).send(cache);
  }

  const file = path.join(process.cwd(), 'src', 'components', 'playerList.json');
  const jsonString = readFileSync(file, 'utf8');
  const playerList = JSON.parse(jsonString);

  let allPromises = [];
  let currentBatch = [];

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  for (const team in playerList) {
    const teamMembers = playerList[team];
    for (const member of teamMembers) {
      const STREAMER_NAME = member.twitchId;
      if (STREAMER_NAME !== '#') {
        currentBatch.push(getStreamerStatus(STREAMER_NAME));
      }
      if (currentBatch.length >= 30) {
        allPromises.push(Promise.all(currentBatch));
        await sleep(60000);
        currentBatch = [];
      }
    }
  }

  if (currentBatch.length > 0) {
    allPromises.push(Promise.all(currentBatch));
  }

  try {
    const results = await Promise.all(allPromises);
    const flatResults = results.flat();
    cache = flatResults;
    cacheTimestamp = now;
    res.status(200).send(flatResults);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};
