import { useState, useEffect } from 'react';
import axios from 'axios';

const useSummonerData = () => {
  const [summonerData, setSummonerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummonerData = async () => {
      try {
        const response = await axios.get('/api/fetchData');
        setSummonerData(response.data);
      } catch (error) {
        console.error('Error fetching summoner data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummonerData();
  }, []);

  return { summonerData, loading };
};

export default useSummonerData;
