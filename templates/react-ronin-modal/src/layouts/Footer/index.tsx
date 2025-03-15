import styles from './index.module.css'
import { FaDiscord, FaTwitter, FaGithub } from 'react-icons/fa'

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.links}>
					<a href="https://discord.gg/3TS9zD7n" target="_blank" rel="noopener noreferrer">
						<FaDiscord size={24} />
					</a>
					<a href="https://x.com/ronin_builders" target="_blank" rel="noopener noreferrer">
						<FaTwitter size={24} />
					</a>
					<a href="https://github.com/roninbuilders" target="_blank" rel="noopener noreferrer">
						<FaGithub size={24} />
					</a>
				</div>
				<div className={styles.donation}>
					<span>Support us: roninbuilders.ron</span>
				</div>
				<p className={styles.copy}>© {new Date().getFullYear()} Ronin Builders.</p>
			</div>
		</footer>
	)
}

export default Footer
