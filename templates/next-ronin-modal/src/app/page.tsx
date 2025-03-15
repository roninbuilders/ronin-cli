import ConnectModal from '../components/ConnectModal';
import UserAccount from '../components/UserAccount';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center w-full h-[calc(100vh-119.2px)] pt-16 m-0 animate-fadeIn">
      <span className="flex items-center justify-center">
        <img src="/ronin_neon.svg" alt="Ronin Logo" className="sm:w-30 w-10" />
        <p className="font-bold bg-gradient-to-br from-white to-[#2662d9] bg-clip-text text-transparent sm:text-[84px] text-[40px]">
          onin Builders
        </p>
      </span>
      <p className="text-lg opacity-70 max-w-[1000px] leading-[24.2px] sm:text-[18px] sm: xs:text-[16px] xxs:text-[14px] sm:text-red-300">
        Welcome to Ronin CLI.
      </p>
      <div className="flex flex-col items-center justify-center gap-4">
        <ConnectModal />
        <UserAccount />
      </div>
    </div>
  );
}

export default Home;
