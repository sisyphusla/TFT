import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const CACHE_KEY = 'summonerDataCache';
const CACHE_EXPIRATION = 60 * 1000; // 1 minute in milliseconds

const useSummonerData = () => {
  const [summonerData, setSummonerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSummonerData = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cachedTime = localStorage.getItem(CACHE_KEY + '_time');

      if (!forceRefresh && cachedData && cachedTime) {
        const now = new Date().getTime();
        if (now - parseInt(cachedTime) < CACHE_EXPIRATION) {
          setSummonerData(JSON.parse(cachedData));
          setLoading(false);
          return;
        }
      }

      const response = await axios.get('https://tft-api-mix.playerlist.workers.dev/', {
        headers: {
          'Content-Type': 'application/json'
        },
        cache: 'no-cache' // 防止瀏覽器緩存
      });

      setSummonerData(response.data.data);
      localStorage.setItem(CACHE_KEY, JSON.stringify(response.data.data));
      localStorage.setItem(CACHE_KEY + '_time', new Date().getTime().toString());
      setError(null);
    } catch (error) {
      console.error('Error fetching summoner data:', error);
      setError('Failed to fetch summoner data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummonerData();
  }, [fetchSummonerData]);

  const refreshData = () => {
    fetchSummonerData(true);
  };

  return { summonerData, loading, error, refreshData };
};

export default useSummonerData;