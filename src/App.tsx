import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessage, GameMode, AchievementId, Achievement, AchievementCheckContext } from './types';
import { SYSTEM_INSTRUCTION } from './constants';
import { ACHIEVEMENTS } from './achievements';
import { generateJsonResponse } from './services/geminiService';
import { BrainCircuit, Award, Send, MessageSquare, BookOpenText, Users, Loader2, Trophy } from './components/Icons';
import { ModeButton } from './components/ModeButton';
import { AchievementToast } from './components/AchievementToast';
import { AchievementsPanel } from './components/AchievementsPanel';

export default function App() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [xp, setXp] = useState<number>(0);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentMode, setCurrentMode] = useState<GameMode | null>(null);
  
  // Achievement State
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<AchievementId>>(new Set());
  const [gamesPlayed, setGamesPlayed] = useState<number>(0);
  const [showAchievementsPanel, setShowAchievementsPanel] = useState<boolean>(false);
  const [toastQueue, setToastQueue] = useState<Achievement[]>([]);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const checkAndUnlockAchievements = useCallback((context: AchievementCheckContext) => {
    const newUnlocks: Achievement[] = [];
    ACHIEVEMENTS.forEach(ach => {
      if (!unlockedAchievements.has(ach.id) && ach.check(context)) {
        newUnlocks.push(ach);
      }
    });

    if (newUnlocks.length > 0) {
      setUnlockedAchievements(prev => {
        const newSet = new Set(prev);
        newUnlocks.forEach(ach => newSet.add(ach.id));
        return newSet;
      });
      setToastQueue(prev => [...prev, ...newUnlocks]);
    }
  }, [unlockedAchievements]);

  useEffect(() => {
    const context: AchievementCheckContext = {
      xp,
      gamesPlayed,
      currentGameMode: null,
    };
    checkAndUnlockAchievements(context);
  }, [xp, gamesPlayed, checkAndUnlockAchievements]);


  const sendMessage = async (userPrompt: string, isHiddenPrompt: boolean = false) => {
    if (!userPrompt.trim()) return;

    setIsLoading(true);
    setInput('');

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: userPrompt }] };
    
    const apiHistory = [...chatHistory, userMessage];
    
    if (!isHiddenPrompt) {
      setChatHistory(prev => [...prev, userMessage]);
    }

    try {
        const modelResponse = await generateJsonResponse(apiHistory, SYSTEM_INSTRUCTION);

        const modelMessage: ChatMessage = { role: 'model', parts: [{ text: modelResponse.display_html }] };
        setChatHistory(prev => [...prev, modelMessage]);
        
        if (modelResponse.xp_gained > 0) {
            setXp(prevXp => prevXp + modelResponse.xp_gained);
        }
        
        const turnContext: AchievementCheckContext = {
            xp: xp + modelResponse.xp_gained,
            gamesPlayed,
            lastModelResponse: modelResponse,
            currentGameMode: currentMode
        };
        checkAndUnlockAchievements(turnContext);

    } catch (error) {
        const errorText = error instanceof Error ? error.message : String(error);
        const errorMessage: ChatMessage = {
            role: 'model',
            parts: [{ text: `<strong>Произошла ошибка:</strong> ${errorText}` }]
        };
        setChatHistory(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input, false);
    }
  };

  const handleModeSelect = (mode: GameMode) => {
    setCurrentMode(mode);
    setGamesPlayed(prev => prev + 1);
    let hiddenPrompt = '';
    switch (mode) {
      case 'words': hiddenPrompt = 'Начни режим Слова'; break;
      case 'story': hiddenPrompt = 'Начни режим История'; break;
      case 'associations': hiddenPrompt = 'Начни режим Ассоциации'; break;
    }
    sendMessage(hiddenPrompt, true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900 font-sans">
      {toastQueue.length > 0 && (
        <AchievementToast
          key={toastQueue[0].id}
          achievement={toastQueue[0]}
          onClose={() => setToastQueue(prev => prev.slice(1))}
        />
      )}
      <AchievementsPanel
        isOpen={showAchievementsPanel}
        onClose={() => setShowAchievementsPanel(false)}
        allAchievements={ACHIEVEMENTS}
        unlockedIds={unlockedAchievements}
      />
      <header className="sticky top-0 z-10 w-full bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-7 h-7 text-violet-600" />
            <h1 className="text-2xl font-bold text-gray-800">NeuroVibe</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowAchievementsPanel(true)} className="text-gray-500 hover:text-violet-600 transition-colors">
              <Trophy className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2 bg-green-100 text-green-800 font-bold rounded-full px-4 py-1.5 shadow-sm transition-all duration-300 hover:shadow-md">
              <Award className="w-5 h-5" />
              <span key={xp} className="animate-pulse-once">{xp} XP</span>
            </div>
          </div>
        </div>
      </header>

      <main ref={chatContainerRef} className="flex-grow overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {chatHistory.map((msg, index) => {
            const isUser = msg.role === 'user';
            const bubbleClasses = `p-3 rounded-2xl shadow-md max-w-[85%] sm:max-w-[75%]`;
            const userClasses = `${bubbleClasses} bg-violet-600 text-white rounded-br-lg`;
            const modelClasses = `${bubbleClasses} bg-white text-gray-800 rounded-bl-lg border border-gray-100`;

            return (
              <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                {isUser ? (
                  <div className={userClasses}>
                    {msg.parts[0].text}
                  </div>
                ) : (
                  <div
                    className={modelClasses}
                    dangerouslySetInnerHTML={{ __html: msg.parts[0].text }}
                  />
                )}
              </div>
            );
          })}
          {isLoading && (
            <div className="flex justify-start">
              <div className="p-3 rounded-2xl shadow-md bg-white text-gray-800 rounded-bl-lg border border-gray-100">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="sticky bottom-0 z-10 w-full bg-white/80 backdrop-blur-md p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto">
          {chatHistory.length === 0 && !isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ModeButton 
                icon={<MessageSquare className="w-5 h-5" />} 
                title="Слова"
                description="Запомни 7 слов"
                onClick={() => handleModeSelect('words')}
              />
              <ModeButton 
                icon={<BookOpenText className="w-5 h-5" />} 
                title="История"
                description="Ответь на 3 вопроса"
                onClick={() => handleModeSelect('story')}
              />
              <ModeButton 
                icon={<Users className="w-5 h-5" />} 
                title="Ассоциации"
                description="Оцени связь"
                onClick={() => handleModeSelect('associations')}
              />
            </div>
          ) : (
            <form onSubmit={handleSend} className="flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ваш ответ..."
                disabled={isLoading}
                className="flex-grow px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-gray-100"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-3 bg-violet-600 text-white rounded-lg shadow-md hover:bg-violet-700 transition-colors duration-200 disabled:bg-gray-400 disabled:shadow-none"
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <Send className="w-6 h-6" />
                )}
              </button>
            </form>
          )}
        </div>
      </footer>
    </div>
  );
}