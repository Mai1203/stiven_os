export interface FrameData {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AnimationData {
  texture?: string;
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
  stats: {
    attack: number;
    speed: number;
    defense: number;
  };
  lore: string;
  animations: {
    [key: string]: AnimationData;
  };
}

export const SAMURAI_DATA: FighterAtlasData = {
  name: 'SAMURAI',
  stats: { attack: 85, speed: 70, defense: 60 },
  lore: 'Un guerrero solitario que busca redención a través del filo de su katana. Su velocidad es legendaria.',
  textureKey: 'samurai_idle',
  frameWidth: 128,
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
  stats: { attack: 70, speed: 60, defense: 90 },
  lore: 'Líder nato de las fuerzas imperiales. Su armadura pesada y disciplina lo hacen un muro inamovible.',
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

export const ARCHER_DATA: FighterAtlasData = {
  name: 'ARCHER',
  stats: { attack: 65, speed: 85, defense: 20 },
  lore: 'Experto en combate a distancia. Su puntería es infalible y su agilidad le permite mantener la distancia necesaria.',
  textureKey: 'archer_idle',
  frameWidth: 128,
  frameHeight: 128,
  animations: {
    idle: { texture: 'archer_idle', frames: [0, 1, 2, 3, 4, 5, 6, 7], frameRate: 8, repeat: true },
    walk: { texture: 'archer_walk', frames: [0, 1, 2, 3, 4, 5, 6, 7], frameRate: 10, repeat: true },
    run: { texture: 'archer_run', frames: [0, 1, 2, 3, 4, 5, 6, 7], frameRate: 12, repeat: true },
    jump: { texture: 'archer_jump', frames: [0, 1, 2, 3, 4, 5, 6, 7, 8], frameRate: 10, repeat: false },
    fall: { texture: 'archer_jump', frames: [8], frameRate: 1, repeat: false },
    protection: { texture: 'archer_idle', frames: [0], frameRate: 5, repeat: true }, // Archer doesn't have protect sprite in list, use idle frame
    attack1: { texture: 'archer_attack_1', frames: [0, 1, 2, 3, 4, 5], frameRate: 15, repeat: false },
    attack2: { texture: 'archer_attack_2', frames: [0, 1, 2, 3, 4, 5], frameRate: 15, repeat: false },
    attack3: { texture: 'archer_attack_3', frames: [0, 1, 2, 3, 4, 5], frameRate: 15, repeat: false },
    shot: { texture: 'archer_shot', frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], frameRate: 20, repeat: false },
    hurt: { texture: 'archer_hurt', frames: [0, 1, 2], frameRate: 10, repeat: false },
    dead: { texture: 'archer_dead', frames: [0, 1, 2, 3, 4, 5], frameRate: 8, repeat: false }
  }
};
