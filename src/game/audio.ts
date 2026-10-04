let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let music: GainNode | null = null;
let sfx: GainNode | null = null;
let muted = false;
let noise: AudioBuffer | null = null;
let fanStop: (() => void) | null = null;
let droneStop: (() => void) | null = null;
let boxStop: (() => void) | null = null;
let unlocked = false;

function ac() {
  if (!ctx) ctx = new AudioContext({ latencyHint: "interactive" });
  return ctx;
}

function bus() {
  const c = ac();
  if (!master) {
    master = c.createGain();
    music = c.createGain();
    sfx = c.createGain();
    music.gain.value = 0.22;
    sfx.gain.value = 0.7;
    master.gain.value = muted ? 0 : 0.9;
    music.connect(master);
    sfx.connect(master);
    master.connect(c.destination);
  }
  return { c, master: master!, music: music!, sfx: sfx! };
}

function noiseBuf() {
  const c = ac();
  if (noise) return noise;
  const len = c.sampleRate * 1.2;
  const b = c.createBuffer(1, len, c.sampleRate);
  const d = b.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  noise = b;
  return b;
}

function ramp(g: AudioParam, v: number, t = 0.03) {
  const c = ac();
  g.setTargetAtTime(v, c.currentTime, t);
}

export function setMuted(v: boolean) {
  muted = v;
  if (master) ramp(master.gain, v ? 0 : 0.9, 0.05);
}

export function isUnlocked() {
  return unlocked;
}

export async function unlockAudio() {
  const { c } = bus();
  if (c.state === "suspended") {
    void c.resume();
  }
  unlocked = true;
  if (!fanStop) startFan();
  if (!droneStop) startDrone();
}

export function resumeAudio() {
  if (ctx && ctx.state === "suspended") void ctx.resume();
}

export function suspendAudio() {
  if (ctx && ctx.state === "running") void ctx.suspend();
}

function playNoise(opts: {
  dur: number;
  gain: number;
  pan?: number;
  rate?: number;
  bp?: number;
  q?: number;
  dest?: GainNode;
}) {
  const { c, sfx: s } = bus();
  const src = c.createBufferSource();
  src.buffer = noiseBuf();
  src.playbackRate.value = opts.rate ?? 1;
  const g = c.createGain();
  g.gain.value = opts.gain;
  const dest = opts.dest ?? s;
  let node: AudioNode = src;
  if (opts.bp) {
    const f = c.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = opts.bp;
    f.Q.value = opts.q ?? 1.2;
    src.connect(f);
    node = f;
  }
  const p = c.createStereoPanner();
  p.pan.value = opts.pan ?? 0;
  node.connect(p);
  p.connect(g);
  g.connect(dest);
  const now = c.currentTime;
  g.gain.setValueAtTime(opts.gain, now);
  g.gain.exponentialRampToValueAtTime(0.0001, now + opts.dur);
  src.start(now);
  src.stop(now + opts.dur + 0.05);
}

function beep(freq: number, dur: number, gain: number, type: OscillatorType = "sine", pan = 0) {
  const { c, sfx: s } = bus();
  const o = c.createOscillator();
  o.type = type;
  o.frequency.value = freq;
  const g = c.createGain();
  const p = c.createStereoPanner();
  p.pan.value = pan;
  g.gain.value = gain;
  o.connect(g);
  g.connect(p);
  p.connect(s);
  const now = c.currentTime;
  g.gain.setValueAtTime(gain, now);
  g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  o.start(now);
  o.stop(now + dur + 0.02);
}

function startFan() {
  const { c, music: m } = bus();
  const src = c.createBufferSource();
  src.buffer = noiseBuf();
  src.loop = true;
  const f = c.createBiquadFilter();
  f.type = "bandpass";
  f.frequency.value = 220;
  f.Q.value = 0.7;
  const g = c.createGain();
  g.gain.value = 0.045;
  src.connect(f);
  f.connect(g);
  g.connect(m);
  src.start();
  const lfo = c.createOscillator();
  const lg = c.createGain();
  lfo.frequency.value = 0.18;
  lg.gain.value = 0.012;
  lfo.connect(lg);
  lg.connect(g.gain);
  lfo.start();
  fanStop = () => {
    try {
      src.stop();
      lfo.stop();
    } catch {
      /* already stopped */
    }
    fanStop = null;
  };
}

function startDrone() {
  const { c, music: m } = bus();
  const g = c.createGain();
  g.gain.value = 0.03;
  const o1 = c.createOscillator();
  const o2 = c.createOscillator();
  o1.type = "sine";
  o2.type = "sine";
  o1.frequency.value = 46;
  o2.frequency.value = 69.5;
  o1.connect(g);
  o2.connect(g);
  g.connect(m);
  o1.start();
  o2.start();
  droneStop = () => {
    try {
      o1.stop();
      o2.stop();
    } catch {
      /* already stopped */
    }
    droneStop = null;
  };
}

export function setAmbience(kind: "office" | "cams" | "powerout" | "menu") {
  if (!music) return;
  const { c } = bus();
  const v = kind === "menu" ? 0.12 : kind === "cams" ? 0.16 : kind === "powerout" ? 0.28 : 0.22;
  music.gain.setTargetAtTime(v, c.currentTime, 0.08);
}

export function sfxDoor(close: boolean, side: "left" | "right") {
  const pan = side === "left" ? -0.7 : 0.7;
  playNoise({
    dur: 0.22,
    gain: close ? 0.55 : 0.32,
    pan,
    bp: close ? 140 : 280,
    q: 1.4,
    rate: 0.8,
  });
  beep(close ? 90 : 140, 0.12, 0.2, "square", pan);
}

export function sfxLight(on: boolean, side: "left" | "right") {
  const pan = side === "left" ? -0.55 : 0.55;
  if (on) playNoise({ dur: 0.18, gain: 0.12, pan, bp: 1800, q: 0.6, rate: 1.4 });
  else beep(180, 0.05, 0.05, "sine", pan);
}

export function sfxCam(up: boolean) {
  playNoise({ dur: 0.28, gain: 0.22, bp: up ? 900 : 400, q: 0.8, rate: 1.1 });
  beep(up ? 420 : 260, 0.08, 0.08, "square");
}

export function sfxStaticBurst() {
  playNoise({ dur: 0.35, gain: 0.28, bp: 1400, q: 0.5, rate: 1.6 });
}

export function sfxFoot(pan: number, close = false) {
  playNoise({ dur: 0.16, gain: close ? 0.4 : 0.16, pan, bp: 90, q: 1.8, rate: 0.6 });
}

export function sfxBonk() {
  beep(70, 0.18, 0.4, "square");
  playNoise({ dur: 0.3, gain: 0.3, bp: 180, q: 2, rate: 0.5 });
}

export function sfxScare() {
  playNoise({ dur: 0.4, gain: 0.35, bp: 600, q: 0.7, rate: 0.9 });
  beep(180, 0.2, 0.15, "sawtooth");
}

export function sfxHour() {
  beep(880, 0.08, 0.12, "sine");
}

export function sfxSixAm() {
  const { c, sfx: s } = bus();
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((f, i) => {
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "sine";
    o.frequency.value = f;
    const t = c.currentTime + i * 0.22;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    o.connect(g);
    g.connect(s);
    o.start(t);
    o.stop(t + 0.55);
  });
}

export function sfxPowerDown() {
  const { c, sfx: s } = bus();
  const o = c.createOscillator();
  o.type = "sawtooth";
  const g = c.createGain();
  o.connect(g);
  g.connect(s);
  const t = c.currentTime;
  o.frequency.setValueAtTime(240, t);
  o.frequency.exponentialRampToValueAtTime(40, t + 1.4);
  g.gain.setValueAtTime(0.2, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 1.5);
  o.start(t);
  o.stop(t + 1.55);
  playNoise({ dur: 1.2, gain: 0.2, bp: 200, q: 0.6, rate: 0.7 });
}

export function sfxJumpscare() {
  playNoise({ dur: 0.9, gain: 0.7, bp: 900, q: 0.4, rate: 0.85 });
  playNoise({ dur: 0.7, gain: 0.45, bp: 2200, q: 0.7, rate: 1.8 });
  const { c, sfx: s } = bus();
  const o = c.createOscillator();
  o.type = "sawtooth";
  const g = c.createGain();
  o.connect(g);
  g.connect(s);
  const t = c.currentTime;
  o.frequency.setValueAtTime(420, t);
  o.frequency.exponentialRampToValueAtTime(70, t + 0.7);
  g.gain.setValueAtTime(0.28, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.75);
  o.start(t);
  o.stop(t + 0.8);
}

export function startMusicBox() {
  stopMusicBox();
  const { c, music: m } = bus();
  const notes = [523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25, 392];
  let alive = true;
  const playRound = (at: number) => {
    if (!alive || !ctx) return;
    notes.forEach((f, i) => {
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = "triangle";
      o.frequency.value = f;
      const t = at + i * 0.42;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.07, t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.38);
      o.connect(g);
      g.connect(m);
      o.start(t);
      o.stop(t + 0.4);
    });
    const id = window.setTimeout(() => playRound(c.currentTime + 0.05), 3600);
    boxStop = () => {
      alive = false;
      clearTimeout(id);
      boxStop = null;
    };
  };
  playRound(c.currentTime);
}

export function stopMusicBox() {
  boxStop?.();
}

export function sfxUi() {
  beep(640, 0.04, 0.05, "square");
}

export function sfxPhone() {
  beep(920, 0.09, 0.1, "sine");
  setTimeout(() => beep(920, 0.09, 0.08, "sine"), 180);
}
