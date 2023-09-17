import React, { useEffect, useState } from 'react';
import axios from 'axios';  // 導入 axios

function List() {

  const [summonerData, setSummonerData] = useState([]);

  useEffect(() => {
    const fetchSummonerData = async () => {
      try {
        const response = await axios.get('/api/fetchData');  // 使用 axios 的 get 方法
        const data = response.data;  // axios 會將響應數據存儲在 `data` 屬性中
        setSummonerData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSummonerData();
  }, []);

  return (
    <div>
      {Object.keys(summonerData).map((teamName) => (
        <div key={teamName} className="team">
          <h2>{teamName}</h2>
          <ul>
            {(summonerData[teamName] || []).map((member, index) => (
              <li key={index}>
                {member.summonerName} - {member.tier} - {member.leaguePoints}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default List;
