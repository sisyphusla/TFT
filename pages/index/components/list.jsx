import React from 'react';
import Loading from './loading';
import TierImage from './tierImage';
import useSummonerData from '../hooks/useSummonerData';
import useLiveStreamers from '../hooks/useLiveStreamers';
import '../style/list.scss'

function List() {
  const api = import.meta.env.VITE_SECRET_KEY;
  const { summonerData, loading } = useSummonerData(api);
  const liveStreamers = useLiveStreamers(api);

  if (loading) {
    return <Loading />
  }
  const style = {
    boxShadow: 'inset 0px 0px 10px rgba(0, 0, 0, 0.5)'
  };

  return (
    <div className='flex justify-center mb-[5vh] w-[100%] m-auto rounded-xl shadow-bg-3d listContainer bg-slate-50/20'>
      {Object.keys(summonerData).map((teamName) => {
        const totalPoints = (summonerData[teamName] || []).reduce((sum, member) => {
          if (['CHALLENGER', 'GRANDMASTER', 'MASTER'].includes(member.tier)) {
            return sum + (member.leaguePoints || 0);
          }
          return sum;
        }, 0);

        return (
          <div key={teamName} className="w-1/6 h-full m-[2vh] md:w-1/2 team">
            <h2 className='text-2xl font-bold m-2 leading-[2.5rem]'>{teamName}</h2>
            <div className='text-lg font-bold'>
              總分：{totalPoints} LP
            </div>
            <ul className='w-[100%] m-auto'>
              {(summonerData[teamName] || []).map((member, index) => (
                <li key={index} className="shadow-3d text-left m-[1vh] p-2 rounded-md h-[9vh] flex items-center justify-center w-[100%] bg-[#c6d9ec] leading-5">
                  <div className="w-1/2 text-[1rem] leading-5 ">{member.nickName}</div>
                  <div className={liveStreamers.includes(`${member.twitchId}`) ? 'visible' : 'invisible '}>
                    <a href={`https://www.twitch.tv/${member.twitchId}`} target="_blank" rel="noopener noreferrer">
                      <button className='animate-heartbeat bg-red-500 text-white font-bold border-none rounded-sm m-1 p-[1px_3px] cursor-pointer shadow-btn-3d'>LIVE</button>
                    </a>
                  </div>
                  <div className="itemPic w-[50px]">
                    <TierImage tier={member.tier} name={member.summonerName} />
                  </div>
                  <div className="w-[25%] text-center">
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
