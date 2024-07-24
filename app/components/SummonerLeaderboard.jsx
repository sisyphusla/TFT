'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Loading from './Loading';
import TierImage from './TierImage';
import useSummonerData from '../hooks/useSummonerData';
import GradientBackground from './GradientBackground';

const HIGH_TIERS = ['CHALLENGER', 'GRANDMASTER', 'MASTER'];

const MemberItem = React.memo(({ member }) => (
  <motion.li
    className="bg-gradient-to-b from-[rgba(253,226,228,0.7)] to-[rgba(255,241,230,0.7)] backdrop-blur-sm border border-gray-200 rounded-lg shadow-md p-2 flex items-center transition-all duration-300 hover:shadow-lg text-sm mb-2"
    whileHover={{ scale: 1.02 }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="flex items-center w-full">
      <div className="w-3/5 pr-2 flex items-center">
        <h3 className="font-bold text-gray-800 truncate text-left">{member.summonerName}</h3>
      </div>
      <div className="w-1/5 flex justify-center">
        <TierImage tier={member.tier} name={member.summonerName} className="w-6 h-6" />
      </div>
      <div className="w-1/5 text-center">
        <span className="font-bold text-[#FF4655] whitespace-nowrap">
          {member.leaguePoints !== undefined ? `${member.leaguePoints} ` : 'N/A'}
        </span>
      </div>
    </div>
  </motion.li>
));

const TeamItem = React.memo(({ team }) => (
  <div className="bg-gradient-to-b from-[rgba(253,226,228,0.3)] to-gray-50 rounded-xl shadow-lg p-4 border border-gray-100 flex flex-col">
    <h2 className='text-lg font-bold text-gray-800 mb-2'>{team.teamName}</h2>
    <div className='text-sm font-semibold text-[#FF4655] mb-4'>總分：{team.totalPoints} LP</div>
    <ul className='space-y-2'>
      {team.members.map((member, memberIndex) => (
        <MemberItem key={memberIndex} member={member} />
      ))}
    </ul>
  </div>
));

function SummonerLeaderboard() {
  const { summonerData, loading } = useSummonerData();

  const sortedTeams = useMemo(() => {
    if (!summonerData) return [];
    return Object.entries(summonerData)
      .map(([teamName, members]) => ({
        teamName,
        members,
        totalPoints: members.reduce((sum, member) =>
          HIGH_TIERS.includes(member.tier) ? sum + (parseInt(member.leaguePoints) || 0) : sum, 0)
      }))
      .sort((a, b) => b.totalPoints - a.totalPoints);
  }, [summonerData]);

  return (
    <GradientBackground>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">台服S12分組衝分賽</h1>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Loading />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {sortedTeams.map((team, index) => (
              <TeamItem key={team.teamName} team={team} />
            ))}
          </div>
        )}
      </div>
    </GradientBackground>
  );
}

export default React.memo(SummonerLeaderboard);