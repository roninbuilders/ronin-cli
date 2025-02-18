import { useQuery } from "@tanstack/react-query"
import { guildClient } from "../api"

async function getGuild(name: string){
    return await guildClient.guild.get(name)
}

export function useGuild({ name, enabled }: { name: string, enabled?: boolean }){
    return useQuery({ queryKey: ['guild', name], queryFn: ()=>getGuild(name), enabled })
}