import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { WagmiProvider } from 'wagmi'
import { ronin } from 'viem/chains'
import { createRoninModal } from '@roninbuilders/modal-wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' 
 
const queryClient = new QueryClient()

const config = createRoninModal({
  projectId:"WALLETCONNECT_PROJECT_ID",
  chain: ronin,
  metadata: { 
    name: 'My Website', 
    description: 'My website description', 
    url: 'https://mywebsite.com',
    icons: ['https://mywebsite.com/icon']
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
		<WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider> 
    </WagmiProvider>
  </StrictMode>,
)
