import React from 'react';
import { Flame, Twitter } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-8 flex flex-col items-center justify-center border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-2 mb-2">
        <div className="relative">
          <div className="absolute -inset-1 bg-blue-500 rounded-full opacity-75 blur opacity-40 animate-pulse"></div>
          <Flame className="w-8 h-8 text-blue-500 relative z-10 fill-blue-500" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent tracking-tight">
          TweetBlaze
        </h1>
      </div>
      <p className="text-zinc-400 text-sm sm:text-base text-center max-w-md">
        Describe your idea. Get viral posts instantly. <span className="text-blue-400">Powered by Gemini.</span>
      </p>
    </header>
  );
};

export default Header;