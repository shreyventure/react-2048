/**
 * Local storage service for game data persistence
 */

import { GAME_CONFIG } from '../constants/game';

export class StorageService {
  private static instance: StorageService;

  private constructor() {}

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  public getBestScore(): number {
    try {
      const saved = localStorage.getItem(GAME_CONFIG.LOCAL_STORAGE_KEY);
      return saved ? parseInt(saved, 10) : 0;
    } catch (error) {
      console.warn('Failed to load best score from localStorage:', error);
      return 0;
    }
  }

  public setBestScore(score: number): void {
    try {
      localStorage.setItem(GAME_CONFIG.LOCAL_STORAGE_KEY, score.toString());
    } catch (error) {
      console.warn('Failed to save best score to localStorage:', error);
    }
  }

  public getGameState(size: number): any {
    try {
      const saved = localStorage.getItem(`2048-game-state-${size}`);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.warn('Failed to load game state from localStorage:', error);
      return null;
    }
  }

  public setGameState(size: number, state: any): void {
    try {
      localStorage.setItem(`2048-game-state-${size}`, JSON.stringify(state));
    } catch (error) {
      console.warn('Failed to save game state to localStorage:', error);
    }
  }

  public clearGameState(size: number): void {
    try {
      localStorage.removeItem(`2048-game-state-${size}`);
    } catch (error) {
      console.warn('Failed to clear game state from localStorage:', error);
    }
  }
}