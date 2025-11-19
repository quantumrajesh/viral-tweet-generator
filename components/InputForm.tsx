import React from 'react';
import { Tone, Style, GeneratorConfig } from '../types';
import { Wand2, Loader2 } from 'lucide-react';

interface InputFormProps {
  config: GeneratorConfig;
  setConfig: React.Dispatch<React.SetStateAction<GeneratorConfig>>;
  onGenerate: () => void;
  isGenerating: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ config, setConfig, onGenerate, isGenerating }) => {
  
  const handleTopicChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConfig(prev => ({ ...prev, topic: e.target.value }));
  };

  const handleToneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setConfig(prev => ({ ...prev, tone: e.target.value as Tone }));
  };

  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setConfig(prev => ({ ...prev, style: e.target.value as Style }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl mb-8">
      
      <div className="mb-6">
        <label htmlFor="topic" className="block text-sm font-medium text-zinc-300 mb-2">
          What's your idea? <span className="text-zinc-500">(e.g., "AI replacing real estate agents")</span>
        </label>
        <textarea
          id="topic"
          value={config.topic}
          onChange={handleTopicChange}
          placeholder="Type 3-10 words here..."
          className="w-full h-24 bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-100 placeholder-zinc-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all text-lg"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="tone" className="block text-sm font-medium text-zinc-300 mb-2">
            Tone
          </label>
          <div className="relative">
            <select
              id="tone"
              value={config.tone}
              onChange={handleToneChange}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-zinc-200 focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
            >
              {Object.values(Tone).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <div className="absolute right-3 top-3.5 pointer-events-none">
              <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="style" className="block text-sm font-medium text-zinc-300 mb-2">
            Creator Style
          </label>
          <div className="relative">
            <select
              id="style"
              value={config.style}
              onChange={handleStyleChange}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-zinc-200 focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
            >
              {Object.values(Style).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <div className="absolute right-3 top-3.5 pointer-events-none">
              <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isGenerating || !config.topic.trim()}
        className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
          isGenerating || !config.topic.trim()
            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transform active:scale-[0.98]'
        }`}
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            Drafting Viral Tweets...
          </>
        ) : (
          <>
            <Wand2 className="w-6 h-6" />
            Generate Viral Posts
          </>
        )}
      </button>
    </div>
  );
};

export default InputForm;