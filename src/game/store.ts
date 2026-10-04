import { create } from "zustand";
import {
  resumeAudio,
  setAmbience,
  setMuted as setAudioMuted,
  sfxBonk,
  sfxCam,
  sfxDoor,
  sfxFoot,
  sfxHour,
  sfxJumpscare,
  sfxLight,
  sfxPhone,
  sfxPowerDown,
  sfxScare,
  sfxSixAm,
  sfxStaticBurst,
  sfxUi,
  startMusicBox,
  suspendAudio,
  stopMusicBox,
  unlockAudio,
} from "./audio";
import { NIGHT_AI, PHONE } from "./constants";
import { loadSave, writeSave } from "./save";
import { createSim, step } from "./sim";
import type { AILevels, AnimId, CamId, LookSide, Screen, SimState } from "./types";

export interface GameStore {
  screen: Screen;
  prevPlay: Screen;
  sim: SimState | null;
  saveNight: number;
  unlockedCustom: boolean;
  beaten: boolean;
  muted: boolean;
  shake: boolean;
  lookSide: LookSide;
  trauma: number;
  staticAmt: number;
  phone: string | null;
  phoneI: number;
  killer: AnimId | null;
  hallucination: number;
  loadPct: number;
  customAI: AILevels;
  boot: () => void;
  setLoad: (n: number) => void;
  newGame: () => void;
  resume: () => void;
  startNight: (night: number, ai?: AILevels) => void;
  beginPlay: () => void;
  toMenu: () => void;
  toCustom: () => void;
  setCustom: (id: keyof AILevels, v: number) => void;
  startCustom: () => void;
  toggleMute: () => void;
  toggleShake: () => void;
  setLook: (s: LookSide) => void;
  toggleDoor: (side: "left" | "right") => void;
  toggleLight: (side: "left" | "right") => void;
  toggleCams: () => void;
  setCam: (id: CamId) => void;
  skipPhone: () => void;
  tick: (dt: number) => void;
  addTrauma: (n: number) => void;
  retry: () => void;
  nextNight: () => void;
  pause: () => void;
  unpause: () => void;
}

const save0 = loadSave();

export const useGame = create<GameStore>((set, get) => ({
  screen: "boot",
  prevPlay: "play",
  sim: null,
  saveNight: save0.night,
  unlockedCustom: save0.unlockedCustom,
  beaten: save0.beaten,
  muted: save0.muted,
  shake: save0.shake,
  lookSide: "center",
  trauma: 0,
  staticAmt: 0.08,
  phone: null,
  phoneI: 0,
  killer: null,
  hallucination: 0,
  loadPct: 0,
  customAI: { diddy: 10, puff: 10, dash: 10, static: 10 },

  boot: () => {
    setAudioMuted(get().muted);
    set({ screen: "menu" });
    setAmbience("menu");
  },
  setLoad: (n) => set({ loadPct: n }),

  newGame: () => {
    void unlockAudio();
    sfxUi();
    writeSave({ night: 1 });
    set({ saveNight: 1, screen: "newspaper" });
  },
  resume: () => {
    void unlockAudio();
    sfxUi();
    const s = loadSave();
    get().startNight(Math.max(1, s.night));
  },
  startNight: (night, ai) => {
    void unlockAudio();
    stopMusicBox();
    const sim = createSim(night, ai);
    writeSave({ night });
    set({
      sim,
      saveNight: night,
      screen: "intro",
      lookSide: "center",
      trauma: 0,
      staticAmt: 0.08,
      killer: null,
      hallucination: 0,
      phone: null,
      phoneI: 0,
    });
  },
  beginPlay: () => {
    const night = get().sim?.night ?? 1;
    const script = PHONE[night] ?? null;
    set({
      screen: "play",
      phone: script,
      phoneI: 0,
    });
    if (script) sfxPhone();
    setAmbience("office");
  },
  toMenu: () => {
    stopMusicBox();
    setAmbience("menu");
    set({ screen: "menu", sim: null, phone: null });
  },
  toCustom: () => {
    sfxUi();
    set({ screen: "custom" });
  },
  setCustom: (id, v) =>
    set((s) => ({ customAI: { ...s.customAI, [id]: Math.max(0, Math.min(20, v)) } })),
  startCustom: () => {
    get().startNight(7, get().customAI);
  },
  toggleMute: () => {
    const v = !get().muted;
    setAudioMuted(v);
    writeSave({ muted: v });
    set({ muted: v });
  },
  toggleShake: () => {
    const v = !get().shake;
    writeSave({ shake: v });
    set({ shake: v });
  },
  setLook: (lookSide) => set({ lookSide }),
  toggleDoor: (side) => {
    const sim = get().sim;
    if (!sim || sim.powerOut || get().screen !== "play") return;
    const next = {
      ...sim,
      leftDoor: side === "left" ? !sim.leftDoor : sim.leftDoor,
      rightDoor: side === "right" ? !sim.rightDoor : sim.rightDoor,
    };
    if (side === "left" && next.leftDoor) next.leftLight = false;
    if (side === "right" && next.rightDoor) next.rightLight = false;
    sfxDoor(side === "left" ? next.leftDoor : next.rightDoor, side);
    set({ sim: next, trauma: Math.min(1, get().trauma + 0.12) });
  },
  toggleLight: (side) => {
    const sim = get().sim;
    if (!sim || sim.powerOut || get().screen !== "play") return;
    if (side === "left" && sim.leftDoor) return;
    if (side === "right" && sim.rightDoor) return;
    const next = {
      ...sim,
      leftLight: side === "left" ? !sim.leftLight : sim.leftLight,
      rightLight: side === "right" ? !sim.rightLight : sim.rightLight,
    };
    sfxLight(side === "left" ? next.leftLight : next.rightLight, side);
    set({ sim: next });
  },
  toggleCams: () => {
    const sim = get().sim;
    const screen = get().screen;
    if (!sim || sim.powerOut || screen !== "play") return;
    const up = !sim.camsUp;
    sfxCam(up);
    setAmbience(up ? "cams" : "office");
    set({
      sim: { ...sim, camsUp: up },
      staticAmt: up ? 0.55 : 0.12,
      screen: "play",
    });
  },
  setCam: (id) => {
    const sim = get().sim;
    if (!sim || !sim.camsUp) return;
    if (sim.cam === id) return;
    sfxStaticBurst();
    set({ sim: { ...sim, cam: id, camWatch: 0 }, staticAmt: 0.85 });
  },
  skipPhone: () => set({ phone: null }),
  addTrauma: (n) => set({ trauma: Math.min(1, get().trauma + n) }),
  pause: () => {
    const screen = get().screen;
    if (screen === "play" || screen === "powerout") {
      suspendAudio();
      set({ screen: "pause", prevPlay: screen });
    }
  },
  unpause: () => {
    if (get().screen === "pause") {
      resumeAudio();
      set({ screen: get().prevPlay });
    }
  },
  retry: () => {
    const n = get().sim?.night ?? loadSave().night;
    const ai = n === 7 ? get().customAI : undefined;
    get().startNight(n, ai);
  },
  nextNight: () => {
    const n = get().sim?.night ?? 1;
    if (n >= 5 && n !== 7) {
      writeSave({ night: 6, unlockedCustom: true, beaten: true });
      set({ unlockedCustom: true, beaten: true, screen: "victory" });
      return;
    }
    if (n === 6) {
      writeSave({ unlockedCustom: true, beaten: true, night: 6 });
      set({ unlockedCustom: true, beaten: true, screen: "victory" });
      return;
    }
    if (n === 7) {
      set({ screen: "custom" });
      return;
    }
    get().startNight(n + 1);
  },
  tick: (dt) => {
    const g = get();
    if (g.screen !== "pause") resumeAudio();
    let trauma = Math.max(0, g.trauma - dt * 1.6);
    let staticAmt = g.staticAmt + (0.08 - g.staticAmt) * (1 - Math.exp(-dt * 6));
    let hallucination = Math.max(0, g.hallucination - dt);
    let phoneI = g.phoneI;
    if (g.phone) phoneI = Math.min(g.phone.length, phoneI + dt * 42);

    const playing = g.screen === "play" || g.screen === "powerout";
    if (!playing || !g.sim) {
      set({ trauma, staticAmt, hallucination, phoneI });
      return;
    }

    const { state, events } = step(g.sim, dt);
    let screen: Screen = g.screen;
    let killer = g.killer;
    let phone = g.phone;

    for (const e of events) {
      if (e.type === "move") {
        if (e.watched) {
          staticAmt = 0.7;
          sfxStaticBurst();
        }
        const pan =
          e.to.includes("west") || e.to === "leftDoor"
            ? -0.55
            : e.to.includes("east") || e.to === "rightDoor"
              ? 0.55
              : 0;
        sfxFoot(pan, e.to.endsWith("Door"));
        if (e.to.endsWith("Door")) trauma = Math.min(1, trauma + 0.25);
      }
      if (e.type === "doorRefuse") {
        sfxBonk();
        trauma = Math.min(1, trauma + 0.2);
      }
      if (e.type === "dashRun") {
        sfxScare();
        trauma = Math.min(1, trauma + 0.35);
      }
      if (e.type === "dashBonk") {
        sfxBonk();
        trauma = Math.min(1, trauma + 0.4);
      }
      if (e.type === "camGlitch") {
        sfxStaticBurst();
        staticAmt = 1;
      }
      if (e.type === "hallucination") {
        hallucination = 0.55;
        sfxScare();
        trauma = Math.min(1, trauma + 0.45);
      }
      if (e.type === "footstep" && e.room === "kitchen" && !state.camsUp) {
        sfxFoot(0.4, false);
      }
      if (e.type === "powerout") {
        screen = "powerout";
        sfxPowerDown();
        startMusicBox();
        setAmbience("powerout");
        phone = null;
      }
      if (e.type === "jumpscare") {
        killer = e.id;
        screen = "jumpscare";
        stopMusicBox();
        sfxJumpscare();
        trauma = 1;
        phone = null;
      }
      if (e.type === "sixam") {
        screen = "sixam";
        stopMusicBox();
        sfxSixAm();
        sfxHour();
        phone = null;
      }
    }

    if (state.hour !== g.sim.hour && !events.some((e) => e.type === "sixam")) sfxHour();

    set({
      sim: state,
      screen,
      killer,
      trauma,
      staticAmt,
      hallucination,
      phone,
      phoneI,
    });
  },
}));

void NIGHT_AI;
