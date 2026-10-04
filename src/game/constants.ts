import type { AILevels, AnimId, CamId, RoomId } from "./types";

export const ART = {
  office: "/art/office.jpg",
  portrait: "/art/diddy-portrait.jpg",
  lurk: "/art/diddy-lurk.jpg",
  door: "/art/diddy-door.jpg",
  jumpscare: "/art/diddy-jumpscare.jpg",
  faces: "/art/menu-faces.jpg",
  rooms: {
    stage: "/art/cam-stage.jpg",
    lounge: "/art/cam-lounge.jpg",
    cove: "/art/cam-cove.jpg",
    westHall: "/art/cam-west.jpg",
    westCorner: "/art/cam-west-corner.jpg",
    closet: "/art/cam-closet.jpg",
    eastHall: "/art/cam-east.jpg",
    eastCorner: "/art/cam-east-corner.jpg",
    backstage: "/art/cam-backstage.jpg",
    kitchen: "/art/cam-kitchen.jpg",
  } satisfies Record<Exclude<RoomId, "leftDoor" | "rightDoor" | "office">, string>,
} as const;

export const PRELOAD = [
  ART.office,
  ART.portrait,
  ART.lurk,
  ART.door,
  ART.jumpscare,
  ART.faces,
  ...Object.values(ART.rooms),
];

export const NIGHT_LENGTH = 240;

export const CAMS: {
  id: CamId;
  room: Exclude<RoomId, "leftDoor" | "rightDoor" | "office">;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
}[] = [
  { id: "1A", room: "stage", label: "Show Stage", x: 36, y: 3, w: 28, h: 14 },
  { id: "1B", room: "lounge", label: "Lounge", x: 32, y: 19, w: 36, h: 16 },
  { id: "1C", room: "cove", label: "Curtain Nook", x: 70, y: 19, w: 22, h: 14 },
  { id: "5", room: "backstage", label: "Backstage", x: 8, y: 19, w: 22, h: 14 },
  { id: "2A", room: "westHall", label: "West Hall", x: 10, y: 38, w: 24, h: 14 },
  { id: "2B", room: "westCorner", label: "West Corner", x: 10, y: 54, w: 24, h: 14 },
  { id: "3", room: "closet", label: "Supply", x: 10, y: 70, w: 20, h: 12 },
  { id: "4A", room: "eastHall", label: "East Hall", x: 66, y: 38, w: 24, h: 14 },
  { id: "4B", room: "eastCorner", label: "East Corner", x: 66, y: 54, w: 24, h: 14 },
  { id: "6", room: "kitchen", label: "Kitchen", x: 70, y: 70, w: 22, h: 12 },
];

export const ROOM_TO_CAM: Partial<Record<RoomId, CamId>> = Object.fromEntries(
  CAMS.map((c) => [c.room, c.id]),
) as Partial<Record<RoomId, CamId>>;

export const NIGHT_AI: Record<number, AILevels> = {
  1: { diddy: 2, puff: 2, dash: 0, static: 0 },
  2: { diddy: 3, puff: 4, dash: 1, static: 1 },
  3: { diddy: 5, puff: 6, dash: 4, static: 2 },
  4: { diddy: 8, puff: 9, dash: 6, static: 5 },
  5: { diddy: 12, puff: 13, dash: 10, static: 8 },
  6: { diddy: 16, puff: 16, dash: 14, static: 12 },
};

export const ANIM_META: Record<
  AnimId,
  { name: string; interval: number; attack: "left" | "right" | "any" }
> = {
  diddy: { name: "Diddy", interval: 4.97, attack: "left" },
  puff: { name: "Puff", interval: 4.93, attack: "right" },
  dash: { name: "Dash", interval: 5.11, attack: "right" },
  static: { name: "Static", interval: 6.07, attack: "any" },
};

export const PATHS: Record<AnimId, Partial<Record<RoomId, RoomId[]>>> = {
  diddy: {
    stage: ["lounge"],
    lounge: ["westHall", "backstage", "closet"],
    westHall: ["westCorner", "lounge", "closet"],
    westCorner: ["leftDoor", "westHall"],
    closet: ["westHall"],
    backstage: ["lounge"],
    leftDoor: ["westCorner"],
  },
  puff: {
    stage: ["lounge"],
    lounge: ["eastHall", "kitchen"],
    eastHall: ["eastCorner", "lounge", "kitchen"],
    eastCorner: ["rightDoor", "eastHall"],
    kitchen: ["eastHall"],
    rightDoor: ["eastCorner"],
  },
  dash: {
    cove: ["eastHall"],
    eastHall: ["eastCorner"],
    eastCorner: ["rightDoor"],
    rightDoor: ["cove"],
  },
  static: {
    backstage: ["lounge", "closet", "kitchen", "stage"],
    stage: ["lounge", "backstage"],
    lounge: ["westHall", "eastHall", "backstage", "kitchen"],
    westHall: ["westCorner", "closet", "lounge"],
    westCorner: ["westHall"],
    closet: ["westHall", "backstage"],
    eastHall: ["eastCorner", "kitchen", "lounge"],
    eastCorner: ["eastHall"],
    kitchen: ["eastHall", "lounge"],
  },
};

export const START_ROOMS: Record<AnimId, RoomId> = {
  diddy: "stage",
  puff: "stage",
  dash: "cove",
  static: "backstage",
};

export const PHONE: Record<number, string> = {
  1: `*static* Uh. Hello? Hello, hello.

First night at Diddy Entertainment. Congrats, I guess.

The job is simple. Sit in the office. Watch the cameras. If something is standing in a doorway, shut the door.

Do not leave the doors shut all night. The power in this building is a joke.

They used to be stage figures. After midnight they get restless. They like the halls. They like the office more.

Check the west and east corners. If you see golden eyes in the dark, that is not a reflection.

Alright. I'll call tomorrow. Maybe. *click*`,
  2: `*static* Night two.

They move more after the first night. I don't know why. Don't ask.

Keep an eye on the lounge — that's the junction. If the stage is empty, they are already walking.

Lights are cheap compared to doors. Peek, then close.

And check the curtain nook. If that curtain looks wrong, it is wrong. *click*`,
  3: `*static* Yeah. So.

There's a runner. We call him Dash. He waits in the curtain nook. If you don't look at him, he decides you forgot.

Then he takes the east hall at a sprint. If that right door is open when he arrives, you will not clock out.

Tap cam 1C now and then. Stall him. That's the whole trick.

Power's worse tonight. Be greedy with it. *click*`,
  4: `*static* The cameras lie a little after 3 AM.

Static likes to sit in a feed and burn it out. If a camera dies, switch. Don't stare.

You will hear the kitchen even when you don't look. Pans. That's not the plumbing.

I wouldn't stay for night five, but that's just me. *click*`,
  5: `*static* Last scheduled night.

I won't call again. If you hear footsteps in the office it is already too late.

Both halls. Both corners. The nook. Don't get proud of a closed door — look at the power.

Six AM. That's the whole religion. *click*`,
  6: `*static* ...you're still here.

There is no advice left. They know the office now.

Don't blink. *click*`,
};

export const HOURS = ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM"];

export function hourLabel(hour: number) {
  return HOURS[Math.max(0, Math.min(6, hour))] ?? "12 AM";
}

export function usageOf(s: {
  leftDoor: boolean;
  rightDoor: boolean;
  leftLight: boolean;
  rightLight: boolean;
  camsUp: boolean;
}) {
  return (
    1 +
    (s.leftDoor ? 1 : 0) +
    (s.rightDoor ? 1 : 0) +
    (s.leftLight || s.rightLight ? 1 : 0) +
    (s.camsUp ? 1 : 0)
  );
}

export function drainRate(night: number, usage: number) {
  const base = 0.072 + night * 0.01;
  return base + Math.max(0, usage - 1) * 0.11;
}
