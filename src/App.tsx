// src/App.tsx
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ChatMessage, GameMode, AchievementId, Achievement, AchievementCheckContext, Persona } from './types';
import { ACHIEVEMENTS } from './achievements';
import { generateJsonResponse } from './services/geminiService';
import { OfflineStorage } from './offlineStorage';
import { AchievementToast } from './components/AchievementToast';
import { AchievementsPanel } from './components/AchievementsPanel';
import { PWAPrompt } from './components/PWAPrompt';
import { MemoryCard } from './components/MemoryCard';
import { useDailyQuest } from './hooks/useDailyQuest';
import { Confetti } from './components/Confetti';

// New Components
import { BrainCircuit, Trophy, ArrowLeft, MessageSquare, BookOpenText, Loader2, Send } from 'lucide-react';
import { Layout } from './components/Layout';
import { BentoCard } from './components/BentoGrid';
import { DashboardHeader } from './components/DashboardHeader';
import { CharacterCard } from './components/CharacterCard';
import { ModuleCard } from './components/ModuleCard';

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

  // Determine if we are in a game/chat mode
  const isGameActive = chatHistory.length > 0 || currentMode;

  return (
    <Layout>
      {!isOnline && (
        <div className="mb-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 text-center py-2 px-4 rounded-xl font-medium backdrop-blur-sm">
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

      {/* Header is always visible unless deep in game? No, let's keep it but maybe simplified in game */}
      <DashboardHeader
        xp={xp}
        achievementsCount={achievementsCount}
        onOpenAchievements={() => setShowAchievementsPanel(true)}
        onReset={resetGame}
        showBack={!!isGameActive}
      />

      {/* Main Content Area */}
      <div className="relative min-h-[60vh]">

        {/* Dashboard View */}
        {!isGameActive && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Top Row: 3 Cards */}
            <div className="grid grid-cols-3 gap-4">
              <BentoCard
                className="aspect-square flex flex-col items-center justify-center text-center p-4"
                onClick={() => handleModeSelect('associations')}
              >
                <div className="mb-3 p-3 rounded-full bg-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                  <BrainCircuit className="w-8 h-8 text-violet-400" />
                </div>
                <span className="text-sm font-medium text-gray-300">Ассоциации</span>
              </BentoCard>

              <CharacterCard currentPersona={persona} onChange={setPersona} />

              <BentoCard
                className="aspect-square flex flex-col items-center justify-center text-center p-4"
                onClick={() => setShowAchievementsPanel(true)}
              >
                <div className="mb-3 p-3 rounded-full bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <Trophy className="w-8 h-8 text-emerald-400" />
                </div>
                <span className="text-sm font-medium text-gray-300">Прогресс</span>
              </BentoCard>
            </div>

            {/* Middle Row: Banner */}
            <div
              onClick={() => handleModeSelect('words')}
              className="relative overflow-hidden rounded-2xl glass-card glass-card-gold p-6 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#c2b280] mb-1">Новые модули доступны</h3>
                  <p className="text-sm text-[#c2b280]/70">Расширь свои когнитивные горизонты.</p>
                </div>
                <div className="p-2 rounded-full bg-[#c2b280]/10 group-hover:bg-[#c2b280]/20 transition-colors shadow-[0_0_10px_rgba(194,178,128,0.2)]">
                  <ArrowLeft className="w-5 h-5 text-[#c2b280] rotate-180 icon-glow-gold" />
                </div>
              </div>
            </div>

            {/* Bottom Row: 2 Large Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ModuleCard
                title="Слова и Фразы"
                description="Запомни 7 слов"
                icon={<MessageSquare className="w-6 h-6" />}
                onClick={() => handleModeSelect('words')}
                colorClass="text-blue-400"
                delay={0}
              />

              <ModuleCard
                title="История и Сюжет"
                description="Пойми контекст"
                icon={<BookOpenText className="w-6 h-6" />}
                onClick={() => handleModeSelect('story')}
                colorClass="text-pink-400"
                delay={1}
              />
            </div>
          </div>
        )}

        {/* Game/Chat View */}
        {isGameActive && (
          <div className="flex flex-col h-[calc(100vh-180px)]">
            <div className="flex items-center mb-4">
              <button
                onClick={resetGame}
                className="flex items-center gap-2 text-bento-muted hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Назад в меню</span>
              </button>
            </div>

            <div
              ref={chatContainerRef}
              className="flex-grow overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            >
              {memoryContent && <MemoryCard content={memoryContent} onReady={() => setMemoryContent(null)} />}

              {chatHistory.map((msg, index) => {
                if (msg.isHidden) return null;
                const isUser = msg.role === 'user';

                return (
                  <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={isUser
                        ? "bg-bento-accent text-white p-4 rounded-2xl rounded-br-sm max-w-[85%] shadow-lg shadow-bento-accent/10"
                        : "bg-bento-card border border-white/5 text-gray-200 p-4 rounded-2xl rounded-bl-sm max-w-[85%] shadow-lg"
                      }
                    >
                      {isUser ? (
                        <span>{msg.parts[0].text}</span>
                      ) : (
                        <div
                          className="prose prose-invert prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: msg.parts[0].text }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-bento-card border border-white/5 p-4 rounded-2xl rounded-bl-sm shadow-lg">
                    <Loader2 className="w-5 h-5 animate-spin text-bento-accent" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="mt-4 pt-4 border-t border-white/5">
              <form onSubmit={handleSend} className="flex items-center gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Введите ваш ответ..."
                  disabled={isLoading || !isOnline || !!memoryContent}
                  className="flex-grow px-4 py-3 bg-bento-inner border border-white/5 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bento-accent/50 focus:border-bento-accent/50 transition-all disabled:opacity-50"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim() || !isOnline || !!memoryContent}
                  className="p-3 bg-bento-accent text-white rounded-xl shadow-lg shadow-bento-accent/20 hover:bg-violet-500 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
