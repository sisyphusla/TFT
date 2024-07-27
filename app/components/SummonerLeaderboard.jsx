'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import TierImage from './TierImage';
import useSummonerData from '../hooks/useSummonerData';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

const HIGH_TIERS = ['CHALLENGER', 'GRANDMASTER', 'MASTER'];

const INITIAL_TEAM_DATA = {
  "白龍隊": ["白龍1", "AQ1H", "河川先子", "電競損手", "依居居", "二等兵", "WHAT CAN I DO", "花花 毛毛 泡泡"],
  "拿鐵隊": ["Latte喝拿鐵", "不能沒有你", "天晴Haruru", "懷疑Owo小熊", "請給我一個面子Ð", "樺樺98", "Cute SUP O v O b", "罵慧 MurrayTFT", "白帶1"],
  "花輪隊": ["花輪同學", "K寶寶生氣了", "鐵之硬沼", "Ajoe1231", "blackbigbig", "我只會打星海", "Feelzacman", "爆豪1"],
  "TERRY隊": ["terrytft", "Fallhalp", "Wingnism", "Phantasm殺手", "摘星旅人", "2017FIFA", "貝貝豬頭皮", "loveactually"],
  "綠茶隊": ["Greentea喝綠茶", "小娜啊", "摸雞MoGG", "偶爾愛你", "夏沫沫ÜÜ", "妳家祖祠留給你住", "地瓜QQBALL", "一窩六口"]
};

const MemberItem = React.memo(({ member, data }) => (
  <div className="flex items-center space-x-2 py-2">
    <Avatar className="h-8 w-8">
      {data ? <TierImage tier={data.tier} /> : <Skeleton className="h-full w-full rounded-full" />}
    </Avatar>
    <div className="flex-1">
      <h3 className="text-sm font-medium">{member}</h3>
    </div>
    <div className="min-w-[0px] text-right">
      <Badge
        variant="secondary"
        className="w-full inline-block font-mono"
      >
        {data ? `${data.leaguePoints} LP` : <Skeleton className="h-4 w-full" />}
      </Badge>
    </div>
  </div>
));

const TeamItem = React.memo(({ teamName, members, summonerData }) => {
  const totalPoints = useMemo(() => {
    if (!summonerData) return 0;
    return members.reduce((sum, member) => {
      const data = summonerData[teamName]?.find(m => m.summonerName === member);
      return HIGH_TIERS.includes(data?.tier) ? sum + (parseInt(data?.leaguePoints) || 0) : sum;
    }, 0);
  }, [teamName, members, summonerData]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-sm sm:text-base">
          <span>{teamName}</span>
          <Badge variant="default" className="text-xs sm:text-sm">
            總分：{summonerData ? `${totalPoints} LP` : <Skeleton className="h-4 w-16 inline-block" />}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {members.map((member, memberIndex) => (
            <MemberItem
              key={memberIndex}
              member={member}
              data={summonerData ? summonerData[teamName]?.find(m => m.summonerName === member) : null}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

function SummonerLeaderboard() {
  const { summonerData } = useSummonerData();

  const sortedTeams = useMemo(() => {
    return Object.entries(INITIAL_TEAM_DATA)
      .map(([teamName, members]) => ({
        teamName,
        members,
        totalPoints: summonerData ? members.reduce((sum, member) => {
          const data = summonerData[teamName]?.find(m => m.summonerName === member);
          return HIGH_TIERS.includes(data?.tier) ? sum + (parseInt(data?.leaguePoints) || 0) : sum;
        }, 0) : 0
      }))
      .sort((a, b) => b.totalPoints - a.totalPoints);
  }, [summonerData]);

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8 text-black">台服 S12 分組衝分賽</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4"
      >
        {sortedTeams.map((team) => (
          <TeamItem key={team.teamName} teamName={team.teamName} members={team.members} summonerData={summonerData} />
        ))}
      </motion.div>
    </div>
  );
}

export default React.memo(SummonerLeaderboard);