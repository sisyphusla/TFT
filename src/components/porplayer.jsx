import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './porplayer.scss'
import grandmaster from '../assets/grandmaster.webp'
import challenger from '../assets/challenger.webp'
import Loading from './loading'

function renderTierImage(tier) {
  switch (tier) {
    case 'CHALLENGER':
      return <img src={challenger} alt="challenger" />;
    case 'GRANDMASTER':
      return <img src={grandmaster} alt="grandmaster" />;
    default:
      return <span>{tier}</span>;
  }
}

function ProPlayer() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/fetchTopPlayer.js');
        const data = response.data;
        setPlayers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className='proPlayer'>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Tier</th>
            <th>LP</th>
            <th>Wins</th>
            <th>Played</th>
            <th>Top4 %</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => {
            const winRatio = ((player.wins / (player.wins + player.losses)) * 100).toFixed(2);
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{player.summonerName}</td>
                <td>{renderTierImage(player.tier)}</td>
                <td>{player.leaguePoints}</td>
                <td>{player.wins}</td>
                <td>{player.wins + player.losses}</td>
                <td>{winRatio}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProPlayer;
