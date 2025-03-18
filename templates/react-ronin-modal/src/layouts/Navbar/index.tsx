import { useState } from 'react';
import styles from './index.module.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          <img src="/ronin_blue.svg" alt="Logo" />
        </a>
        <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        <ul className={`${styles.navLinks} ${menuOpen ? styles.show : ""}`}>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
