import { useQuery } from "@tanstack/react-query";
import { guildClient } from "../api";

async function fetchRoleNames(guildId: number) {
  return await guildClient.guild.role
  .getAll(guildId)
  .then((roles) =>
    Object.fromEntries(roles.map(({ id, name }) => [id, name]))
  );
}

export function useRoleNames({ guildId, enabled }: { guildId: number, enabled?: boolean }){
  return useQuery({ queryKey: ['roleNames', guildId], queryFn: ()=>fetchRoleNames(guildId), enabled })
}