import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'

import { saigon } from 'viem/chains'
import { createRoninModal } from '@roninbuilders/modal-wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'

import Home from './routes/Home'
import About from './routes/About'
import Layout from './layouts'

const queryClient = new QueryClient()

const projectId = 'WALLETCONNECT_PROJECT_ID' // Get a project ID from https://cloud.reown.com
const clientId = 'RONIN_CLIENT_ID' // Follow this guide to add Ronin Waypoint support & get a client ID https://docs.skymavis.com/mavis/ronin-waypoint/guides/get-started

if (projectId === 'WALLETCONNECT_PROJECT_ID' || clientId === 'RONIN_CLIENT_ID') {
	console.error('Please replace WALLETCONNECT_PROJECT_ID and RONIN_CLIENT_ID with your own project ID and client ID')
}

const config = createRoninModal({
	projectId,
	chain: saigon,
	waypoint: {
		clientId,
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
				<BrowserRouter>
					<Routes>
						<Route element={<Layout />}>
							<Route path="/" element={<Home />} />
							<Route path="/about" element={<About />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</QueryClientProvider>
		</WagmiProvider>
	</StrictMode>,
)
