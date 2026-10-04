export type Screen =
  | "boot"
  | "menu"
  | "newspaper"
  | "intro"
  | "play"
  | "powerout"
  | "jumpscare"
  | "gameover"
  | "sixam"
  | "nightclear"
  | "victory"
  | "custom"
  | "pause";

export type RoomId =
  | "stage"
  | "lounge"
  | "cove"
  | "westHall"
  | "westCorner"
  | "closet"
  | "eastHall"
  | "eastCorner"
  | "backstage"
  | "kitchen"
  | "leftDoor"
  | "rightDoor"
  | "office";

export type CamId = "1A" | "1B" | "1C" | "2A" | "2B" | "3" | "4A" | "4B" | "5" | "6";

export type AnimId = "diddy" | "puff" | "dash" | "static";

export type LookSide = "left" | "center" | "right";

export interface AnimState {
  id: AnimId;
  room: RoomId;
  cooldown: number;
  dashStage: number;
  running: boolean;
  runT: number;
  inOffice: boolean;
}

export interface AILevels {
  diddy: number;
  puff: number;
  dash: number;
  static: number;
}

export type FxEvent =
  | { type: "move"; id: AnimId; from: RoomId; to: RoomId; watched: boolean }
  | { type: "doorRefuse"; side: "left" | "right" }
  | { type: "dashRun" }
  | { type: "dashBonk" }
  | { type: "jumpscare"; id: AnimId }
  | { type: "powerout" }
  | { type: "sixam" }
  | { type: "hallucination" }
  | { type: "camGlitch"; cam: CamId }
  | { type: "footstep"; room: RoomId };

export interface SimState {
  night: number;
  hour: number;
  elapsed: number;
  nightLength: number;
  power: number;
  leftDoor: boolean;
  rightDoor: boolean;
  leftLight: boolean;
  rightLight: boolean;
  camsUp: boolean;
  cam: CamId;
  ai: AILevels;
  anims: Record<AnimId, AnimState>;
  camDisabled: Partial<Record<CamId, number>>;
  camWatch: number;
  hallT: number;
  powerOutT: number;
  powerOutKill: number;
  inOfficeWait: number;
  dead: boolean;
  won: boolean;
  powerOut: boolean;
}
