import './App.css'
import { fetchRoleNames } from './guild/api'
import { guildId } from './guild/api'

//fetchUserMembershipsInGuild(userAddress, id)
//fetchLeaderboard(urlName)
fetchRoleNames(guildId)

function App() {
  return (
    <>
      <div>
      <h1>Vite + React</h1>
          Edit <code>src/App.tsx</code> and save to test HMR
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/**@ts-expect-error needs fix lib side */}
      <ronin-button/>
    </>
  )
}

export default App