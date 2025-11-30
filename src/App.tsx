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
import { ArrowLeft, MessageSquare, BookOpenText, Loader2, Send, Users, Eye } from 'lucide-react';
import { Layout } from './components/Layout';
import { DashboardHeader } from './components/DashboardHeader';
import { RoleSelector } from './components/RoleSelector';
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
      const modelResponse = await generateJsonResponse(currentHistory, persona, currentMode);

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
      associations: 'Начни режим ассоциаций: дай набор ассоциаций для теста.',
      details: 'Начни режим детали: опиши сцену с деталями для запоминания.'
    };

    sendMessage(prompts[mode], true);
  }, [sendMessage]);

  useEffect(() => {
    if (chatHistory.length > 0) return;

    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode') as GameMode;
    const sharedText = urlParams.get('text');

    if (mode && ['words', 'story', 'associations', 'details'].includes(mode)) {
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

            {/* Role Selector */}
            <RoleSelector currentPersona={persona} onChange={setPersona} />

            {/* Middle Row: Banner */}
            <div
              className="relative overflow-hidden rounded-2xl bg-yellow-50 border border-yellow-100 p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-yellow-800 mb-1 flex items-center gap-2">
                    <span className="text-2xl">🧠</span> Тренировка мозга: Прокачивай память и внимание ежедневно
                  </h3>
                </div>
              </div>
            </div>

            {/* Bottom Row: Game Cards */}
            <div className="grid grid-cols-2 gap-4">
              <ModuleCard
                title="Слова"
                description="Запомни 7 слов"
                icon={<MessageSquare className="w-6 h-6" />}
                onClick={() => handleModeSelect('words')}
                colorClass="text-violet-500"
                delay={0}
              />

              <ModuleCard
                title="История"
                description="Понимание истории"
                icon={<BookOpenText className="w-6 h-6" />}
                onClick={() => handleModeSelect('story')}
                colorClass="text-pink-500"
                delay={1}
              />

              <ModuleCard
                title="Ассоциации"
                description="Тренировка ассоциаций"
                icon={<Users className="w-6 h-6" />}
                onClick={() => handleModeSelect('associations')}
                colorClass="text-blue-500"
                delay={2}
              />

              <ModuleCard
                title="Детали"
                description="Внимание к деталям"
                icon={<Eye className="w-6 h-6" />}
                onClick={() => handleModeSelect('details')}
                colorClass="text-emerald-500"
                delay={3}
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
              {chatHistory.map((msg, index) => {
                if (msg.isHidden) return null;
                const isUser = msg.role === 'user';

                return (
                  <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={isUser
                        ? "bg-bento-accent text-white p-4 rounded-2xl rounded-br-sm max-w-[85%] shadow-lg shadow-bento-accent/10"
                        : "bg-bento-card border border-gray-200 text-gray-900 p-4 rounded-2xl rounded-bl-sm max-w-[85%] shadow-lg"
                      }
                    >
                      {isUser ? (
                        <span>{msg.parts[0].text}</span>
                      ) : (
                        <div
                          className="prose prose-sm max-w-none text-gray-900"
                          dangerouslySetInnerHTML={{ __html: msg.parts[0].text }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}

              {memoryContent && (
                <MemoryCard
                  content={memoryContent}
                  onReady={() => {
                    setMemoryContent(null);
                    if (currentMode === 'story' || currentMode === 'details') {
                      sendMessage("Контент запомнен. Задай вопрос.", true);
                    }
                  }}
                />
              )}

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
                  className="flex-grow px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bento-accent/50 focus:border-bento-accent/50 transition-all disabled:opacity-50"
                  autoComplete="off"
                />

                {/* Next Button */}
                {!isLoading && !memoryContent && !input.trim() && (
                  <button
                    type="button"
                    onClick={() => sendMessage("Дальше", false)}
                    className="p-3 bg-violet-100 text-violet-600 rounded-xl hover:bg-violet-200 hover:text-violet-900 transition-all font-medium flex-shrink-0"
                    title="Следующий вопрос"
                  >
                    Дальше
                  </button>
                )}

                {/* Continue Button */}
                {!isLoading && !memoryContent && !input.trim() && (
                  <button
                    type="button"
                    onClick={() => {
                      const prompts: Record<string, string> = {
                        words: 'Давай еще раунд слов.',
                        story: 'Давай еще одну историю.',
                        associations: 'Давай еще ассоциации.',
                        details: 'Давай еще одну сцену с деталями.'
                      };
                      if (currentMode && prompts[currentMode]) {
                        sendMessage(prompts[currentMode], true);
                      }
                    }}
                    className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 hover:text-gray-900 transition-all flex-shrink-0"
                    title="Продолжить игру"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                      <path d="M3 3v5h5" />
                      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                      <path d="M16 21h5v-5" />
                    </svg>
                  </button>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !input.trim() || !isOnline || !!memoryContent}
                  className="p-3 bg-bento-accent text-white rounded-xl shadow-lg shadow-bento-accent/20 hover:bg-violet-500 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100 flex-shrink-0"
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
