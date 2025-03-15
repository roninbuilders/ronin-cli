'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#1a1a1a] text-white shadow-md z-50 p-4 flex justify-center">
      <div className="w-full max-w-6xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <img src="/ronin_blue.svg" alt="Logo" className="h-8" />
        </Link>
        <button
          className="md:hidden text-2xl cursor-pointer focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <ul
          ref={menuRef}
          className={`md:flex gap-6 list-none transition-all duration-300 md:static md:bg-transparent md:w-auto md:flex-row 
          ${menuOpen ? 'flex flex-col absolute top-14 right-4 bg-[#1c1c1c] w-48 p-4 rounded-lg' : 'hidden'}`}
        >
          <li>
            <Link href="/" className="block py-2 px-4 text-white hover:text-blue-400">Home</Link>
          </li>
          <li>
            <Link href="/about" className="block py-2 px-4 text-white hover:text-blue-400">About</Link>
          </li>
          <li>
            <Link href="/contact" className="block py-2 px-4 text-white hover:text-blue-400">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
