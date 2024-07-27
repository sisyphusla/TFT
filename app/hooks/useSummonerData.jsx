import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const CACHE_KEY = 'summonerDataCache';
const CACHE_EXPIRATION = 60 * 1000; // 1 minute in milliseconds

const API_URLS = [
  'https://tft-api-mix.playerlist.workers.dev/',
  'https://tft-api-worker1.playerlist.workers.dev/',
  'https://tft-api-worker2.playerlist.workers.dev/',
  'https://tft-api-worker3.playerlist.workers.dev/'
];

const useSummonerData = () => {
  const [summonerData, setSummonerData] = useState(null);
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

      let data = null;
      for (const url of API_URLS) {
        data = await fetchFromAPI(url);
        if (data && Object.keys(data).length > 0) {
          break;
        }
      }

      if (data && Object.keys(data).length > 0) {
        setSummonerData(data);
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        localStorage.setItem(CACHE_KEY + '_time', new Date().getTime().toString());
        setError(null);
      } else {
        setError('無法從任何 API 獲取完整數據');
      }
    } catch (error) {
      console.error('Error fetching summoner data:', error);
      setError('獲取召喚師數據失敗');
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