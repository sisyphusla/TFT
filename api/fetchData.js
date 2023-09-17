import axios from 'axios';
import playerList from '../src/components/playerList.json' assert { type: 'json' };

export default async (req, res) => {
  try {
    const apiKey = process.env.VITE_API_KEY;
    let allSummonerInfo = {};
    let delay = 5;

    for (const team in playerList) {
      allSummonerInfo[team] = [];

      const teamMembers = playerList[team];

      for (const player of teamMembers) {
        const summonerId = player.id;

        const response = await axios.get(
          `https://tw2.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerId}?api_key=${apiKey}`
        );

        const data = response.data;
        const firstEntry = data[0] || {};

        const summonerInfo = {
          summonerName: firstEntry.summonerName,
          tier: firstEntry.tier || 'N/A',
          leaguePoints: firstEntry.leaguePoints,
        };

        allSummonerInfo[team].push(summonerInfo);
        await new Promise((resolve) => setTimeout(resolve, delay));
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
