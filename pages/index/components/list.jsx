import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './list.scss'


import Loading from './loading'
import TierImage from './tierImage'



function List() {
  const [summonerData, setSummonerData] = useState([]);
  const [liveStreamers, setLiveStreamers] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchSummonerData = async () => {
      try {
        const api = import.meta.env.VITE_SECRET_KEY;
        const dataPromise = axios.get('/api/fetchData', {
          headers: {
            'x-api-key': api,
          },
        });
        const liveDataPromise = axios.get('/api/fetchTwitchLive', {
          headers: {
            'x-api-key': api,
          },
        });

        const dataResponse = await dataPromise;
        const data = dataResponse.data;
        setSummonerData(data);
        setLoading(false);

        const liveDataResponse = await liveDataPromise;
        const liveData = liveDataResponse.data;
        const liveNames = liveData.filter(item => item && item.streamerName).map((item) => item.streamerName);
        setLiveStreamers(liveNames);
      } catch (error) {
        console.error('Error fetching summoner data:', error);
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
        // 計算該team的總分數，但排除大師以下玩家
        const totalPoints = (summonerData[teamName] || []).reduce((sum, member) => {
          if (['CHALLENGER', 'GRANDMASTER', 'MASTER'].includes(member.tier)) {
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
                  <div className="itemPic">
                    <TierImage tier={member.tier} />
                  </div>
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


export default React.memo(List);
