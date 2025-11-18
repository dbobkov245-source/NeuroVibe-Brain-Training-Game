// src/offlineStorage.ts
import { ChatMessage } from './types';

export interface GameState {
  xp: number;
  gamesPlayed: number;
  unlockedAchievements: string[];
  chatHistory: ChatMessage[];
  lastSaved: number;
}

export class OfflineStorage {
  private readonly DB_NAME = 'NeuroVibeDB';
  private readonly STORE_NAME = 'gameState';
  private db: IDBDatabase | null = null;
  private initialized = false;

  // Инициализация обязательно должна вызываться один раз при старте приложения
  async init(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;

    if (!('indexedDB' in window)) {
      console.warn('IndexedDB not supported, using localStorage fallback');
      return;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, 1);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          db.createObjectStore(this.STORE_NAME, { keyPath: 'id' });
        }
      };
    });
  }

  async saveGameState(state: GameState): Promise<void> {
    if (this.db) {
      return new Promise((resolve, reject) => {
        try {
          const transaction = this.db!.transaction([this.STORE_NAME], 'readwrite');
          const store = transaction.objectStore(this.STORE_NAME);
          const request = store.put({ ...state, id: 'current' });
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        } catch (err) {
          reject(err);
        }
      });
    } else {
      localStorage.setItem('neurovibe-state', JSON.stringify(state));
    }
  }

  async getGameState(): Promise<GameState | null> {
    if (this.db) {
      return new Promise((resolve, reject) => {
        try {
          const transaction = this.db!.transaction([this.STORE_NAME], 'readonly');
          const store = transaction.objectStore(this.STORE_NAME);
          const request = store.get('current');
          request.onsuccess = () => {
            const res = request.result || null;
            // если хранилище возвращает объект с id, нужно убрать id
            if (res) {
              const { id, ...rest } = res;
              resolve(rest as GameState);
            } else {
              resolve(null);
            }
          };
          request.onerror = () => reject(request.error);
        } catch (err) {
          reject(err);
        }
      });
    } else {
      const saved = localStorage.getItem('neurovibe-state');
      return saved ? JSON.parse(saved) : null;
    }
  }

  async clear(): Promise<void> {
    if (this.db) {
      return new Promise((resolve, reject) => {
        try {
          const transaction = this.db!.transaction([this.STORE_NAME], 'readwrite');
          const store = transaction.objectStore(this.STORE_NAME);
          const request = store.delete('current');
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        } catch (err) {
          reject(err);
        }
      });
    } else {
      localStorage.removeItem('neurovibe-state');
    }
  }

  async sync(): Promise<void> {
    // Заглушка: при необходимости сюда можно добавить отправку состояния на сервер
    const state = await this.getGameState();
    if (state) console.log('Syncing game state (local)...', { xp: state.xp, gamesPlayed: state.gamesPlayed });
  }
}
