import React from 'react';
import '../style/porplayer.scss'
import useProPlayers from '../hooks/useProPlayers';
import Loading from './loading'
import TierImage from './tierImage'



function ProPlayer() {
  const { players, loading, error } = useProPlayers();
  if (loading) { return <Loading /> }

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
                <td><TierImage tier={player.tier} name={player.summonerName} /></td>
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
