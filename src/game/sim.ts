import {
  ANIM_META,
  drainRate,
  NIGHT_AI,
  NIGHT_LENGTH,
  PATHS,
  ROOM_TO_CAM,
  START_ROOMS,
  usageOf,
} from "./constants";
import type { AILevels, AnimId, AnimState, CamId, FxEvent, RoomId, SimState } from "./types";

function roll() {
  return 1 + Math.floor(Math.random() * 20);
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function cloneAnims(anims: Record<AnimId, AnimState>): Record<AnimId, AnimState> {
  return {
    diddy: { ...anims.diddy },
    puff: { ...anims.puff },
    dash: { ...anims.dash },
    static: { ...anims.static },
  };
}

export function createSim(night: number, ai?: AILevels): SimState {
  const levels = ai ?? NIGHT_AI[night] ?? NIGHT_AI[5]!;
  const mk = (id: AnimId): AnimState => ({
    id,
    room: START_ROOMS[id],
    cooldown: Math.random() * 1.5,
    dashStage: 0,
    running: false,
    runT: 0,
    inOffice: false,
  });
  return {
    night,
    hour: 0,
    elapsed: 0,
    nightLength: NIGHT_LENGTH,
    power: 100,
    leftDoor: false,
    rightDoor: false,
    leftLight: false,
    rightLight: false,
    camsUp: false,
    cam: "1A",
    ai: { ...levels },
    anims: {
      diddy: mk("diddy"),
      puff: mk("puff"),
      dash: mk("dash"),
      static: mk("static"),
    },
    camDisabled: {},
    camWatch: 0,
    hallT: 0,
    powerOutT: 0,
    powerOutKill: 10 + Math.random() * 10,
    inOfficeWait: 0,
    dead: false,
    won: false,
    powerOut: false,
  };
}

function watching(s: SimState, room: RoomId) {
  if (!s.camsUp) return false;
  return ROOM_TO_CAM[room] === s.cam && !s.camDisabled[s.cam];
}

function aiNow(s: SimState, id: AnimId) {
  let n = s.ai[id];
  if (s.hour >= 3) n += 1;
  if (s.hour >= 4) n += 1;
  return Math.min(20, n);
}

function tryKill(s: SimState, events: FxEvent[], id: AnimId) {
  if (s.dead || s.won) return;
  s.dead = true;
  events.push({ type: "jumpscare", id });
}

function moveWalker(s: SimState, events: FxEvent[], id: "diddy" | "puff" | "static") {
  const a = s.anims[id];
  if (a.inOffice) return;
  const level = aiNow(s, id);
  if (level <= 0) return;
  if (roll() > level) return;

  const options = PATHS[id][a.room];
  if (!options?.length) return;
  let next = pick(options);

  if (next === "leftDoor") {
    if (s.leftDoor) {
      events.push({ type: "doorRefuse", side: "left" });
      next = "westHall";
    }
  }
  if (next === "rightDoor") {
    if (s.rightDoor) {
      events.push({ type: "doorRefuse", side: "right" });
      next = "eastHall";
    }
  }

  if (a.room === "leftDoor" && s.leftDoor) {
    next = "westHall";
    events.push({ type: "doorRefuse", side: "left" });
  }
  if (a.room === "rightDoor" && s.rightDoor) {
    next = "eastHall";
    events.push({ type: "doorRefuse", side: "right" });
  }

  const from = a.room;
  if (from === next) return;
  const seen = watching(s, from) || watching(s, next);
  a.room = next;
  events.push({ type: "move", id, from, to: next, watched: seen });
  events.push({ type: "footstep", room: next });

  if (next === "leftDoor" && !s.leftDoor) {
    /* waiting at door */
  }
  if (id === "static" && seen && s.camsUp) {
    events.push({ type: "camGlitch", cam: s.cam });
  }
}

function stepDash(s: SimState, dt: number, events: FxEvent[]) {
  const a = s.anims.dash;
  const level = aiNow(s, "dash");
  if (level <= 0) {
    a.dashStage = 0;
    a.running = false;
    a.room = "cove";
    return;
  }

  if (a.running) {
    a.runT += dt;
    if (a.room === "cove" && a.runT > 0.4) a.room = "eastHall";
    if (a.room === "eastHall" && a.runT > 1.3) a.room = "eastCorner";
    if (a.room === "eastCorner" && a.runT > 2.1) a.room = "rightDoor";
    if (a.runT >= 2.5) {
      if (s.rightDoor) {
        events.push({ type: "dashBonk" });
        s.power = Math.max(0, s.power - 1.2);
        a.running = false;
        a.runT = 0;
        a.dashStage = 0;
        a.room = "cove";
      } else {
        tryKill(s, events, "dash");
      }
    }
    return;
  }

  a.cooldown += dt;
  if (watching(s, "cove")) {
    a.cooldown = Math.min(a.cooldown, ANIM_META.dash.interval * 0.4);
    if (a.dashStage > 0 && Math.random() < dt * 0.25) a.dashStage -= 1;
    return;
  }
  if (a.cooldown < ANIM_META.dash.interval) return;
  a.cooldown = 0;
  if (roll() > level) return;
  a.dashStage += 1;
  if (a.dashStage >= 4) {
    a.running = true;
    a.runT = 0;
    events.push({ type: "dashRun" });
  }
}

function occupyOffice(s: SimState, events: FxEvent[], dt: number) {
  for (const id of ["diddy", "puff", "static"] as const) {
    const a = s.anims[id];
    if (a.room === "leftDoor" && !s.leftDoor) {
      a.cooldown += dt;
      if (a.cooldown > ANIM_META[id].interval * 1.15) {
        a.inOffice = true;
        a.room = "office";
      }
    }
    if (a.room === "rightDoor" && !s.rightDoor) {
      a.cooldown += dt;
      if (a.cooldown > ANIM_META[id].interval * 1.15) {
        a.inOffice = true;
        a.room = "office";
      }
    }
  }

  const insider = (["diddy", "puff", "static", "dash"] as const).find((id) => s.anims[id].inOffice);
  if (!insider) {
    s.inOfficeWait = 0;
    return;
  }
  s.inOfficeWait += dt;
  if (!s.camsUp || s.inOfficeWait > 5) {
    tryKill(s, events, insider);
  }
}

export function occupants(s: SimState, room: RoomId): AnimId[] {
  return (Object.keys(s.anims) as AnimId[]).filter((id) => s.anims[id].room === room);
}

export function step(prev: SimState, dt: number): { state: SimState; events: FxEvent[] } {
  const s: SimState = {
    ...prev,
    ai: { ...prev.ai },
    camDisabled: { ...prev.camDisabled },
    anims: cloneAnims(prev.anims),
  };
  const events: FxEvent[] = [];
  const t = Math.min(dt, 0.1);

  if (s.dead || s.won) return { state: s, events };

  s.elapsed += t;
  const hourLen = s.nightLength / 6;
  const nextHour = Math.min(6, Math.floor(s.elapsed / hourLen));
  if (nextHour !== s.hour) {
    s.hour = nextHour;
    if (s.hour >= 6) {
      s.won = true;
      s.hour = 6;
      events.push({ type: "sixam" });
      return { state: s, events };
    }
  }

  if (s.powerOut) {
    s.leftDoor = false;
    s.rightDoor = false;
    s.leftLight = false;
    s.rightLight = false;
    s.camsUp = false;
    s.powerOutT += t;
    if (s.powerOutT >= s.powerOutKill) {
      tryKill(s, events, "diddy");
    }
    return { state: s, events };
  }

  const usage = usageOf(s);
  s.power -= drainRate(s.night, usage) * t;
  if (s.power <= 0) {
    s.power = 0;
    s.powerOut = true;
    s.powerOutT = 0;
    s.leftDoor = false;
    s.rightDoor = false;
    s.leftLight = false;
    s.rightLight = false;
    s.camsUp = false;
    events.push({ type: "powerout" });
    return { state: s, events };
  }

  if (s.camsUp) s.camWatch += t;
  else s.camWatch = 0;

  for (const cam of Object.keys(s.camDisabled) as CamId[]) {
    const left = (s.camDisabled[cam] ?? 0) - t;
    if (left <= 0) delete s.camDisabled[cam];
    else s.camDisabled[cam] = left;
  }

  if (s.anims.static.room && watching(s, s.anims.static.room) && s.camWatch > 5.5) {
    s.camDisabled[s.cam] = 8 + Math.random() * 4;
    events.push({ type: "camGlitch", cam: s.cam });
    s.camWatch = 0;
  }

  s.hallT -= t;
  if (s.hallT <= 0 && aiNow(s, "static") > 4 && !s.camsUp && Math.random() < t * 0.04) {
    s.hallT = 12;
    events.push({ type: "hallucination" });
  }

  for (const id of ["diddy", "puff", "static"] as const) {
    const a = s.anims[id];
    a.cooldown += t;
    if (a.cooldown >= ANIM_META[id].interval) {
      a.cooldown -= ANIM_META[id].interval;
      moveWalker(s, events, id);
    }
  }
  stepDash(s, t, events);
  occupyOffice(s, events, t);

  return { state: s, events };
}
