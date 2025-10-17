/**
 * Game configuration constants
 */

export const GAME_CONFIG = {
  DEFAULT_SIZE: 4,
  MIN_SIZE: 2,
  MAX_SIZE: 6,
  WINNING_TILE: 2048,
  NEW_TILE_VALUES: [2, 4],
  NEW_TILE_PROBABILITY: 0.9, // 90% chance for 2, 10% for 4
  ANIMATION_DURATION: 300,
  LOCAL_STORAGE_KEY: '2048-best-score',
} as const;

export const TILE_COLORS = {
  2: { background: '#eee4da', text: '#776e65' },
  4: { background: '#ede0c8', text: '#776e65' },
  8: { background: '#f2b179', text: '#f9f6f2' },
  16: { background: '#f59563', text: '#f9f6f2' },
  32: { background: '#f67c5f', text: '#f9f6f2' },
  64: { background: '#f65e3b', text: '#f9f6f2' },
  128: { background: '#edcf72', text: '#f9f6f2' },
  256: { background: '#edcc61', text: '#f9f6f2' },
  512: { background: '#edc850', text: '#f9f6f2' },
  1024: { background: '#edc53f', text: '#f9f6f2' },
  2048: { background: '#edc22e', text: '#f9f6f2' },
  default: { background: '#3c3a32', text: '#f9f6f2' },
} as const;

export const THEME_COLORS = {
  background: '#faf8ef',
  boardBackground: '#bbada0',
  cellBackground: 'rgba(238,228,218,0.35)',
  textPrimary: '#776e65',
  buttonPrimary: '#8f7a66',
  buttonHover: '#9f8a76',
} as const;

export const DIRECTIONS = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export const KEYBOARD_MAPPINGS = {
  ArrowUp: DIRECTIONS.UP,
  ArrowDown: DIRECTIONS.DOWN,
  ArrowLeft: DIRECTIONS.LEFT,
  ArrowRight: DIRECTIONS.RIGHT,
  w: DIRECTIONS.UP,
  W: DIRECTIONS.UP,
  s: DIRECTIONS.DOWN,
  S: DIRECTIONS.DOWN,
  a: DIRECTIONS.LEFT,
  A: DIRECTIONS.LEFT,
  d: DIRECTIONS.RIGHT,
  D: DIRECTIONS.RIGHT,
} as const;