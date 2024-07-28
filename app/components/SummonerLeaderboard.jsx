'use client';
import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import TierImage from './TierImage';
import useSummonerData from '../hooks/useSummonerData';
import useLiveStreamers from '../hooks/useLiveStreamers';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

const HIGH_TIERS = ['CHALLENGER', 'GRANDMASTER', 'MASTER'];

const INITIAL_TEAM_DATA = {
  "TERRY隊": ["terrytft", "Fallhalp", "Wingnism", "Phantasm殺手", "摘星旅人", "2017FIFA", "貝貝豬頭皮", "loveactually"],
  "綠茶隊": ["Greentea喝綠茶", "小娜啊", "摸雞MoGG", "偶爾愛你", "I3ubb1e", "妳家祖祠留給你住", "地瓜QQBALL", "一窩六口"],
  "白龍隊": ["白龍1", "AQ1H", "河川先子", "電競損手", "小青蛙與呱", "二等兵", "WHAT CAN I DO", "花花 毛毛 泡泡"],
  "花輪隊": ["花輪同學", "K寶寶生氣了", "鐵之硬沼", "Ajoe1231", "blackbigbig", "我只會打星海", "Feelzacman", "爆豪1"],
  "拿鐵隊": ["Latte喝拿鐵", "不能沒有你", "天晴Haruru", "懷疑Owo小熊", "請給我一個面子Ð", "樺樺98", "Cute SUP O v O b", "罵慧 MurrayTFT", "白帶1"],
};

const MemberItem = React.memo(({ member, data, liveStreamer }) => (
  <motion.div
    className="grid grid-cols-[1fr_auto] sm:grid-cols-[minmax(0,1fr)_auto] items-center gap-2 py-2"
    whileHover={{
      scale: 1.05,
      rotateX: 10,
      transition: { duration: 0.3 },
    }}
    style={{ transformStyle: "preserve-3d" }}
  >
    <motion.div
      className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 min-w-0"
      style={{ transformStyle: "preserve-3d" }}
    >
      <h3 className="text-sm font-medium truncate sm:overflow-visible sm:whitespace-normal sm:line-clamp-2" title={member}>
        {member}
      </h3>
      {liveStreamer && (
        <a href={`https://www.twitch.tv/${liveStreamer.streamerName}`} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 w-fit">
          <span className='animate-pulse bg-[#9146FF] text-white text-xs font-bold px-2 py-1 rounded-full'>Live</span>
        </a>
      )}
    </motion.div>
    <motion.div
      className="flex items-center space-x-2 justify-end"
      style={{ transformStyle: "preserve-3d" }}
    >
      <Avatar className="h-8 w-8 flex-shrink-0">
        {data ? <TierImage tier={data.tier} name={member} /> : <Skeleton className="h-full w-full rounded-full" />}
      </Avatar>
      <Badge
        variant="secondary"
        className="w-16 inline-block font-mono text-center flex-shrink-0"
      >
        {data ? `${data.leaguePoints}` : <Skeleton className="h-4 w-full" />}
      </Badge>
    </motion.div>
  </motion.div>
));

const TeamItem = React.memo(({ teamName, members, summonerData, liveStreamers }) => {
  const sortedMembers = useMemo(() => {
    if (!summonerData || !summonerData[teamName]) return members;

    const highTierMembers = [];
    const otherMembers = [];

    members.forEach(member => {
      const data = summonerData[teamName].find(m => m.summonerName === member);
      if (data && HIGH_TIERS.includes(data.tier)) {
        highTierMembers.push({ member, leaguePoints: parseInt(data.leaguePoints) || 0 });
      } else {
        otherMembers.push(member);
      }
    });

    highTierMembers.sort((a, b) => b.leaguePoints - a.leaguePoints);

    return [...highTierMembers.map(m => m.member), ...otherMembers];
  }, [teamName, members, summonerData]);

  const totalPoints = useMemo(() => {
    if (!summonerData || !summonerData[teamName]) return 0;
    return members.reduce((sum, member) => {
      const data = summonerData[teamName].find(m => m.summonerName === member);
      return HIGH_TIERS.includes(data?.tier) ? sum + (parseInt(data?.leaguePoints) || 0) : sum;
    }, 0);
  }, [teamName, members, summonerData]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-sm sm:text-base">
          <span>{teamName}</span>
          <Badge variant="default" className="text-xs sm:text-sm">
            總分：{summonerData && summonerData[teamName] ? `${totalPoints} LP` : <Skeleton className="h-4 w-16 inline-block" />}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {sortedMembers.map((member, memberIndex) => (
            <MemberItem
              key={memberIndex}
              member={member}
              data={summonerData && summonerData[teamName] ? summonerData[teamName].find(m => m.summonerName === member) : null}
              liveStreamer={liveStreamers.find(streamer => streamer.playerName === member)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

function SummonerLeaderboard() {
  const { summonerData } = useSummonerData();
  const liveStreamers = useLiveStreamers();

  const sortedTeams = useMemo(() => {
    return Object.entries(INITIAL_TEAM_DATA)
      .map(([teamName, members]) => ({
        teamName,
        members,
        totalPoints: summonerData && summonerData[teamName] ? members.reduce((sum, member) => {
          const data = summonerData[teamName].find(m => m.summonerName === member);
          return HIGH_TIERS.includes(data?.tier) ? sum + (parseInt(data?.leaguePoints) || 0) : sum;
        }, 0) : 0
      }))
      .sort((a, b) => b.totalPoints - a.totalPoints);
  }, [summonerData]);

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8 text-black">台服 S12 分組衝分賽</h1>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 5,
            stiffness: 100,
            restDelta: 0.001
          }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4"
      >
        {sortedTeams.map((team) => (
          <TeamItem
            key={team.teamName}
            teamName={team.teamName}
            members={team.members}
            summonerData={summonerData}
            liveStreamers={liveStreamers}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default React.memo(SummonerLeaderboard);