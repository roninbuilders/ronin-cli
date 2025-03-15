import s from './index.module.css'
import ConnectModal from '../../components/ConnectModal'
import UserAccount from '../../components/UserAccount'

function Home() {
	return (
		<div className={s.container}>
			<span>
				<img src="/ronin_neon.svg" alt="Ronin Logo" />
				<p className={s.title}>onin Builders</p>
			</span>
			<p className={s.description}>Welcome to Ronin CLI.</p>
			<div className={s.userContainer}>
				<ConnectModal />
				<UserAccount />
			</div>
		</div>
	)
}

export default Home
