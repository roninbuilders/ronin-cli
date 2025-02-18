import { useQuery } from "@tanstack/react-query";
import { guildClient } from "../api";

async function fetchUserMembershipsInGuild(address: `0x${string}`, guildId: number) {
  return guildClient.user
    .getMemberships(address)
    .then((results) => results.find((item) => item.guildId === guildId));
}

export function useUserMemberships({ address, guildId, enabled }: { address: `0x${string}`, guildId: number, enabled?: boolean }){
  return useQuery({ queryKey: ['userMemberships', address, guildId], queryFn: ()=>fetchUserMembershipsInGuild(address, guildId), enabled })
}