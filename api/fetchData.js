import axios from 'axios';
import { readFileSync } from 'fs';
import path from 'path';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async (req, res) => {
  /* https://vercel.com/guides/how-can-i-use-files-in-serverless-functions */
  const file = path.join(process.cwd(), 'src', 'components', 'playerList.json');
  const jsonString = readFileSync(file, 'utf8');
  const playerList = JSON.parse(jsonString);
  const apiKey = process.env.VITE_API_KEY;

  try {
    let allSummonerInfo = {};
    let countPerSecond = 0;
    let countPerTwoMinutes = 0;
    let startTime = Date.now();

    for (const team in playerList) {
      allSummonerInfo[team] = [];
      const teamMembers = playerList[team];
      const batch = [];

      for (const player of teamMembers) {
        if (countPerTwoMinutes >= 100) {
          // 兩分鐘100次限制
          const elapsedTime = Date.now() - startTime;
          const remainingTime = 120000 - elapsedTime; // 兩分鐘（12000毫秒）
          await delay(remainingTime);
          countPerTwoMinutes = 0;
          startTime = Date.now();
        }

        if (countPerSecond >= 20) {
          // 每秒20次的限制，延遲1秒
          await Promise.all(batch);
          await delay(1000);
          batch.length = 0;
          countPerSecond = 0;
        }

        const summonerId = player.id;
        batch.push(
          axios
            .get(
              `https://tw2.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerId}?api_key=${apiKey}`
            )
            .then((response) => {
              const data = response.data;
              const firstEntry = data[0] || {};
              const summonerInfo = {
                summonerName: firstEntry.summonerName,
                tier: firstEntry.tier || 'N/A',
                leaguePoints: firstEntry.leaguePoints,
              };
              allSummonerInfo[team].push(summonerInfo);
            })
        );

        countPerSecond++;
        countPerTwoMinutes++;
      }

      if (batch.length > 0) {
        await Promise.all(batch);
      }
    }

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json(allSummonerInfo);
  } catch (error) {
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).send('Internal Server Error');
  }
};
