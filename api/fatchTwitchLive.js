import axios from 'axios';
import { readFileSync } from 'fs';
import path from 'path';

let cache = {};
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
    const now = Date.now();
    if (data.data && data.data.length > 0) {
      cache[STREAMER_NAME] = now;
      return {
        streamerName: STREAMER_NAME,
      };
    } else {
      return; // 此處返回undefined
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const areAllStreamersCached = (playerList) => {
  for (const team in playerList) {
    const teamMembers = playerList[team];
    for (const member of teamMembers) {
      const STREAMER_NAME = member.twitchId;
      if (STREAMER_NAME !== '#' && !cache[STREAMER_NAME]) {
        return false;
      }
    }
  }
  return true;
};

export default async (req, res) => {
  const now = Date.now();
  const file = path.join(process.cwd(), 'src', 'components', 'playerList.json');
  const jsonString = readFileSync(file, 'utf8');
  const playerList = JSON.parse(jsonString);

  if (
    cache &&
    now - cacheTimestamp < 120000 &&
    areAllStreamersCached(playerList)
  ) {
    return res
      .status(200)
      .send(Object.keys(cache).map((name) => ({ streamerName: name })));
  }

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
    const flatResults = results.flat().filter((result) => result !== undefined);
    cacheTimestamp = now;
    res.status(200).send(flatResults);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};
