import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './list.scss'
import diamond from '../assets/diamond.png'
import master from '../assets/master.png'
import grandmaster from '../assets/grandmaster.png'
import challenger from '../assets/challenger.png'


function renderTierImage(tier) {
  switch (tier) {
    case 'CHALLENGER':
      return <img src={challenger} alt="challenger" />;
    case 'GRANDMASTER':
      return <img src={grandmaster} alt="grandmaster" />;
    case 'MASTER':
      return <img src={master} alt="master" />;
    case 'DIAMOND':
      return <img src={diamond} alt="diamond" />;
    default:
      return <span>{tier}</span>;
  }
}

function List() {
  const [summonerData, setSummonerData] = useState([]);

  useEffect(() => {
    const fetchSummonerData = async () => {
      try {
        const response = await axios.get('/api/fetchData.js');
        const data = response.data;
        setSummonerData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSummonerData();
  }, []);

  return (
    <div className='container'>
      {Object.keys(summonerData).map((teamName) => {
        // 計算該team的總分數，但排除 "tier" 為 "DIAMOND" 的玩家
        const totalPoints = (summonerData[teamName] || []).reduce((sum, member) => {
          if (member.tier !== 'DIAMOND') {
            return sum + (member.leaguePoints || 0);
          }
          return sum;
        }, 0);

        return (
          <div key={teamName} className="team">
            <h2>{teamName}</h2>
            <ul>
              {(summonerData[teamName] || []).map((member, index) => (
                <li key={index} className="listItem">
                  <div className="itemName">{member.summonerName}</div>
                  <div className="itemPic">{renderTierImage(member.tier)}</div>
                  <div className="itemPoint">{member.leaguePoints} LP</div>
                </li>
              ))}
            </ul>
            <div className='totalPoint'>
              總分：{totalPoints} LP
            </div>
          </div>
        );
      })}
    </div>
  );
}


export default List;
