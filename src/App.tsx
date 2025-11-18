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
  const [lastModelResponse, setLastModelResponse] = useState<any>(null);

  const apiHistoryRef = useRef<ChatMessage[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const offlineStorage = useRef<OfflineStorage>(new OfflineStorage());
  const { quest, complete } = useDailyQuest();

  useEffect(() => {
    if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
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
          setChatHistory(state.chatHistory); 
          apiHistoryRef.current = state.chatHistory.filter((m: ChatMessage) => !m.isHidden);
        }
      } catch (e) { console.error(e); }
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
      } catch (e) { console.error(e); }
    };
    saveState();
  }, [xp, gamesPlayed, unlockedAchievements, chatHistory]);

  useEffect(() => {
    let isMounted = true;
    const handler = (e: Event) => { 
      e.preventDefault(); 
      if (isMounted) setDeferredPrompt(e); 
      setTimeout(() => { 
        if (isMounted && gamesPlayed > 0 && !localStorage.getItem('pwa-prompt-dismissed')) 
          setShowPWAPrompt(true); 
      }, 3000); 
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => { isMounted = false; window.removeEventListener('beforeinstallprompt', handler); };
  }, [gamesPlayed]);

  const handleInstallPWA = useCallback(async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt(); 
    const { outcome } = await deferredPrompt.userChoice; 
    if (outcome === 'accepted') console.log('PWA installed');
    setDeferredPrompt(null); 
    setShowPWAPrompt(false); 
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  }, [deferredPrompt]);

  const dismissPWAPrompt = useCallback(() => { 
    setShowPWAPrompt(false); 
    localStorage.setItem('pwa-prompt-dismissed', 'true'); 
  }, []);

  const checkAndUnlockAchievements = useCallback((ctx: AchievementCheckContext) => {
    const newUnlocks: Achievement[] = [];
    ACHIEVEMENTS.forEach(a => { 
      if (!unlockedAchievements.has(a.id) && a.check(ctx)) 
        newUnlocks.push(a); 
    });
    if (newUnlocks.length) {
      setUnlockedAchievements(prev => { 
        const s = new Set(prev); 
        newUnlocks.forEach(a => s.add(a.id)); 
        return s; 
      });
      setToastQueue(prev => [...prev, ...newUnlocks]);
      setShowConfetti(true); 
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [unlockedAchievements]);

  useEffect(() => { 
    if (lastModelResponse) {
      const ctx: AchievementCheckContext = { xp, gamesPlayed, lastModelResponse, currentGameMode: currentMode }; 
      checkAndUnlockAchievements(ctx); 
    }
  }, [xp, gamesPlayed, currentMode, lastModelResponse, checkAndUnlockAchievements]);

  useEffect(() => {
    if (!quest || quest.completed) return;
    if (lastModelResponse?.game_data.mode === quest.mode && 
        (lastModelResponse.association_score ?? 0) >= quest.minScore) {
      complete(); 
      setXp(x => x + (quest?.xp ?? 0));
    }
  }, [lastModelResponse, quest, complete]);

  const resetGame = useCallback(() => { 
    setChatHistory([]); 
    setCurrentMode(null); 
    setMemoryContent(null); 
    setInput(''); 
    apiHistoryRef.current = []; 
  }, []);

  const sendMessage = useCallback(async (userPrompt: string, isHiddenPrompt = false) => {
    if (!userPrompt.trim()) return;
    if (!isOnline) { 
      const offlineMessage: ChatMessage = { 
        role: 'model', 
        parts: [{ text: '<strong>Офлайн режим:</strong> Подключитесь к интернету для продолжения игры.' }] 
      }; 
      setChatHistory(prev => [...prev, userMessage, offlineMessage]); 
      return; 
    }
    setIsLoading(true); 
    setInput('');
    
    const userMessage: ChatMessage = { 
      role: 'user', 
      parts: [{ text: userPrompt }], 
      isHidden: isHiddenPrompt 
    };
    
    if (!isHiddenPrompt) setChatHistory(prev => [...prev, userMessage]); 
    apiHistoryRef.current.push(userMessage);
    
    try {
      const modelResponse = await generateJsonResponse(apiHistoryRef.current, persona);
      const modelMessage: ChatMessage = { 
        role: 'model', 
        parts: [{ text: modelResponse.display_html }], 
        isHidden: !!modelResponse.isMemoryContent 
      };
      
      apiHistoryRef.current.push(modelMessage); 
      setChatHistory(prev => [...prev, modelMessage]);
      
      if (modelResponse.isMemoryContent) setMemoryContent(modelResponse.display_html);
      
      setLastModelResponse(modelResponse);
      setXp(prevXp => prevXp + modelResponse.xp_gained);
    } catch (error) {
      const errorText = error instanceof Error ? error.message : String(error);
      const errorMessage: ChatMessage = { 
        role: 'model', 
        parts: [{ text: `<strong>Ошибка:</strong> ${errorText}` }] 
      };
      setChatHistory(prev => [...prev, errorMessage]); 
      apiHistoryRef.current.push(errorMessage);
    } finally { 
      setIsLoading(false); 
    }
  }, [isOnline, persona]);

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

  const achievementsCount = useMemo(() => `${unlockedAchievements.size}/${ACHIEVEMENTS.length}`, [unlockedAchievements]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900 font-sans">
      {!isOnline && <div className="bg-yellow-100 text-yellow-800 text-center py-2 px-4 font-medium">Офлайн режим: данные сохраняются локально</div>}
      {toastQueue.length > 0 && <AchievementToast key={toastQueue[0].id} achievement={toastQueue[0]} onClose={() => setToastQueue(prev => prev.slice(1))} />}
      {showConfetti && <Confetti />}
      {showPWAPrompt && <PWAPrompt onInstall={handleInstallPWA} onDismiss={dismissPWAPrompt} />}
      <AchievementsPanel isOpen={showAchievementsPanel} onClose={() => setShowAchievementsPanel(false)} allAchievements={ACHIEVEMENTS} unlockedIds={unlockedAchievements} />
      <header className="sticky top-0 z-10 w-full bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {chatHistory.length > 0 && (
              <button onClick={resetGame} className="p-2 text-gray-500 hover:text-violet-600 transition-colors" aria-label="Вернуться на главную"><ArrowLeft className="w-6 h-6" /></button>
            )}
            <BrainCircuit className="w-7 h-7 text-violet-600" />
            <h1 className="text-2xl font-bold text-gray-800">NeuroVibe</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowAchievementsPanel(true)} className="text-gray-500 hover:text-violet-600 transition-colors relative" aria-label="Показать достижения">
              <Trophy className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{achievementsCount}</span>
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
            <div className="mx-2 mb-2 p-3 rounded-lg bg-yellow-100 text-yellow-800 text-sm">
              🔥 {quest.title}: {quest.description}
            </div>
          )}

          {memoryContent && <MemoryCard content={memoryContent} onReady={() => setMemoryContent(null)} />}

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
          {chatHistory.length === 0 && !isLoading && !memoryContent && !currentMode ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ModeButton icon={<MessageSquare className="w-5 h-5" />} title="Слова" description="Запомни 7 слов" onClick={() => handleModeSelect('words')} />
              <ModeButton icon={<BookOpenText className="w-5 h-5" />} title="История" description="Ответить на 3 вопроса" onClick={() => handleModeSelect('story')} />
              <ModeButton icon={<Users className="w-5 h-5" />} title="Ассоциации" description="Оцени связь" onClick={() => handleModeSelect('associations')} />
            </div>
          ) : (
            <form onSubmit={handleSend} className="flex items-center gap-3">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ваш ответ..." disabled={isLoading || !isOnline || !!memoryContent} className="flex-grow px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-gray-100" aria-label="Поле для ввода ответа" autoComplete="off" />
              <button type="submit" disabled={isLoading || !input.trim() || !isOnline || !!memoryContent} className="p-3 bg-violet-600 text-white rounded-lg shadow-md hover:bg-violet-700 transition-colors duration-200 disabled:bg-gray-400 disabled:shadow-none flex items-center justify-center min-w-[48px]" aria-label={isLoading ? "Отправка..." : "Отправить"}>
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
              </button>
            </form>
          )}
        </div>
      </footer>
    </div>
  );
}
