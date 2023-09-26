import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './list.scss'
import challenger from '../assets/challenger.webp'
import master from '../assets/master.webp'
import grandmaster from '../assets/grandmaster.webp'
import Loading from './loading'


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
  const [liveStreamers, setLiveStreamers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummonerData = async () => {
      try {
        // const response = await axios.get('src/components/ouo.json');
        // const response1 = await axios.get('src/components/twitch.json');
        const response = await axios.get('/api/fetchData.js');
        const response1 = await axios.get('/api/fatchTwitchLive.js');

        const data = response.data;
        const liveData = response1.data;
        setSummonerData(data);
        const liveNames = liveData.filter(item => item && item.streamerName).map((item) => item.streamerName);
        setLiveStreamers(liveNames);
        setLoading(false); // 數據加載完成後，設置loading狀態為false
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSummonerData();
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

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
            <h2 className='teamName'>{teamName}</h2>
            <ul>
              {(summonerData[teamName] || []).map((member, index) => (
                <li key={index} className="listItem">
                  <div className="itemName">{member.summonerName}
                  </div>
                  {/* 如果這個實況主正在直播，則顯示 "LIVE" 按鈕 */}
                  <div className={liveStreamers.includes(`${member.twitchId}`) ? 'liveBtnVisible' : 'liveBtnHidden'}>
                    <a href={`https://www.twitch.tv/${member.twitchId}`} target="_blank" rel="noopener noreferrer">
                      <button className='liveBtn'>LIVE</button>
                    </a>
                  </div>
                  <div className="itemPic">{renderTierImage(member.tier)}</div>
                  <div className="itemPoint">
                    <span className="pointNumber">{member.leaguePoints}</span>
                  </div>
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
