import { createGuildClient } from "@guildxyz/sdk";

// The only parameter is the name of your project
const guildClient = createGuildClient("My project");

export const { id: guildId, name: guildName, urlName, imageUrl } = await guildClient.guild.get("Ronin")

export async function fetchUserMembershipsInGuild(address: `0x${string}`, guildId: number) {
  return guildClient.user
    .getMemberships(address)
    .then((results) => results.find((item) => item.guildId === guildId));
}

export async function fetchRoleNames(guildId: number) {
  return await guildClient.guild.role
    .getAll(guildId)
    .then((roles) =>
      Object.fromEntries(roles.map(({ id, name }) => [id, name]))
    );
}

export async function fetchLeaderboard(
  guildIdOrUrlName: number | string,
  isAllUser: boolean = false
) {
  const rewards = await guildClient.guild.reward.getAll(guildIdOrUrlName);
  // platformId === 13 means that the reward is point-based
  const pointsReward = rewards.find((reward) => reward.platformId === 13);

  // The guildPlatformId parameter could also be hardcoded
  // isAllUser means, that the response contains the whole leaderboard, while the value is false, it returns the first 500 user & address
  return guildClient.guild.getLeaderboard(
    guildIdOrUrlName,
    pointsReward!.id,
    undefined,
    isAllUser
  )
}