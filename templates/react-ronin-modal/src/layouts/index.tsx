import Navbar from './Navbar'
import Footer from './Footer'
import styles from './index.module.css'
import { Outlet } from 'react-router'

const Layout = () => {
	return (
		<div className={styles.mainContainer}>
			<Navbar />
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}

export default Layout
