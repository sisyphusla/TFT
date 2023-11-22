import React from 'react';
import '../style/list.scss'
import Loading from './loading'
import TierImage from './tierImage'
import useSummonerData from '../hooks/useSummonerData';
import useLiveStreamers from '../hooks/useLiveStreamers';



function List() {

  const api = import.meta.env.VITE_SECRET_KEY;
  const { summonerData, loading } = useSummonerData(api);
  const liveStreamers = useLiveStreamers(api);


  if (loading) { return <Loading /> }

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
            <div className='totalPoint'>
              總分：{totalPoints} LP
            </div>
            <ul>
              {(summonerData[teamName] || []).map((member, index) => (
                <li key={index} className="listItem">
                  <div className="itemName">{member.nickName}
                  </div>
                  {/* 如果這個實況主正在直播，則顯示 "LIVE" 按鈕 */}
                  <div className={liveStreamers.includes(`${member.twitchId}`) ? 'liveBtnVisible' : 'liveBtnHidden'}>
                    <a href={`https://www.twitch.tv/${member.twitchId}`} target="_blank" rel="noopener noreferrer">
                      <button className='liveBtn'>LIVE</button>
                    </a>
                  </div>
                  <div className="itemPic">
                    <TierImage tier={member.tier} name={member.summonerName} />
                  </div>
                  <div className="itemPoint">
                    <span className="pointNumber">{member.leaguePoints}</span>
                  </div>
                </li>
              ))}
            </ul>

          </div>
        );
      })}
    </div>
  );
}


export default React.memo(List);
