import { useState, useEffect } from 'react';
import axios from 'axios';

const useProPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = import.meta.env.VITE_SECRET_KEY;
        const response = await axios.get('/api/fetchTopPlayer', {
          headers: {
            'x-api-key': api,
          },
        });

        const data = response.data;
        setPlayers(data);
      } catch (error) {
        setError(error);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { players, loading, error };
};

export default useProPlayers;
