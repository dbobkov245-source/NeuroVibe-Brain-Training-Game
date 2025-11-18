import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ChatMessage, GameMode, AchievementId, Achievement, AchievementCheckContext } from './types';
import { SYSTEM_INSTRUCTION } from './constants';
import { ACHIEVEMENTS } from './achievements';
import { generateJsonResponse } from './services/geminiService';
import { OfflineStorage } from './offlineStorage';
import { BrainCircuit, Award, Send, MessageSquare, BookOpenText, Users, Loader2, Trophy, ArrowLeft } from './components/Icons';
import { ModeButton } from './components/ModeButton';
import { AchievementToast } from './components/AchievementToast';
import { AchievementsPanel } from './components/AchievementsPanel';
import { PWAPrompt } from './components/PWAPrompt';
import { MemoryCard } from './components/MemoryCard';

export default function App() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [xp, setXp] = useState<number>(0);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentMode, setCurrentMode] = useState<GameMode | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPWAPrompt, setShowPWAPrompt] = useState<boolean>(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<AchievementId>>(new Set());
  const [gamesPlayed, setGamesPlayed] = useState<number>(0);
  const [showAchievementsPanel, setShowAchievementsPanel] = useState<boolean>(false);
  const [toastQueue, setToastQueue] = useState<Achievement[]>([]);
  const [memoryContent, setMemoryContent] = useState<string | null>(null); // 🆕 Текущий вопрос для запоминания
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const offlineStorage = useRef<OfflineStorage>(new OfflineStorage());

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, memoryContent]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      offlineStorage.current.sync().catch(console.error);
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const loadState = async () => {
      try {
        const state = await offlineStorage.current.getGameState();
        if (state) {
          setXp(state.xp);
          setGamesPlayed(state.gamesPlayed);
          setUnlockedAchievements(new Set(state.unlockedAchievements as AchievementId[]));
          if (state.chatHistory.length > 0) setChatHistory(state.chatHistory);
        }
      } catch (error) {
        console.error('Failed to load game state:', error);
      }
    };
    loadState();
  }, []);

  useEffect(() => {
    const saveState = async () => {
      try {
        await offlineStorage.current.saveGameState({
          xp,
          gamesPlayed,
          unlockedAchievements: Array.from(unlockedAchievements),
          chatHistory,
          lastSaved: Date.now()
        });
      } catch (error) {
        console.error('Failed to save game state:', error);
      }
    };
    saveState();
  }, [xp, gamesPlayed, unlockedAchievements, chatHistory]);

  useEffect(() => {
    let isMounted = true;
    const handler = (e: Event) => {
      e.preventDefault();
      if (isMounted) setDeferredPrompt(e);
      
      setTimeout(() => {
        if (isMounted && gamesPlayed > 0 && !localStorage.getItem('pwa-prompt-dismissed')) {
          setShowPWAPrompt(true);
        }
      }, 3000);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => {
      isMounted = false;
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, [gamesPlayed]);

  const handleInstallPWA = useCallback(async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') console.log('PWA installed');
    setDeferredPrompt(null);
    setShowPWAPrompt(false);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  }, [deferredPrompt]);

  const dismissPWAPrompt = useCallback(() => {
    setShowPWAPrompt(false);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  }, []);

  const checkAndUnlockAchievements = useCallback((context: AchievementCheckContext) => {
    const newUnlocks: Achievement[] = [];
    ACHIEVEMENTS.forEach(ach => {
      if (!unlockedAchievements.has(ach.id) && ach.check(context)) {
        newUnlocks.push(ach);
      }
    });
    if (newUnlocks.length > 0) {
      setUnlockedAchievements((prev: Set<AchievementId>) => {
        const newSet = new Set(prev);
        newUnlocks.forEach(ach => newSet.add(ach.id));
        return newSet;
      });
      setToastQueue(prev => [...prev, ...newUnlocks]);
    }
  }, [unlockedAchievements]);

  useEffect(() => {
    const context: AchievementCheckContext = { xp, gamesPlayed, currentGameMode: null };
    checkAndUnlockAchievements(context);
  }, [xp, gamesPlayed, checkAndUnlockAchievements]);

  const resetGame = useCallback(() => {
    setChatHistory([]);
    setCurrentMode(null);
    setMemoryContent(null);
    setInput('');
  }, []);

  const sendMessage = useCallback(async (userPrompt: string, isHiddenPrompt: boolean = false) => {
    if (!userPrompt.trim()) return;
    if (!isOnline) {
      const offlineMessage: ChatMessage = {
        role: 'model',
        parts: [{ text: '<strong>Офлайн режим:</strong> Подключитесь к интернету для продолжения игры.' }]
      };
      setChatHistory(prev => [...prev, offlineMessage]);
      return;
    }
    setIsLoading(true);
    setInput('');
    
    const userMessage: ChatMessage = { role: 'user', parts: [{ text: userPrompt }] };
    const updatedHistoryForApi = [...chatHistory, userMessage];
    if (!isHiddenPrompt) setChatHistory(prev => [...prev, userMessage]);

    try {
      const modelResponse = await generateJsonResponse(updatedHistoryForApi, SYSTEM_INSTRUCTION);
      
      // 🆕 Если это контент для памяти, показываем в карточке
      if (modelResponse.isMemoryContent) {
        setMemoryContent(modelResponse.display_html);
      } else {
        const modelMessage: ChatMessage = { 
          role: 'model', 
          parts: [{ text: modelResponse.display_html }],
          isHidden: false 
        };
        setChatHistory(prev => [...prev, modelMessage]);
      }
      
      setXp(prevXp => {
        const newXp = prevXp + modelResponse.xp_gained;
        checkAndUnlockAchievements({
          xp: newXp,
          gamesPlayed,
          lastModelResponse: modelResponse,
          currentGameMode: currentMode
        });
        return newXp;
      });
    } catch (error) {
      const errorText = error instanceof Error ? error.message : String(error);
      const errorMessage: ChatMessage = {
        role: 'model',
        parts: [{ text: `<strong>Ошибка:</strong> ${errorText}` }]
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [chatHistory, isOnline, gamesPlayed, currentMode, checkAndUnlockAchievements]);

  const handleSend = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) sendMessage(input, false);
  }, [input, isLoading, sendMessage]);

  const handleModeSelect = useCallback((mode: GameMode) => {
    setCurrentMode(mode);
    setGamesPlayed(prev => prev + 1);
    const prompts = {
      words: 'Начни режим Слова',
      story: 'Начни режим История',
      associations: 'Начни режим Ассоциации'
    };
    sendMessage(prompts[mode], true);
  }, [sendMessage]);

  useEffect(() => {
    if (chatHistory.length > 0) return;
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode') as GameMode;
    const sharedText = urlParams.get('text');
    if (mode && ['words', 'story', 'associations'].includes(mode)) {
      handleModeSelect(mode);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (sharedText) {
      sendMessage(sharedText, false);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [handleModeSelect, sendMessage, chatHistory.length]);

  const achievementsCount = useMemo(() => {
    return `${unlockedAchievements.size}/${ACHIEVEMENTS.length}`;
  }, [unlockedAchievements]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900 font-sans">
      {!isOnline && (
        <div className="bg-yellow-100 text-yellow-800 text-center py-2 px-4 font-medium">
          Офлайн режим: данные сохранятся локально
        </div>
      )}
      {toastQueue.length > 0 && (
        <AchievementToast
          key={toastQueue[0].id}
          achievement={toastQueue[0]}
          onClose={() => setToastQueue(prev => prev.slice(1))}
        />
      )}
      {showPWAPrompt && (
        <PWAPrompt 
          onInstall={handleInstallPWA}
          onDismiss={dismissPWAPrompt}
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
            {chatHistory.length > 0 && (
              <button 
                onClick={resetGame}
                className="p-2 text-gray-500 hover:text-violet-600 transition-colors"
                aria-label="Вернуться на главную"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            )}
            <BrainCircuit className="w-7 h-7 text-violet-600" />
            <h1 className="text-2xl font-bold text-gray-800">NeuroVibe</h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowAchievementsPanel(true)} 
              className="text-gray-500 hover:text-violet-600 transition-colors relative"
              aria-label="Показать достижения"
            >
              <Trophy className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {achievementsCount}
              </span>
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
          {/* 🆕 Карточка памяти */}
          {memoryContent && (
            <MemoryCard 
              content={memoryContent}
              onReady={() => setMemoryContent(null)}
            />
          )}
          
          {/* История чата (без скрытых сообщений) */}
          {chatHistory.map((msg, index) => {
            if (msg.isHidden) return null;
            const isUser = msg.role === 'user';
            const bubbleClasses = `p-3 rounded-2xl shadow-md max-w-[85%] sm:max-w-[75%]`;
            const userClasses = `${bubbleClasses} bg-violet-600 text-white rounded-br-lg`;
            const modelClasses = `${bubbleClasses} bg-white text-gray-800 rounded-bl-lg border border-gray-100`;
            return (
              <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                {isUser ? (
                  <div className={userClasses}>{msg.parts[0].text}</div>
                ) : (
                  <div className={modelClasses} dangerouslySetInnerHTML={{ __html: msg.parts[0].text }} />
                )}
              </div>
            );
          })}
          {isLoading && (
            <div className="flex justify-start">
              <div className="p-3 rounded-2xl shadow-md bg-white text-gray-800 rounded-bl-lg border border-gray-100" aria-label="Загрузка">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="sticky bottom-0 z-10 w-full bg-white/80 backdrop-blur-md p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto">
          {chatHistory.length === 0 && !isLoading && !memoryContent ? (
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
                disabled={isLoading || !isOnline || !!memoryContent}
                className="flex-grow px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-gray-100"
                aria-label="Поле для ввода ответа"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim() || !isOnline || !!memoryContent}
                className="p-3 bg-violet-600 text-white rounded-lg shadow-md hover:bg-violet-700 transition-colors duration-200 disabled:bg-gray-400 disabled:shadow-none flex items-center justify-center min-w-[48px]"
                aria-label={isLoading ? "Отправка..." : "Отправить"}
              >
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
              </button>
            </form>
          )}
        </div>
      </footer>
    </div>
  );
}
