import { useState, useEffect } from 'react';
import axios from 'axios';

const useLiveStreamers = () => {
  const [liveStreamers, setLiveStreamers] = useState([]);

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const response = await axios.get('https://tft-api-twitch.playerlist.workers.dev/');
        setLiveStreamers(response.data.liveStreamers || []);
      } catch (error) {
        console.error('Error fetching live stream data:', error);
        setLiveStreamers([]);
      }
    };
    fetchLiveData();
  }, []);

  return liveStreamers;
};

export default useLiveStreamers;