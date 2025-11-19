import React, { useState } from 'react';
import { TweetResult } from '../types';
import { Copy, Check, Share2, Sparkles } from 'lucide-react';

interface ResultListProps {
  results: TweetResult[];
}

const ResultList: React.FC<ResultListProps> = ({ results }) => {
  if (results.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 pb-20">
      <h2 className="text-xl font-semibold text-white flex items-center gap-2 px-1">
        <Sparkles className="w-5 h-5 text-yellow-400" />
        Your Viral Drafts
      </h2>
      {results.map((tweet, index) => (
        <TweetCard key={index} tweet={tweet} index={index} />
      ))}
    </div>
  );
};

const TweetCard: React.FC<{ tweet: TweetResult; index: number }> = ({ tweet, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(tweet.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate progress ring for char count
  const maxChar = 280;
  const percentage = Math.min(100, (tweet.characterCount / maxChar) * 100);
  const isOverLimit = tweet.characterCount > maxChar;
  const ringColor = isOverLimit ? 'text-red-500' : percentage > 90 ? 'text-yellow-500' : 'text-blue-500';

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative group hover:border-zinc-700 transition-all duration-300">
      
      {/* Hook Tag */}
      <div className="absolute -top-3 left-6">
        <span className="bg-zinc-800 text-zinc-300 text-xs font-medium px-3 py-1 rounded-full border border-zinc-700 shadow-sm">
          {tweet.hookType} Hook
        </span>
      </div>

      {/* Content */}
      <div className="mt-2 text-zinc-100 text-lg leading-relaxed whitespace-pre-wrap font-normal">
        {tweet.content}
      </div>

      {/* Hashtags */}
      {tweet.hashtags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tweet.hashtags.map((tag, i) => (
            <span key={i} className="text-blue-400 text-sm hover:underline cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer Actions */}
      <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Character Count Indicator */}
          <div className="flex items-center gap-2" title={`${tweet.characterCount}/280 characters`}>
            <div className="relative w-5 h-5">
               <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-zinc-800"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className={ringColor}
                  strokeDasharray={`${percentage}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
              </svg>
            </div>
            <span className={`text-xs ${isOverLimit ? 'text-red-400' : 'text-zinc-500'}`}>
              {tweet.characterCount}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              copied 
                ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet.content)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all"
          >
            <Share2 className="w-4 h-4" />
            Tweet
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResultList;