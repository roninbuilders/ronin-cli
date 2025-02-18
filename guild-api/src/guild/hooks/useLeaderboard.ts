import { useQuery } from "@tanstack/react-query";
import { guildClient } from "../api";

export async function fetchLeaderboard(
  guildIdOrUrlName: number | string,
  isAllUser: boolean = false
) {
  const rewards = await guildClient.guild.reward.getAll(guildIdOrUrlName);
  // platformId === 13 means that the reward is point-based
  const pointsReward = rewards.find((reward) => reward.platformId === 13);

  // The guildPlatformId parameter could also be hardcoded
  // isAllUser means, that the response contains the whole leaderboard, while the value is false, it returns the first 500 user & address
  return console.log(guildClient.guild.getLeaderboard(
    guildIdOrUrlName,
    pointsReward!.id,
    undefined,
    isAllUser
  ))
}

export function useLeaderboard({ guildIdOrUrlName, isAllUser, enabled }: { guildIdOrUrlName: number | string, isAllUser?: boolean, enabled?: boolean }){
  return useQuery({ queryKey: ['guild', guildIdOrUrlName, isAllUser], queryFn: ()=>fetchLeaderboard(guildIdOrUrlName, isAllUser), enabled })
}