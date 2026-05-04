export interface FrameData {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AnimationData {
  texture?: string; // Key of the spritesheet for this specific animation
  frames: number[];
  frameRate: number;
  repeat: boolean;
  offsetX?: number;
  offsetY?: number;
}

export interface FighterAtlasData {
  textureKey: string;
  frameWidth: number;
  frameHeight: number;
  name: string;
  animations: {
    [key: string]: AnimationData;
  };
}

export const SAMURAI_DATA: FighterAtlasData = {
  name: 'SAMURAI',
  textureKey: 'samurai_idle',
  frameWidth: 128, // Ajustar según el tamaño real del sprite
  frameHeight: 128,
  animations: {
    idle: { texture: 'samurai_idle', frames: [0, 1, 2, 3, 4, 5], frameRate: 8, repeat: true },
    walk: { texture: 'samurai_walk', frames: [0, 1, 2, 3, 4, 5, 6, 7, 8], frameRate: 10, repeat: true },
    run: { texture: 'samurai_run', frames: [0, 1, 2, 3, 4, 5, 6, 7], frameRate: 12, repeat: true },
    jump: { texture: 'samurai_jump', frames: [0, 1, 2, 3, 4, 5, 6, 7, 8], frameRate: 10, repeat: false },
    fall: { texture: 'samurai_jump', frames: [8], frameRate: 1, repeat: false },
    protection: { texture: 'samurai_protect', frames: [0, 1], frameRate: 5, repeat: true },
    attack1: { texture: 'samurai_attack_1', frames: [0, 1, 2, 3, 4, 5], frameRate: 15, repeat: false },
    attack2: { texture: 'samurai_attack_2', frames: [0, 1, 2, 3, 4, 5], frameRate: 15, repeat: false },
    attack3: { texture: 'samurai_attack_3', frames: [0, 1, 2, 3, 4, 5], frameRate: 15, repeat: false },
    hurt: { texture: 'samurai_hurt', frames: [0, 1, 2], frameRate: 10, repeat: false },
    dead: { texture: 'samurai_dead', frames: [0, 1, 2, 3, 4, 5], frameRate: 8, repeat: false }
  }
};

export const COMMANDER_DATA: FighterAtlasData = {
  name: 'COMMANDER',
  textureKey: 'commander_idle',
  frameWidth: 128,
  frameHeight: 128,
  animations: {
    idle: { texture: 'commander_idle', frames: [0, 1, 2, 3, 4, 5], frameRate: 8, repeat: true },
    walk: { texture: 'commander_walk', frames: [0, 1, 2, 3, 4, 5, 6, 7, 8], frameRate: 10, repeat: true },
    run: { texture: 'commander_run', frames: [0, 1, 2, 3, 4, 5, 6, 7, 8], frameRate: 12, repeat: true },
    jump: { texture: 'commander_jump', frames: [0, 1, 2, 3, 4, 5, 6, 7, 8], frameRate: 10, repeat: false },
    fall: { texture: 'commander_jump', frames: [8], frameRate: 1, repeat: false },
    protection: { texture: 'commander_protect', frames: [0, 1], frameRate: 5, repeat: true },
    attack1: { texture: 'commander_attack_1', frames: [0, 1, 2, 3, 4, 5], frameRate: 15, repeat: false },
    attack2: { texture: 'commander_attack_2', frames: [0, 1, 2, 3, 4, 5], frameRate: 15, repeat: false },
    attack3: { texture: 'commander_attack_3', frames: [0, 1, 2, 3, 4, 5], frameRate: 15, repeat: false },
    hurt: { texture: 'commander_hurt', frames: [0, 1, 2], frameRate: 10, repeat: false },
    dead: { texture: 'commander_dead', frames: [0, 1, 2, 3, 4, 5], frameRate: 8, repeat: false }
  }
};
