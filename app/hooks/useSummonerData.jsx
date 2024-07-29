import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URLS = [
  'https://tft-api-worker3.playerlist.workers.dev/',
  'https://tft-api-worker2.playerlist.workers.dev/',
  'https://tft-api-worker1.playerlist.workers.dev/',
];

// const API_URLS = [
//   'https://tft-api-mix.playerlist.workers.dev/',
// ];

const useSummonerData = () => {
  const [summonerData, setSummonerData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFromAPI = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        cache: 'no-cache'
      });
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching from ${url}:`, error);
      return null;
    }
  };

  const fetchSummonerData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const results = await Promise.all(API_URLS.map(url => fetchFromAPI(url)));

    const mergedData = results.reduce((acc, result) => {
      if (result && Object.keys(result).length > 0) {
        Object.keys(result).forEach(teamName => {
          if (!acc[teamName]) {
            acc[teamName] = [];
          }
          acc[teamName] = [...acc[teamName], ...result[teamName]];
        });
      }
      return acc;
    }, {});

    if (Object.keys(mergedData).length > 0) {
      setSummonerData(mergedData);
    } else {
      setError('無法從任何 API 獲取數據');
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSummonerData();
  }, [fetchSummonerData]);

  const refreshData = () => {
    fetchSummonerData();
  };

  return { summonerData, loading, error, refreshData };
};

export default useSummonerData;