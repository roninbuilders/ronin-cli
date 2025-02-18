import './App.css'
import { RoninButton } from '@roninbuilders/modal-wagmi/react'
import RoleList from './components/RoleList'
import { useAccount } from 'wagmi'
import { useGuild } from './guild/hooks/useGuild'
import { useRoleNames } from './guild/hooks/useRoleNames'

function App() {
  const { address } = useAccount()

  console.log(address)

  const { data: guild, isError: isGuildError, isLoading: isGuildLoading } = useGuild({ name: "ronin" })

  const { data: roleList, isLoading: isRoleNamesLoading } = useRoleNames({
    guildId: guild?.id || 0,
    enabled: Boolean(guild) && !isGuildError
  })

  return (
      <section className='container'>
        { (isGuildLoading || isRoleNamesLoading) && <div>Loading Role Names...</div> }
      {roleList && <RoleList roles={roleList} />}
      <RoninButton/>
    </section>
  )
}

export default App