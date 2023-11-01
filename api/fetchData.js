import axios from 'axios';
import { readFileSync } from 'fs';
import path from 'path';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 定義全局變量作為緩存
let allSummonerInfoCache = null;
let lastFetched = null;

export default async (req, res) => {
  // 檢查是否有緩存
  const now = Date.now();
  if (allSummonerInfoCache && now - lastFetched < 120000) {
    return res.status(200).json(allSummonerInfoCache);
  }

  /* https://vercel.com/guides/how-can-i-use-files-in-serverless-functions */
  const file = path.join(process.cwd(), 'src', 'components', 'playerList.json');
  const jsonString = readFileSync(file, 'utf8');
  const playerList = JSON.parse(jsonString);
  const apiKey = process.env.VITE_API_KEY;

  try {
    let allSummonerInfo = {};
    let countPerTenSecond = 0;
    let countPerTenMinutes = 0;
    let startTime = Date.now();

    for (const team in playerList) {
      allSummonerInfo[team] = Array(playerList[team].length).fill(null);
      const teamMembers = playerList[team];
      const batch = [];

      for (let i = 0; i < teamMembers.length; i++) {
        const player = teamMembers[i];
        if (countPerTenMinutes >= 30000) {
          // 十分鐘30000次限制
          const elapsedTime = Date.now() - startTime;
          const remainingTime = 600000 - elapsedTime; // 10分鐘（60000毫秒）
          await delay(remainingTime);
          countPerTenMinutes = 0;
          startTime = Date.now();
        }

        if (countPerTenSecond >= 500) {
          // 每十秒500次的限制，延遲0.5秒
          await Promise.all(batch);
          await delay(500);
          batch.length = 0;
          countPerTenSecond = 0;
        }

        const summonerId = player.id;
        batch.push(
          axios
            .get(
              `https://tw2.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerId}?api_key=${apiKey}`
            )
            .then((response) => {
              const data = response.data;
              // 找到queueType為RANKED_TFT的物件避免撈到非rank的資料
              const tftEntry =
                data.find((entry) => entry.queueType === 'RANKED_TFT') || {};
              const summonerInfo = {
                summonerName: tftEntry.summonerName,
                tier: tftEntry.tier || 'N/A',
                leaguePoints: tftEntry.leaguePoints,
                twitchId: player.twitchId,
              };
              allSummonerInfo[team][i] = summonerInfo;
            })
        );

        countPerTenSecond++;
        countPerTenMinutes++;
      }

      if (batch.length > 0) {
        await Promise.all(batch);
      }
    }
    // 成功獲取數據後更新緩存
    allSummonerInfoCache = allSummonerInfo;
    lastFetched = now;
    /* https://vercel.com/docs/functions/serverless-functions/edge-caching */
    /* vercel的Cache-Control設置策略 */
    res.setHeader(
      'Cache-Control',
      'max-age=0, s-maxage=60, stale-while-revalidate=60'
    );
    res.status(200).json(allSummonerInfo);
  } catch (error) {
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).send('Internal Server Error');
  }
};
