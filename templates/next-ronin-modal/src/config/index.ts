import { cookieStorage, createStorage } from 'wagmi'
import { saigon } from 'viem/chains'
import { createRoninModal } from '@roninbuilders/modal-wagmi'

const projectId = 'WALLETCONNECT_PROJECT_ID' // Get a project ID from https://cloud.reown.com
const clientId = 'RONIN_CLIENT_ID' // Follow this guide to add Ronin Waypoint support & get a client ID https://docs.skymavis.com/mavis/ronin-waypoint/guides/get-started

if (projectId === 'WALLETCONNECT_PROJECT_ID' || clientId === 'RONIN_CLIENT_ID') {
	console.error('Please replace WALLETCONNECT_PROJECT_ID and RONIN_CLIENT_ID with your own project ID and client ID')
}

export const wagmiConfig = createRoninModal({
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
    storage: createStorage({
        storage: cookieStorage
    }),
    ssr: true,
})