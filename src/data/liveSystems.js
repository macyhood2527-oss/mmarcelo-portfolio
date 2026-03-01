// src/data/liveSystems.js

import apexCode from '../assets/live/apex/apex-code.png';
import apexReward from '../assets/live/apex/apex-daily-reward.png';
import apexShop from '../assets/live/apex/apex-shop.png';
import apexAdmin from '../assets/live/apex/apex-admin-tools.png';
import apexBoards from '../assets/live/apex/apex-leaderboards.png';

import mountReel from '../assets/live/mount/mount-reel.png';
import mountRods from '../assets/live/mount/mount-rods.png';
import mountInventory from '../assets/live/mount/mount-inventory.png';
import mountWeather from '../assets/live/mount/mount-weather.png';

export const liveSystems = [
  // =========================
  // MAHILAYA APEX
  // =========================
  {
    id: 'mahiliaya-apex-live',
    title: 'Mahilaya Apex — Live Multiplayer Systems',
    emphasis: 'Live',
    summary:
      'A live multiplayer progression game where I implemented persistent checkpoints, global ranking, rewards, economy logic, and admin tooling. Focused on safe server-side state handling and compliance updates.',
    tags: [
      'Roblox Lua',
      'DataStoreService',
      'OrderedDataStore',
      'Client/Server',
      'Live Operations',
      'TextChatService',
    ],
    links: {
      game: 'https://www.roblox.com/games/78031617212300/MAHILAYA-APEX-16-CP-X5-Summit',
      docs: '',
    },
    details: {
      architecture:
        'Server-authoritative progression system using DataStoreService for player persistence and OrderedDataStore for global rankings. UI communicates via RemoteEvents while all validation remains server-side.',
      responsibilities: [
        'Implemented checkpoint + summit persistence with safe get/set wrappers (pcall)',
        'Built global summit leaderboard using OrderedDataStore',
        'Created daily reward system with cooldown + claim validation logic',
        'Developed VIP / entitlement checks with server-side granting',
        'Built admin tools for live moderation and runtime controls',
        'Refactored text input systems for TextChatService compliance',
      ],
      problemsSolved: [
        'Prevented duplicate summit counting using server validation flags',
        'Handled DataStore failures safely with fallback defaults',
        'Maintained global ranking sync without client-side trust',
        'Separated monetization tools from progression logic to avoid state conflicts',
      ],
    },
    media: [
      {
        type: 'image',
        src: apexCode,
        caption: 'DataStore persistence + safe get/set patterns.',
      },
      {
        type: 'image',
        src: apexReward,
        caption: 'Daily reward system with claim state validation.',
      },
      {
        type: 'image',
        src: apexShop,
        caption: 'Shop UI (VIP / tools) with entitlement checks.',
      },
      {
        type: 'image',
        src: apexAdmin,
        caption: 'Admin tools for live moderation and debugging.',
      },
      {
        type: 'image',
        src: apexBoards,
        caption: 'Global summit and donation leaderboards.',
      },
    ],
  },

  // =========================
  // MOUNT MAHILAYA
  // =========================
  {
    id: 'mount-mahilaya-live',
    title: 'Mount Mahilaya — Exploration & Progression Systems',
    emphasis: 'Live',
    summary:
  'A live exploration-based multiplayer system featuring a server-validated fishing mechanic, persistent item inventory, unlockable tool tiers, and environment state controls. Built with focus on state management and clean client–server separation.',
    tags: [
      'Roblox Lua',
      'DataStoreService',
      'Client/Server',
      'Game Economy',
      'UI Systems',
    ],
    links: {
      game: 'https://www.roblox.com/games/138003227569046/MOUNT-MAHILAYA-Chill-Hiking-Obby-X5-Summit',
      docs: '',
    },
    details: {
      architecture:
        'Server-managed progression and fishing systems with persistent state storage. Client UI communicates with server through RemoteEvents while state validation remains server-controlled.',
      responsibilities: [
        'Implemented fishing system with tool equip logic',
        'Built checkpoint-based progression tracking',
        'Created shop system with purchasable utilities',
        'Handled player state restoration on join',
        'Designed UI panels synced with server state',
      ],
      problemsSolved: [
        'Prevented client-side exploitation by validating tool usage on server',
        'Ensured consistent player progression restoration after reconnect',
        'Separated cosmetic features from progression logic for maintainability',
      ],
    },
 media: [
  {
    type: 'image',
    src: mountReel,
    caption:
      'Interactive fishing mechanic with input-based reel system and server-validated catch resolution.',
  },
  {
    type: 'image',
    src: mountRods,
    caption:
      'Rod unlock tiers with equip state logic handled server-side.',
  },
  {
    type: 'image',
    src: mountInventory,
    caption:
      'Persistent fish inventory tracking species, size, and rarity.',
  },
  {
    type: 'image',
    src: mountWeather,
    caption:
      'Weather system allowing environment state changes via UI-triggered events.',
  },
],
  },
];