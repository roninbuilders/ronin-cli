import { useAccount, useChainId } from 'wagmi'

export default function UserAccount() {
	const { address, isConnected } = useAccount()
	const chainId = useChainId()

	if(!isConnected) {
		return <p>Not connected</p>
	}

	return (
		<div>
			<div>Account: {address}</div>
			<div>Connected Chain ID: {chainId}</div>
		</div>
	)
}
