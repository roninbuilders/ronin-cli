import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { saigon } from 'viem/chains'
import { createRoninModal } from '@roninbuilders/modal-wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'

const queryClient = new QueryClient()

const config = createRoninModal({
	projectId: 'WALLETCONNECT_PROJECT_ID', // Get a project ID from https://cloud.reown.com
	chain: saigon,
	/**
	 * Follow this guide to add Ronin Waypoint support & get a client ID
	 * https://docs.skymavis.com/mavis/ronin-waypoint/guides/get-started
	 */
	waypoint: {
		clientId: 'RONIN_CLIENT_ID',
	},
	metadata: {
		name: 'New Ronin App',
		description: 'My new Ronin app',
		url: 'https://mywebsite.com',
		icons: ['https://mywebsite.com/icon'],
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
