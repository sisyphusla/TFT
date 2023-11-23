import React from 'react';
import Loading from './loading';
import TierImage from './tierImage';
import useSummonerData from '../hooks/useSummonerData';
import useLiveStreamers from '../hooks/useLiveStreamers';

function List() {
  const api = import.meta.env.VITE_SECRET_KEY;
  const { summonerData, loading } = useSummonerData(api);
  const liveStreamers = useLiveStreamers(api);

  if (loading) {
    return <Loading />
  }

  return (
    <div className='flex justify-center mb-[5vh] w-full'>
      {Object.keys(summonerData).map((teamName) => {
        const totalPoints = (summonerData[teamName] || []).reduce((sum, member) => {
          if (['CHALLENGER', 'GRANDMASTER', 'MASTER'].includes(member.tier)) {
            return sum + (member.leaguePoints || 0);
          }
          return sum;
        }, 0);

        return (
          <div key={teamName} className=" w-[20.5%] h-full m-[2vh] md:w-3/4 md:mx-auto">
            <h2 className='text-2xl font-bold m-2 leading-[2.5rem]'>{teamName}</h2>
            <div className='text-lg font-bold'>
              總分：{totalPoints} LP
            </div>
            <ul className='w-[90%] m-auto'>
              {(summonerData[teamName] || []).map((member, index) => (
                <li key={index} className="text-left m-[1vh] p-2 border border-black rounded-md h-[10vh] flex items-center justify-center w-full bg-[#e7e7ad] leading-5">
                  <div className="w-1/2 text-[1.1rem] leading-5 ">{member.nickName}</div>
                  <div className={liveStreamers.includes(`${member.twitchId}`) ? 'visible' : 'invisible'}>
                    <a href={`https://www.twitch.tv/${member.twitchId}`} target="_blank" rel="noopener noreferrer">
                      <button className='bg-red-500 text-white font-bold border-none rounded-md m-2 p-[4px_6px] cursor-pointer'>LIVE</button>
                    </a>
                  </div>
                  <div className="itemPic w-[60px]">
                    <TierImage tier={member.tier} name={member.summonerName} />
                  </div>
                  <div className="w-[21%] text-center">
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
