import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ResultList from './components/ResultList';
import { GeneratorConfig, Tone, Style, TweetResult } from './types';
import { generateViralTweets } from './services/geminiService';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [config, setConfig] = useState<GeneratorConfig>({
    topic: '',
    tone: Tone.PROFESSIONAL,
    style: Style.MINIMALIST,
  });

  const [results, setResults] = useState<TweetResult[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!config.topic.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    setResults([]); // Clear previous results

    try {
      const tweets = await generateViralTweets(config);
      setResults(tweets);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
        
        <div className="w-full max-w-2xl text-center mb-10 space-y-2">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
             Viral Tweets. <br/>
             <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
               Just Add Context.
             </span>
          </h2>
          <p className="text-zinc-400 text-lg">
            Stop staring at a blank screen. Generate 4 high-converting posts in seconds.
          </p>
        </div>

        <InputForm 
          config={config} 
          setConfig={setConfig} 
          onGenerate={handleGenerate} 
          isGenerating={isGenerating} 
        />

        {error && (
          <div className="w-full max-w-2xl bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 mb-8">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <ResultList results={results} />

      </main>
      
      <footer className="py-6 text-center text-zinc-600 text-sm border-t border-zinc-900">
        <p>© {new Date().getFullYear()} TweetBlaze. Built with Gemini 2.5 Flash.</p>
      </footer>
    </div>
  );
};

export default App;