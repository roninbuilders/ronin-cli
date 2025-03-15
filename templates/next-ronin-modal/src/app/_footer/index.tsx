'use client';

import { FaDiscord, FaTwitter, FaGithub } from 'react-icons/fa';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white py-4 text-center border-t border-[#333] w-full h-[119.2px]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center gap-6 mb-2">
          <Link href="https://discord.gg/3TS9zD7n" target="_blank" rel="noopener noreferrer">
            <FaDiscord size={24} className="hover:text-blue-400 transition-colors" />
          </Link>
          <Link href="https://x.com/ronin_builders" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={24} className="hover:text-blue-400 transition-colors" />
          </Link>
          <Link href="https://github.com/roninbuilders" target="_blank" rel="noopener noreferrer">
            <FaGithub size={24} className="hover:text-blue-400 transition-colors" />
          </Link>
        </div>
        <div className="text-sm text-gray-400 mb-2">
          <span>Support us: roninbuilders.ron</span>
        </div>
        <p className="text-xs text-gray-500">© {new Date().getFullYear()} Ronin Builders.</p>
      </div>
    </footer>
  );
};

export default Footer;