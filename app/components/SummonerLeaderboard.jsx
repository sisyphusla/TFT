'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Loading from './Loading';
import TierImage from './TierImage';
import useSummonerData from '../hooks/useSummonerData';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

const HIGH_TIERS = ['CHALLENGER', 'GRANDMASTER', 'MASTER'];

const MemberItem = React.memo(({ member }) => (
  <div className="flex items-center space-x-2 py-2">
    <Avatar className="h-8 w-8">
      <TierImage tier={member.tier} />
    </Avatar>
    <div className="flex-1">
      <p className="text-sm font-medium">{member.summonerName}</p>
      <p className="text-xs text-muted-foreground">{member.tier}</p>
    </div>
    <Badge variant="secondary">
      {member.leaguePoints !== undefined ? `${member.leaguePoints} LP` : 'N/A'}
    </Badge>
  </div>
));

const TeamItem = React.memo(({ team }) => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle className="flex justify-between items-center text-sm sm:text-base">
        <span>{team.teamName}</span>
        <Badge variant="default" className="text-xs sm:text-sm">
          總分：{team.totalPoints} LP
        </Badge>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        {team.members.map((member, memberIndex) => (
          <MemberItem key={memberIndex} member={member} />
        ))}
      </div>
    </CardContent>
  </Card>
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
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8">台服 S12 分組衝分賽</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loading />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4"
        >
          {sortedTeams.map((team) => (
            <TeamItem key={team.teamName} team={team} />
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default React.memo(SummonerLeaderboard);