import axios from 'axios';

let cachedTop50Players = null;
let lastCacheTime = null;

let requestsPastSecond = 0;
let requestsPastTwoMinutes = 0;
let lastRequestTime = null;

export default async (req, res) => {
  const currentTime = Date.now();
  if (lastRequestTime) {
    if (currentTime - lastRequestTime > 1000) {
      requestsPastSecond = 0;
    }

    if (currentTime - lastRequestTime > 120000) {
      requestsPastTwoMinutes = 0;
    }
  }

  // 超過請求次數的限制
  if (requestsPastSecond >= 20 || requestsPastTwoMinutes >= 100) {
    return res.status(429).send('Too Many Requests');
  }

  // 檢查緩存
  if (cachedTop50Players && currentTime - lastCacheTime < 120000) {
    return res.status(200).json(cachedTop50Players);
  }

  const apiKey = process.env.VITE_API_KEY;
  const challengerUrl = `https://tw2.api.riotgames.com/tft/league/v1/challenger?api_key=${apiKey}`;
  const grandmasterUrl = `https://tw2.api.riotgames.com/tft/league/v1/grandmaster?api_key=${apiKey}`;

  try {
    const [challengerResponse, grandmasterResponse] = await Promise.all([
      axios.get(challengerUrl),
      axios.get(grandmasterUrl),
    ]);
    const challengerData = challengerResponse.data;
    const grandmasterData = grandmasterResponse.data;
    const challengerSummoners = challengerData.entries.map((summoner) => ({
      ...summoner,
      tier: challengerData.tier,
    }));

    const grandmasterSummoners = grandmasterData.entries.map((summoner) => ({
      ...summoner,
      tier: grandmasterData.tier,
    }));

    const allSummoners = [...challengerSummoners, ...grandmasterSummoners];

    const sortedSummoners = allSummoners.sort((a, b) => {
      return b.leaguePoints - a.leaguePoints;
    });

    const topPlayers = sortedSummoners.map((summonerData) => {
      return {
        tier: summonerData.tier,
        summonerName: summonerData.summonerName,
        leaguePoints: summonerData.leaguePoints,
        wins: summonerData.wins,
        losses: summonerData.losses,
      };
    });

    // 只保留前50名
    const top50Players = topPlayers.slice(0, 50);
    lastCacheTime = currentTime;

    res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate120');
    res.status(200).json(top50Players);
  } catch (error) {
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).send('Internal Server Error');
  }
};
