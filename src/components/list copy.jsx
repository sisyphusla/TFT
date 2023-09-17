import React, { useEffect, useState } from 'react';
import playerList from './playerList.json'

function List() {
  const [summonerData, setSummonerData] = useState({});
  const requestLimitPerSecond = 20;
  const requestLimitPerTwoMinutes = 100;
  let requestsThisSecond = 0;
  let requestsThisTwoMinutes = 0;

  useEffect(() => {
    const fetchSummonerData = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;


      for (let teamName in playerList) {
        const members = playerList[teamName];
        let tempSummonerData = [];

        for (let i = 0; i < members.length; i++) {

          if (requestsThisSecond >= requestLimitPerSecond) {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            requestsThisSecond = 0;
          }

          if (requestsThisTwoMinutes >= requestLimitPerTwoMinutes) {
            await new Promise((resolve) => setTimeout(resolve, 60000));
            requestsThisTwoMinutes = 0;
          }

          const member = members[i];
          const response = await fetch(`/riotapi/tft/league/v1/entries/by-summoner/${member.id}?api_key=${apiKey}`);
          const data = await response.json();
          const firstEntry = data[0] || {};
          tempSummonerData.push({
            summonerName: firstEntry.summonerName,
            tier: firstEntry.tier || 'N/A',
            leaguePoints: firstEntry.leaguePoints,
          });

          requestsThisSecond++;
          requestsThisTwoMinutes++;

          setSummonerData((prevState) => {
            const newSummonerData = { ...prevState };
            newSummonerData[teamName] = tempSummonerData;
            return newSummonerData;
          });


        }
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
