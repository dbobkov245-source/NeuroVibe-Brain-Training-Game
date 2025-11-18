// src/App.tsx
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ChatMessage, GameMode, AchievementId, Achievement, AchievementCheckContext, Persona } from './types';
import { ACHIEVEMENTS } from './achievements';
import { generateJsonResponse } from './services/geminiService';
import { OfflineStorage } from './offlineStorage';
import { BrainCircuit, Award, Send, MessageSquare, BookOpenText, Users, Loader2, Trophy, ArrowLeft } from './components/Icons';
import { ModeButton } from './components/ModeButton';
import { AchievementToast } from './components/AchievementToast';
import { AchievementsPanel } from './components/AchievementsPanel';
import { PWAPrompt } from './components/PWAPrompt';
import { MemoryCard } from './components/MemoryCard';
import { PersonaRadio } from './components/PersonaRadio';
import { useDailyQuest } from './hooks/useDailyQuest';
import { Confetti } from './components/Confetti';

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
  const [memoryContent, setMemoryContent] = useState<string | null>(null);
  const [persona, setPersona] = useState<Persona>('demon');
  const [showConfetti, setShowConfetti] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const offlineStorage = useRef<OfflineStorage | null>(null);
  const { quest, complete } = useDailyQuest();

  useEffect(() => {
    offlineStorage.current = new OfflineStorage();
    offlineStorage.current.init().catch((e) => console.warn('OfflineStorage init failed:', e));
    
    const handleOnline = () => {
      setIsOnline(true);
      offlineStorage.current?.sync().catch(console.error);
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
        const state = await offlineStorage.current?.getGameState();
        if (state) {
          setXp(state.xp);
          setGamesPlayed(state.gamesPlayed);
          setUnlockedAchievements(new Set(state.unlockedAchievements as AchievementId[]));
          setChatHistory(state.chatHistory);
        }
      } catch (e) { 
        console.error('Failed to load state:', e); 
      }
    };
    loadState();
  }, []);

  useEffect(() => {
    const saveState = async () => {
      try {
        await offlineStorage.current?.saveGameState({
          xp,
          gamesPlayed,
          unlockedAchievements: Array.from(unlockedAchievements),
          chatHistory,
          lastSaved: Date.now()
        });
      } catch (e) { 
        console.error('Failed to save state:', e); 
      }
    };
    saveState();
  }, [xp, gamesPlayed, unlockedAchievements, chatHistory]);

  useEffect(() => {
    if (!gamesPlayed || localStorage.getItem('pwa-prompt-dismissed')) return;
    
    let isMounted = true;
    const handler = (e: Event) => {
      e.preventDefault();
      if (isMounted) setDeferredPrompt(e);
      setTimeout(() => {
        if (isMounted) setShowPWAPrompt(true);
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
    
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('PWA installed');
        if ('gtag' in window) {
          (window as any).gtag('event', 'pwa_installed');
        }
      }
    } catch (error) {
      console.error('PWA install failed:', error);
    } finally {
      setDeferredPrompt(null);
      setShowPWAPrompt(false);
      localStorage.setItem('pwa-prompt-dismissed', 'true');
    }
  }, [deferredPrompt]);

  const dismissPWAPrompt = useCallback(() => {
    setShowPWAPrompt(false);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  }, []);

  const checkAndUnlockAchievements = useCallback((modelResponse: any) => {
    if (!modelResponse?.game_data) return;
    
    const ctx: AchievementCheckContext = { 
      xp, 
      gamesPlayed, 
      lastModelResponse: modelResponse, 
      currentGameMode: currentMode 
    };
    
    const newUnlocks = ACHIEVEMENTS.filter(a => 
      !unlockedAchievements.has(a.id) && a.check(ctx)
    );
    
    if (newUnlocks.length) {
      setUnlockedAchievements(prev => {
        const next = new Set(prev);
        newUnlocks.forEach(a => next.add(a.id));
        return next;
      });
      setToastQueue(prev => [...prev, ...newUnlocks]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [xp, gamesPlayed, currentMode, unlockedAchievements]);

  useEffect(() => {
    if (!quest?.completed && quest?.mode === currentMode) {
      // Quest tracking is done in sendMessage
    }
  }, [quest, currentMode, complete]);

  const resetGame = useCallback(() => {
    setChatHistory([]);
    setCurrentMode(null);
    setMemoryContent(null);
    setInput('');
  }, []);

  const sendMessage = useCallback(async (userPrompt: string, isHiddenPrompt = false) => {
    if (!userPrompt.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      parts: [{ text: userPrompt }],
      isHidden: isHiddenPrompt
    };

    if (!isOnline) {
      const offlineMessage: ChatMessage = {
        role: 'model',
        parts: [{ text: '<strong>Офлайн:</strong> Запрос сохранён. Подключитесь к сети для ответа.' }]
      };
      setChatHistory(prev => [...prev, userMessage, offlineMessage]);
      return;
    }

    setIsLoading(true);
    if (!isHiddenPrompt) setInput('');

    const currentHistory = [...chatHistory, userMessage];
    if (!isHiddenPrompt) setChatHistory(currentHistory);

    try {
      const modelResponse = await generateJsonResponse(currentHistory, persona);
      
      const modelMessage: ChatMessage = {
        role: 'model',
        parts: [{ text: modelResponse.display_html }],
        isHidden: !!modelResponse.isMemoryContent
      };

      const updatedHistory = [...currentHistory, modelMessage];
      setChatHistory(updatedHistory);

      if (modelResponse.isMemoryContent) {
        setMemoryContent(modelResponse.display_html);
      } else {
        setMemoryContent(null);
      }

      setXp(prev => prev + modelResponse.xp_gained);
      checkAndUnlockAchievements(modelResponse);
      
      if (quest && !quest.completed && 
          modelResponse.game_data.mode === quest.mode &&
          (modelResponse.game_data.association_score ?? 0) >= quest.minScore) {
        complete();
        setXp(prev => prev + quest.xp);
      }
    } catch (error) {
      console.error('Message send error:', error);
      const errorMessage: ChatMessage = {
        role: 'model',
        parts: [{ text: `<strong>Ошибка:</strong> Не удалось получить ответ от AI. Попробуйте снова.` }]
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [chatHistory, isLoading, isOnline, persona, quest, complete, checkAndUnlockAchievements]);

  const handleSend = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input, false);
  }, [input, sendMessage]);

  const handleModeSelect = useCallback((mode: GameMode) => {
    setCurrentMode(mode);
    setGamesPlayed(prev => prev + 1);
    
    const prompts: Record<GameMode, string> = {
      words: 'Начни режим слов: запомни 7 слов и потом воспроизведи их.',
      story: 'Начни режим истории: дай короткую историю для понимания и вопросов.',
      associations: 'Начни режим ассоциаций: дай набор ассоциаций для теста.'
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
  }, [chatHistory.length, handleModeSelect, sendMessage]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, memoryContent]);

  const achievementsCount = useMemo(() => 
    `${unlockedAchievements.size}/${ACHIEVEMENTS.length}`, 
    [unlockedAchievements]
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900 font-sans">
      {!isOnline && (
        <div className="bg-yellow-100 text-yellow-800 text-center py-2 px-4 font-medium">
          ⚠️ Офлайн режим — ответы сохраняются локально
        </div>
      )}
      
      {toastQueue.length > 0 && (
        <AchievementToast 
          achievement={toastQueue[0]} 
          onClose={() => setToastQueue(prev => prev.slice(1))} 
        />
      )}
      
      {showConfetti && <Confetti />}
      {showPWAPrompt && <PWAPrompt onInstall={handleInstallPWA} onDismiss={dismissPWAPrompt} />}
      
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
                aria-label="Назад"
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
              aria-label="Достижения"
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
          <PersonaRadio value={persona} onChange={setPersona} />
          
          {quest && !quest.completed && (
            <div className="mx-2 mb-2 p-3 rounded-lg bg-yellow-100 text-yellow-800 text-sm font-medium">
              🎯 <span className="font-bold">{quest.title}</span>: {quest.description}
            </div>
          )}

          {memoryContent && <MemoryCard content={memoryContent} onReady={() => setMemoryContent(null)} />}

          {chatHistory.map((msg, index) => {
            if (msg.isHidden) return null;
            const isUser = msg.role === 'user';
            const bubbleClasses = `p-3 rounded-2xl shadow-md max-w-[85%] sm:max-w-[75%] break-words`;
            const userClasses = `${bubbleClasses} bg-violet-600 text-white rounded-br-lg ml-auto`;
            const modelClasses = `${bubbleClasses} bg-white text-gray-800 rounded-bl-lg border border-gray-100 mr-auto`;
            
            return (
              <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={isUser ? userClasses : modelClasses}>
                  {isUser ? (
                    <span>{msg.parts[0].text}</span>
                  ) : (
                    <span dangerouslySetInnerHTML={{ __html: msg.parts[0].text }} />
                  )}
                </div>
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
          {chatHistory.length === 0 && !isLoading && !memoryContent && !currentMode ? (
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
                description="Понимание истории" 
                onClick={() => handleModeSelect('story')} 
              />
              <ModeButton 
                icon={<Users className="w-5 h-5" />} 
                title="Ассоциации" 
                description="Тренировка ассоциаций" 
                onClick={() => handleModeSelect('associations')} 
              />
            </div>
          ) : (
            <form onSubmit={handleSend} className="flex items-center gap-3">
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Введите сообщение..." 
                disabled={isLoading || !isOnline || !!memoryContent} 
                className="flex-grow px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-gray-100" 
                aria-label="Ввод сообщения" 
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
