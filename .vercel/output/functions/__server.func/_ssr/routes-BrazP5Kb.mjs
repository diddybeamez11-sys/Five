import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PanelLeftClose, i as PanelRightClose, n as Volume2, o as Lightbulb, s as Camera, t as VolumeX } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BrazP5Kb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ART = {
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
		kitchen: "/art/cam-kitchen.jpg"
	}
};
var PRELOAD = [
	ART.office,
	ART.portrait,
	ART.lurk,
	ART.door,
	ART.jumpscare,
	ART.faces,
	...Object.values(ART.rooms)
];
var CAMS = [
	{
		id: "1A",
		room: "stage",
		label: "Show Stage",
		x: 36,
		y: 3,
		w: 28,
		h: 14
	},
	{
		id: "1B",
		room: "lounge",
		label: "Lounge",
		x: 32,
		y: 19,
		w: 36,
		h: 16
	},
	{
		id: "1C",
		room: "cove",
		label: "Curtain Nook",
		x: 70,
		y: 19,
		w: 22,
		h: 14
	},
	{
		id: "5",
		room: "backstage",
		label: "Backstage",
		x: 8,
		y: 19,
		w: 22,
		h: 14
	},
	{
		id: "2A",
		room: "westHall",
		label: "West Hall",
		x: 10,
		y: 38,
		w: 24,
		h: 14
	},
	{
		id: "2B",
		room: "westCorner",
		label: "West Corner",
		x: 10,
		y: 54,
		w: 24,
		h: 14
	},
	{
		id: "3",
		room: "closet",
		label: "Supply",
		x: 10,
		y: 70,
		w: 20,
		h: 12
	},
	{
		id: "4A",
		room: "eastHall",
		label: "East Hall",
		x: 66,
		y: 38,
		w: 24,
		h: 14
	},
	{
		id: "4B",
		room: "eastCorner",
		label: "East Corner",
		x: 66,
		y: 54,
		w: 24,
		h: 14
	},
	{
		id: "6",
		room: "kitchen",
		label: "Kitchen",
		x: 70,
		y: 70,
		w: 22,
		h: 12
	}
];
var ROOM_TO_CAM = Object.fromEntries(CAMS.map((c) => [c.room, c.id]));
var NIGHT_AI = {
	1: {
		diddy: 2,
		puff: 2,
		dash: 0,
		static: 0
	},
	2: {
		diddy: 3,
		puff: 4,
		dash: 1,
		static: 1
	},
	3: {
		diddy: 5,
		puff: 6,
		dash: 4,
		static: 2
	},
	4: {
		diddy: 8,
		puff: 9,
		dash: 6,
		static: 5
	},
	5: {
		diddy: 12,
		puff: 13,
		dash: 10,
		static: 8
	},
	6: {
		diddy: 16,
		puff: 16,
		dash: 14,
		static: 12
	}
};
var ANIM_META = {
	diddy: {
		name: "Diddy",
		interval: 4.97,
		attack: "left"
	},
	puff: {
		name: "Puff",
		interval: 4.93,
		attack: "right"
	},
	dash: {
		name: "Dash",
		interval: 5.11,
		attack: "right"
	},
	static: {
		name: "Static",
		interval: 6.07,
		attack: "any"
	}
};
var PATHS = {
	diddy: {
		stage: ["lounge"],
		lounge: [
			"westHall",
			"backstage",
			"closet"
		],
		westHall: [
			"westCorner",
			"lounge",
			"closet"
		],
		westCorner: ["leftDoor", "westHall"],
		closet: ["westHall"],
		backstage: ["lounge"],
		leftDoor: ["westCorner"]
	},
	puff: {
		stage: ["lounge"],
		lounge: ["eastHall", "kitchen"],
		eastHall: [
			"eastCorner",
			"lounge",
			"kitchen"
		],
		eastCorner: ["rightDoor", "eastHall"],
		kitchen: ["eastHall"],
		rightDoor: ["eastCorner"]
	},
	dash: {
		cove: ["eastHall"],
		eastHall: ["eastCorner"],
		eastCorner: ["rightDoor"],
		rightDoor: ["cove"]
	},
	static: {
		backstage: [
			"lounge",
			"closet",
			"kitchen",
			"stage"
		],
		stage: ["lounge", "backstage"],
		lounge: [
			"westHall",
			"eastHall",
			"backstage",
			"kitchen"
		],
		westHall: [
			"westCorner",
			"closet",
			"lounge"
		],
		westCorner: ["westHall"],
		closet: ["westHall", "backstage"],
		eastHall: [
			"eastCorner",
			"kitchen",
			"lounge"
		],
		eastCorner: ["eastHall"],
		kitchen: ["eastHall", "lounge"]
	}
};
var START_ROOMS = {
	diddy: "stage",
	puff: "stage",
	dash: "cove",
	static: "backstage"
};
var PHONE = {
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

Don't blink. *click*`
};
var HOURS = [
	"12 AM",
	"1 AM",
	"2 AM",
	"3 AM",
	"4 AM",
	"5 AM",
	"6 AM"
];
function hourLabel(hour) {
	return HOURS[Math.max(0, Math.min(6, hour))] ?? "12 AM";
}
function usageOf(s) {
	return 1 + (s.leftDoor ? 1 : 0) + (s.rightDoor ? 1 : 0) + (s.leftLight || s.rightLight ? 1 : 0) + (s.camsUp ? 1 : 0);
}
function drainRate(night, usage) {
	return .072 + night * .01 + Math.max(0, usage - 1) * .11;
}
function roll() {
	return 1 + Math.floor(Math.random() * 20);
}
function pick(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}
function cloneAnims(anims) {
	return {
		diddy: { ...anims.diddy },
		puff: { ...anims.puff },
		dash: { ...anims.dash },
		static: { ...anims.static }
	};
}
function createSim(night, ai) {
	const levels = ai ?? NIGHT_AI[night] ?? NIGHT_AI[5];
	const mk = (id) => ({
		id,
		room: START_ROOMS[id],
		cooldown: Math.random() * 1.5,
		dashStage: 0,
		running: false,
		runT: 0,
		inOffice: false
	});
	return {
		night,
		hour: 0,
		elapsed: 0,
		nightLength: 240,
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
			static: mk("static")
		},
		camDisabled: {},
		camWatch: 0,
		hallT: 0,
		powerOutT: 0,
		powerOutKill: 10 + Math.random() * 10,
		inOfficeWait: 0,
		dead: false,
		won: false,
		powerOut: false
	};
}
function watching(s, room) {
	if (!s.camsUp) return false;
	return ROOM_TO_CAM[room] === s.cam && !s.camDisabled[s.cam];
}
function aiNow(s, id) {
	let n = s.ai[id];
	if (s.hour >= 3) n += 1;
	if (s.hour >= 4) n += 1;
	return Math.min(20, n);
}
function tryKill(s, events, id) {
	if (s.dead || s.won) return;
	s.dead = true;
	events.push({
		type: "jumpscare",
		id
	});
}
function moveWalker(s, events, id) {
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
			events.push({
				type: "doorRefuse",
				side: "left"
			});
			next = "westHall";
		}
	}
	if (next === "rightDoor") {
		if (s.rightDoor) {
			events.push({
				type: "doorRefuse",
				side: "right"
			});
			next = "eastHall";
		}
	}
	if (a.room === "leftDoor" && s.leftDoor) {
		next = "westHall";
		events.push({
			type: "doorRefuse",
			side: "left"
		});
	}
	if (a.room === "rightDoor" && s.rightDoor) {
		next = "eastHall";
		events.push({
			type: "doorRefuse",
			side: "right"
		});
	}
	const from = a.room;
	if (from === next) return;
	const seen = watching(s, from) || watching(s, next);
	a.room = next;
	events.push({
		type: "move",
		id,
		from,
		to: next,
		watched: seen
	});
	events.push({
		type: "footstep",
		room: next
	});
	if (next === "leftDoor" && !s.leftDoor) {}
	if (id === "static" && seen && s.camsUp) events.push({
		type: "camGlitch",
		cam: s.cam
	});
}
function stepDash(s, dt, events) {
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
		if (a.room === "cove" && a.runT > .4) a.room = "eastHall";
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
			} else tryKill(s, events, "dash");
		}
		return;
	}
	a.cooldown += dt;
	if (watching(s, "cove")) {
		a.cooldown = Math.min(a.cooldown, ANIM_META.dash.interval * .4);
		if (a.dashStage > 0 && Math.random() < dt * .25) a.dashStage -= 1;
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
function occupyOffice(s, events, dt) {
	for (const id of [
		"diddy",
		"puff",
		"static"
	]) {
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
	const insider = [
		"diddy",
		"puff",
		"static",
		"dash"
	].find((id) => s.anims[id].inOffice);
	if (!insider) {
		s.inOfficeWait = 0;
		return;
	}
	s.inOfficeWait += dt;
	if (!s.camsUp || s.inOfficeWait > 5) tryKill(s, events, insider);
}
function occupants(s, room) {
	return Object.keys(s.anims).filter((id) => s.anims[id].room === room);
}
function step(prev, dt) {
	const s = {
		...prev,
		ai: { ...prev.ai },
		camDisabled: { ...prev.camDisabled },
		anims: cloneAnims(prev.anims)
	};
	const events = [];
	const t = Math.min(dt, .1);
	if (s.dead || s.won) return {
		state: s,
		events
	};
	s.elapsed += t;
	const hourLen = s.nightLength / 6;
	const nextHour = Math.min(6, Math.floor(s.elapsed / hourLen));
	if (nextHour !== s.hour) {
		s.hour = nextHour;
		if (s.hour >= 6) {
			s.won = true;
			s.hour = 6;
			events.push({ type: "sixam" });
			return {
				state: s,
				events
			};
		}
	}
	if (s.powerOut) {
		s.leftDoor = false;
		s.rightDoor = false;
		s.leftLight = false;
		s.rightLight = false;
		s.camsUp = false;
		s.powerOutT += t;
		if (s.powerOutT >= s.powerOutKill) tryKill(s, events, "diddy");
		return {
			state: s,
			events
		};
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
		return {
			state: s,
			events
		};
	}
	if (s.camsUp) s.camWatch += t;
	else s.camWatch = 0;
	for (const cam of Object.keys(s.camDisabled)) {
		const left = (s.camDisabled[cam] ?? 0) - t;
		if (left <= 0) delete s.camDisabled[cam];
		else s.camDisabled[cam] = left;
	}
	if (s.anims.static.room && watching(s, s.anims.static.room) && s.camWatch > 5.5) {
		s.camDisabled[s.cam] = 8 + Math.random() * 4;
		events.push({
			type: "camGlitch",
			cam: s.cam
		});
		s.camWatch = 0;
	}
	s.hallT -= t;
	if (s.hallT <= 0 && aiNow(s, "static") > 4 && !s.camsUp && Math.random() < t * .04) {
		s.hallT = 12;
		events.push({ type: "hallucination" });
	}
	for (const id of [
		"diddy",
		"puff",
		"static"
	]) {
		const a = s.anims[id];
		a.cooldown += t;
		if (a.cooldown >= ANIM_META[id].interval) {
			a.cooldown -= ANIM_META[id].interval;
			moveWalker(s, events, id);
		}
	}
	stepDash(s, t, events);
	occupyOffice(s, events, t);
	return {
		state: s,
		events
	};
}
var ctx = null;
var master = null;
var music = null;
var sfx = null;
var muted = false;
var noise = null;
var fanStop = null;
var droneStop = null;
var boxStop = null;
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
		music.gain.value = .22;
		sfx.gain.value = .7;
		master.gain.value = muted ? 0 : .9;
		music.connect(master);
		sfx.connect(master);
		master.connect(c.destination);
	}
	return {
		c,
		master,
		music,
		sfx
	};
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
function ramp(g, v, t = .03) {
	const c = ac();
	g.setTargetAtTime(v, c.currentTime, t);
}
function setMuted(v) {
	muted = v;
	if (master) ramp(master.gain, v ? 0 : .9, .05);
}
async function unlockAudio() {
	const { c } = bus();
	if (c.state === "suspended") c.resume();
	if (!fanStop) startFan();
	if (!droneStop) startDrone();
}
function resumeAudio() {
	if (ctx && ctx.state === "suspended") ctx.resume();
}
function playNoise(opts) {
	const { c, sfx: s } = bus();
	const src = c.createBufferSource();
	src.buffer = noiseBuf();
	src.playbackRate.value = opts.rate ?? 1;
	const g = c.createGain();
	g.gain.value = opts.gain;
	const dest = opts.dest ?? s;
	let node = src;
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
	g.gain.exponentialRampToValueAtTime(1e-4, now + opts.dur);
	src.start(now);
	src.stop(now + opts.dur + .05);
}
function beep(freq, dur, gain, type = "sine", pan = 0) {
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
	g.gain.exponentialRampToValueAtTime(1e-4, now + dur);
	o.start(now);
	o.stop(now + dur + .02);
}
function startFan() {
	const { c, music: m } = bus();
	const src = c.createBufferSource();
	src.buffer = noiseBuf();
	src.loop = true;
	const f = c.createBiquadFilter();
	f.type = "bandpass";
	f.frequency.value = 220;
	f.Q.value = .7;
	const g = c.createGain();
	g.gain.value = .045;
	src.connect(f);
	f.connect(g);
	g.connect(m);
	src.start();
	const lfo = c.createOscillator();
	const lg = c.createGain();
	lfo.frequency.value = .18;
	lg.gain.value = .012;
	lfo.connect(lg);
	lg.connect(g.gain);
	lfo.start();
	fanStop = () => {
		try {
			src.stop();
			lfo.stop();
		} catch {}
		fanStop = null;
	};
}
function startDrone() {
	const { c, music: m } = bus();
	const g = c.createGain();
	g.gain.value = .03;
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
		} catch {}
		droneStop = null;
	};
}
function setAmbience(kind) {
	if (!music) return;
	const { c } = bus();
	const v = kind === "menu" ? .12 : kind === "cams" ? .16 : kind === "powerout" ? .28 : .22;
	music.gain.setTargetAtTime(v, c.currentTime, .08);
}
function sfxDoor(close, side) {
	const pan = side === "left" ? -.7 : .7;
	playNoise({
		dur: .22,
		gain: close ? .55 : .32,
		pan,
		bp: close ? 140 : 280,
		q: 1.4,
		rate: .8
	});
	beep(close ? 90 : 140, .12, .2, "square", pan);
}
function sfxLight(on, side) {
	const pan = side === "left" ? -.55 : .55;
	if (on) playNoise({
		dur: .18,
		gain: .12,
		pan,
		bp: 1800,
		q: .6,
		rate: 1.4
	});
	else beep(180, .05, .05, "sine", pan);
}
function sfxCam(up) {
	playNoise({
		dur: .28,
		gain: .22,
		bp: up ? 900 : 400,
		q: .8,
		rate: 1.1
	});
	beep(up ? 420 : 260, .08, .08, "square");
}
function sfxStaticBurst() {
	playNoise({
		dur: .35,
		gain: .28,
		bp: 1400,
		q: .5,
		rate: 1.6
	});
}
function sfxFoot(pan, close = false) {
	playNoise({
		dur: .16,
		gain: close ? .4 : .16,
		pan,
		bp: 90,
		q: 1.8,
		rate: .6
	});
}
function sfxBonk() {
	beep(70, .18, .4, "square");
	playNoise({
		dur: .3,
		gain: .3,
		bp: 180,
		q: 2,
		rate: .5
	});
}
function sfxScare() {
	playNoise({
		dur: .4,
		gain: .35,
		bp: 600,
		q: .7,
		rate: .9
	});
	beep(180, .2, .15, "sawtooth");
}
function sfxHour() {
	beep(880, .08, .12, "sine");
}
function sfxSixAm() {
	const { c, sfx: s } = bus();
	[
		523.25,
		659.25,
		783.99,
		1046.5
	].forEach((f, i) => {
		const o = c.createOscillator();
		const g = c.createGain();
		o.type = "sine";
		o.frequency.value = f;
		const t = c.currentTime + i * .22;
		g.gain.setValueAtTime(1e-4, t);
		g.gain.exponentialRampToValueAtTime(.18, t + .02);
		g.gain.exponentialRampToValueAtTime(1e-4, t + .5);
		o.connect(g);
		g.connect(s);
		o.start(t);
		o.stop(t + .55);
	});
}
function sfxPowerDown() {
	const { c, sfx: s } = bus();
	const o = c.createOscillator();
	o.type = "sawtooth";
	const g = c.createGain();
	o.connect(g);
	g.connect(s);
	const t = c.currentTime;
	o.frequency.setValueAtTime(240, t);
	o.frequency.exponentialRampToValueAtTime(40, t + 1.4);
	g.gain.setValueAtTime(.2, t);
	g.gain.exponentialRampToValueAtTime(1e-4, t + 1.5);
	o.start(t);
	o.stop(t + 1.55);
	playNoise({
		dur: 1.2,
		gain: .2,
		bp: 200,
		q: .6,
		rate: .7
	});
}
function sfxJumpscare() {
	playNoise({
		dur: .9,
		gain: .7,
		bp: 900,
		q: .4,
		rate: .85
	});
	playNoise({
		dur: .7,
		gain: .45,
		bp: 2200,
		q: .7,
		rate: 1.8
	});
	const { c, sfx: s } = bus();
	const o = c.createOscillator();
	o.type = "sawtooth";
	const g = c.createGain();
	o.connect(g);
	g.connect(s);
	const t = c.currentTime;
	o.frequency.setValueAtTime(420, t);
	o.frequency.exponentialRampToValueAtTime(70, t + .7);
	g.gain.setValueAtTime(.28, t);
	g.gain.exponentialRampToValueAtTime(1e-4, t + .75);
	o.start(t);
	o.stop(t + .8);
}
function startMusicBox() {
	stopMusicBox();
	const { c, music: m } = bus();
	const notes = [
		523.25,
		587.33,
		659.25,
		783.99,
		659.25,
		587.33,
		523.25,
		392
	];
	let alive = true;
	const playRound = (at) => {
		if (!alive || !ctx) return;
		notes.forEach((f, i) => {
			const o = c.createOscillator();
			const g = c.createGain();
			o.type = "triangle";
			o.frequency.value = f;
			const t = at + i * .42;
			g.gain.setValueAtTime(1e-4, t);
			g.gain.exponentialRampToValueAtTime(.07, t + .03);
			g.gain.exponentialRampToValueAtTime(1e-4, t + .38);
			o.connect(g);
			g.connect(m);
			o.start(t);
			o.stop(t + .4);
		});
		const id = window.setTimeout(() => playRound(c.currentTime + .05), 3600);
		boxStop = () => {
			alive = false;
			clearTimeout(id);
			boxStop = null;
		};
	};
	playRound(c.currentTime);
}
function stopMusicBox() {
	boxStop?.();
}
function sfxUi() {
	beep(640, .04, .05, "square");
}
function sfxPhone() {
	beep(920, .09, .1, "sine");
	setTimeout(() => beep(920, .09, .08, "sine"), 180);
}
var KEY = "fnad.save.v1";
var VERSION = 1;
var defaults = {
	version: VERSION,
	night: 1,
	unlockedCustom: false,
	beaten: false,
	muted: false,
	shake: true
};
function migrate(raw) {
	return {
		...defaults,
		...raw,
		version: VERSION
	};
}
function loadSave() {
	try {
		const t = localStorage.getItem(KEY);
		if (!t) return { ...defaults };
		return migrate(JSON.parse(t));
	} catch {
		return { ...defaults };
	}
}
function writeSave(patch) {
	try {
		const next = {
			...loadSave(),
			...patch,
			version: VERSION
		};
		localStorage.setItem(KEY, JSON.stringify(next));
		return next;
	} catch {
		return {
			...defaults,
			...patch
		};
	}
}
var save0 = loadSave();
var useGame = create((set, get) => ({
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
	staticAmt: .08,
	phone: null,
	phoneI: 0,
	killer: null,
	hallucination: 0,
	loadPct: 0,
	customAI: {
		diddy: 10,
		puff: 10,
		dash: 10,
		static: 10
	},
	boot: () => {
		setMuted(get().muted);
		set({ screen: "menu" });
		setAmbience("menu");
	},
	setLoad: (n) => set({ loadPct: n }),
	newGame: () => {
		unlockAudio();
		sfxUi();
		writeSave({ night: 1 });
		set({
			saveNight: 1,
			screen: "newspaper"
		});
	},
	resume: () => {
		unlockAudio();
		sfxUi();
		const s = loadSave();
		get().startNight(Math.max(1, s.night));
	},
	startNight: (night, ai) => {
		unlockAudio();
		stopMusicBox();
		const sim = createSim(night, ai);
		writeSave({ night });
		set({
			sim,
			saveNight: night,
			screen: "intro",
			lookSide: "center",
			trauma: 0,
			staticAmt: .08,
			killer: null,
			hallucination: 0,
			phone: null,
			phoneI: 0
		});
	},
	beginPlay: () => {
		const script = PHONE[get().sim?.night ?? 1] ?? null;
		set({
			screen: "play",
			phone: script,
			phoneI: 0
		});
		if (script) sfxPhone();
		setAmbience("office");
	},
	toMenu: () => {
		stopMusicBox();
		setAmbience("menu");
		set({
			screen: "menu",
			sim: null,
			phone: null
		});
	},
	toCustom: () => {
		sfxUi();
		set({ screen: "custom" });
	},
	setCustom: (id, v) => set((s) => ({ customAI: {
		...s.customAI,
		[id]: Math.max(0, Math.min(20, v))
	} })),
	startCustom: () => {
		get().startNight(7, get().customAI);
	},
	toggleMute: () => {
		const v = !get().muted;
		setMuted(v);
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
			rightDoor: side === "right" ? !sim.rightDoor : sim.rightDoor
		};
		if (side === "left" && next.leftDoor) next.leftLight = false;
		if (side === "right" && next.rightDoor) next.rightLight = false;
		sfxDoor(side === "left" ? next.leftDoor : next.rightDoor, side);
		set({
			sim: next,
			trauma: Math.min(1, get().trauma + .12)
		});
	},
	toggleLight: (side) => {
		const sim = get().sim;
		if (!sim || sim.powerOut || get().screen !== "play") return;
		if (side === "left" && sim.leftDoor) return;
		if (side === "right" && sim.rightDoor) return;
		const next = {
			...sim,
			leftLight: side === "left" ? !sim.leftLight : sim.leftLight,
			rightLight: side === "right" ? !sim.rightLight : sim.rightLight
		};
		sfxLight(side === "left" ? next.leftLight : next.rightLight, side);
		set({ sim: next });
	},
	toggleCams: () => {
		const sim = get().sim;
		const screen = get().screen;
		if (!sim || sim.powerOut || screen !== "play" && screen !== "pause") return;
		const up = !sim.camsUp;
		sfxCam(up);
		setAmbience(up ? "cams" : "office");
		set({
			sim: {
				...sim,
				camsUp: up
			},
			staticAmt: up ? .55 : .12,
			screen: "play"
		});
	},
	setCam: (id) => {
		const sim = get().sim;
		if (!sim || !sim.camsUp) return;
		if (sim.cam === id) return;
		sfxStaticBurst();
		set({
			sim: {
				...sim,
				cam: id,
				camWatch: 0
			},
			staticAmt: .85
		});
	},
	skipPhone: () => set({ phone: null }),
	addTrauma: (n) => set({ trauma: Math.min(1, get().trauma + n) }),
	pause: () => {
		if (get().screen === "play") set({
			screen: "pause",
			prevPlay: "play"
		});
	},
	unpause: () => {
		if (get().screen === "pause") set({ screen: "play" });
	},
	retry: () => {
		const n = get().sim?.night ?? loadSave().night;
		const ai = n === 7 ? get().customAI : void 0;
		get().startNight(n, ai);
	},
	nextNight: () => {
		const n = get().sim?.night ?? 1;
		if (n >= 5 && n !== 7) {
			writeSave({
				night: 6,
				unlockedCustom: true,
				beaten: true
			});
			set({
				unlockedCustom: true,
				beaten: true,
				screen: "victory"
			});
			return;
		}
		if (n === 6) {
			writeSave({
				unlockedCustom: true,
				beaten: true,
				night: 6
			});
			set({
				unlockedCustom: true,
				beaten: true,
				screen: "victory"
			});
			return;
		}
		if (n === 7) {
			set({ screen: "custom" });
			return;
		}
		get().startNight(n + 1);
	},
	tick: (dt) => {
		resumeAudio();
		const g = get();
		let trauma = Math.max(0, g.trauma - dt * 1.6);
		let staticAmt = g.staticAmt + (.08 - g.staticAmt) * (1 - Math.exp(-dt * 6));
		let hallucination = Math.max(0, g.hallucination - dt);
		let phoneI = g.phoneI;
		if (g.phone) phoneI = Math.min(g.phone.length, phoneI + dt * 42);
		if (!(g.screen === "play" || g.screen === "powerout") || !g.sim) {
			set({
				trauma,
				staticAmt,
				hallucination,
				phoneI
			});
			return;
		}
		const { state, events } = step(g.sim, dt);
		let screen = g.screen;
		let killer = g.killer;
		let phone = g.phone;
		for (const e of events) {
			if (e.type === "move") {
				if (e.watched) {
					staticAmt = .7;
					sfxStaticBurst();
				}
				sfxFoot(e.to.includes("west") || e.to === "leftDoor" ? -.55 : e.to.includes("east") || e.to === "rightDoor" ? .55 : 0, e.to.endsWith("Door"));
				if (e.to.endsWith("Door")) trauma = Math.min(1, trauma + .25);
			}
			if (e.type === "doorRefuse") {
				sfxBonk();
				trauma = Math.min(1, trauma + .2);
			}
			if (e.type === "dashRun") {
				sfxScare();
				trauma = Math.min(1, trauma + .35);
			}
			if (e.type === "dashBonk") {
				sfxBonk();
				trauma = Math.min(1, trauma + .4);
			}
			if (e.type === "camGlitch") {
				sfxStaticBurst();
				staticAmt = 1;
			}
			if (e.type === "hallucination") {
				hallucination = .55;
				sfxScare();
				trauma = Math.min(1, trauma + .45);
			}
			if (e.type === "footstep" && e.room === "kitchen" && !state.camsUp) sfxFoot(.4, false);
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
			phoneI
		});
	}
}));
function StaticNoise({ amount }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const c = ref.current;
		if (!c) return;
		const ctx = c.getContext("2d", { alpha: true });
		if (!ctx) return;
		let raf = 0;
		const w = 160;
		const h = 90;
		c.width = w;
		c.height = h;
		const tick = () => {
			const a = amount;
			if (a > .04) {
				const img = ctx.createImageData(w, h);
				const d = img.data;
				for (let i = 0; i < d.length; i += 4) {
					const v = Math.random() * 255;
					d[i] = d[i + 1] = d[i + 2] = v;
					d[i + 3] = Math.min(255, a * 220);
				}
				ctx.putImageData(img, 0, 0);
			} else ctx.clearRect(0, 0, w, h);
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [amount]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		className: "pointer-events-none absolute inset-0 z-30 h-full w-full opacity-70 mix-blend-overlay"
	});
}
function DoorPlate({ side, door, light }) {
	const toggleDoor = useGame((s) => s.toggleDoor);
	const toggleLight = useGame((s) => s.toggleLight);
	const Icon = side === "left" ? PanelLeftClose : PanelRightClose;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex flex-col gap-2 ${side === "right" ? "items-end" : "items-start"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "plate-btn w-14",
			"data-on": light ? "true" : "false",
			"aria-pressed": light,
			"aria-label": `${side} light`,
			onClick: () => toggleLight(side),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "size-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "plate-btn w-14",
			"data-on": door ? "true" : "false",
			"data-door": "true",
			"aria-pressed": door,
			"aria-label": `${side} door`,
			onClick: () => toggleDoor(side),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
		})]
	});
}
function Figure({ id, peek }) {
	const src = id === "dash" ? ART.lurk : ART.door;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: "",
		className: "door-figure",
		style: {
			transform: `translateY(${(1 - (peek ?? 1)) * 28}%) scale(${.9 + (peek ?? 1) * .1})`,
			opacity: .35 + (peek ?? 1) * .65
		}
	});
}
function PlayView() {
	const sim = useGame((s) => s.sim);
	const lookSide = useGame((s) => s.lookSide);
	const setLook = useGame((s) => s.setLook);
	const toggleCams = useGame((s) => s.toggleCams);
	const setCam = useGame((s) => s.setCam);
	const skipPhone = useGame((s) => s.skipPhone);
	const phone = useGame((s) => s.phone);
	const phoneI = useGame((s) => s.phoneI);
	const staticAmt = useGame((s) => s.staticAmt);
	const hallucination = useGame((s) => s.hallucination);
	const screen = useGame((s) => s.screen);
	const trauma = useGame((s) => s.trauma);
	const shakeOn = useGame((s) => s.shake);
	const panRef = (0, import_react.useRef)(null);
	const pan = (0, import_react.useRef)(.5);
	const target = (0, import_react.useRef)(.5);
	const [held, setHeld] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		const down = (e) => {
			const k = e.key.toLowerCase();
			setHeld((h) => ({
				...h,
				[k]: true
			}));
			if (k === " " || k === "c") {
				e.preventDefault();
				toggleCams();
			}
			if (k === "q") useGame.getState().toggleDoor("left");
			if (k === "w") useGame.getState().toggleLight("left");
			if (k === "o") useGame.getState().toggleLight("right");
			if (k === "p") useGame.getState().toggleDoor("right");
			if (k === "escape") {
				const st = useGame.getState();
				if (st.screen === "play") st.pause();
				else if (st.screen === "pause") st.unpause();
			}
			if (k >= "1" && k <= "9") {
				const cam = CAMS[Number(k) - 1];
				if (cam) setCam(cam.id);
			}
		};
		const up = (e) => {
			setHeld((h) => ({
				...h,
				[e.key.toLowerCase()]: false
			}));
		};
		window.addEventListener("keydown", down);
		window.addEventListener("keyup", up);
		return () => {
			window.removeEventListener("keydown", down);
			window.removeEventListener("keyup", up);
		};
	}, [setCam, toggleCams]);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		let last = performance.now();
		const loop = (now) => {
			const dt = Math.min(.05, (now - last) / 1e3);
			last = now;
			if (held["a"] || held["arrowleft"]) target.current = Math.max(0, target.current - dt * 1.5);
			if (held["d"] || held["arrowright"]) target.current = Math.min(1, target.current + dt * 1.5);
			pan.current += (target.current - pan.current) * (1 - Math.exp(-12 * dt));
			const el = panRef.current;
			if (el) {
				const x = pan.current * 32;
				el.style.transform = `translateX(-${x}%)`;
			}
			const side = pan.current < .32 ? "left" : pan.current > .68 ? "right" : "center";
			if (useGame.getState().lookSide !== side) setLook(side);
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [held, setLook]);
	if (!sim) return null;
	const powerOut = screen === "powerout" || sim.powerOut;
	const cams = sim.camsUp && !powerOut;
	const usage = usageOf(sim);
	const camMeta = CAMS.find((c) => c.id === sim.cam);
	const camDead = Boolean(sim.camDisabled[sim.cam]);
	const leftHere = occupants(sim, "leftDoor");
	const rightHere = occupants(sim, "rightDoor");
	const camRoom = camMeta.room;
	const camHere = occupants(sim, camRoom);
	const dashPeek = sim.anims.dash.dashStage / 4;
	const shake = shakeOn ? trauma * trauma : 0;
	const ox = shake ? (Math.random() * 2 - 1) * shake * 18 : 0;
	const oy = shake ? (Math.random() * 2 - 1) * shake * 12 : 0;
	const onPointer = (e) => {
		if (cams) return;
		const r = e.currentTarget.getBoundingClientRect();
		const x = (e.clientX - r.left) / r.width;
		if (x < .22) target.current = Math.max(0, target.current - .04);
		else if (x > .78) target.current = Math.min(1, target.current + .04);
		else target.current = x;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 overflow-hidden bg-void",
		style: { transform: `translate(${ox}px, ${oy}px)` },
		onPointerMove: onPointer,
		onPointerDown: onPointer,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: panRef,
				className: "office-pan",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: ART.office,
						alt: "",
						className: "office-bg",
						draggable: false
					}),
					powerOut && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-void/92" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "doorway doorway-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "metal-door",
								style: { transform: sim.leftDoor ? "scaleX(1)" : "scaleX(0)" }
							}),
							sim.leftLight && !sim.leftDoor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "light-cone" }),
							sim.leftLight && !sim.leftDoor && leftHere[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, { id: leftHere[0] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "doorway doorway-right",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "metal-door",
								style: { transform: sim.rightDoor ? "scaleX(1)" : "scaleX(0)" }
							}),
							sim.rightLight && !sim.rightDoor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "light-cone" }),
							sim.rightLight && !sim.rightDoor && rightHere[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, { id: rightHere[0] })
						]
					}),
					!powerOut && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "frame-buttons frame-buttons-left",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DoorPlate, {
							side: "left",
							door: sim.leftDoor,
							light: sim.leftLight
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "frame-buttons frame-buttons-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DoorPlate, {
							side: "right",
							door: sim.rightDoor,
							light: sim.rightLight
						})
					})] })
				]
			}),
			hallucination > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: ART.portrait,
				alt: "",
				className: "pointer-events-none absolute inset-y-0 left-1/2 z-20 w-[min(70%,420px)] -translate-x-1/2 object-contain mix-blend-lighten",
				style: { opacity: hallucination }
			}),
			powerOut && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: ART.portrait,
				alt: "",
				className: "pointer-events-none absolute bottom-0 left-1/2 z-20 w-[min(80%,520px)] -translate-x-1/2 object-contain mix-blend-lighten",
				style: { opacity: Math.min(.85, sim.powerOutT / 8) }
			}),
			cams && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 z-30 flex flex-col bg-void/80 md:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-h-0 flex-1 overflow-hidden",
					children: [
						camDead ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-full items-center justify-center bg-void font-hud text-mute",
							children: "VIDEO ERROR"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: ART.rooms[camMeta.room],
								alt: "",
								className: "cam-feed h-full w-full object-cover",
								draggable: false
							}),
							camHere.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: id === "dash" ? ART.lurk : ART.portrait,
								alt: "",
								className: "pointer-events-none absolute bottom-0 left-1/2 h-[78%] -translate-x-1/2 object-contain mix-blend-lighten"
							}, id)),
							camMeta.id === "1C" && dashPeek > 0 && sim.anims.dash.room === "cove" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: ART.lurk,
								alt: "",
								className: "pointer-events-none absolute bottom-0 left-1/2 h-[70%] -translate-x-1/2 object-contain mix-blend-lighten",
								style: {
									opacity: .2 + dashPeek * .8,
									transform: `translate(-50%, ${(1 - dashPeek) * 20}%)`
								}
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute left-3 top-3 flex items-center gap-2 font-hud text-xs tracking-widest text-paper",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rec-dot" }),
								"CAM ",
								camMeta.id
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute bottom-3 left-3 font-hud text-sm tracking-wide text-paper",
							children: camMeta.label
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-[42%] w-full shrink-0 border-t border-paper/15 bg-ink md:h-full md:w-[min(42%,380px)] md:border-l md:border-t-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto h-[78%] w-[92%] max-w-sm",
						children: [CAMS.map((c) => {
							const threat = occupants(sim, c.room).length > 0 || c.id === "1C" && dashPeek > .4;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "blueprint-btn",
								"data-active": c.id === sim.cam ? "true" : "false",
								"data-threat": threat ? "true" : "false",
								style: {
									left: `${c.x}%`,
									top: `${c.y}%`,
									width: `${c.w}%`,
									height: `${c.h}%`
								},
								onClick: () => setCam(c.id),
								children: c.id
							}, c.id);
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute flex items-center justify-center border border-paper/40 font-hud text-[10px] tracking-widest text-mute",
							style: {
								left: "36%",
								top: "78%",
								width: "28%",
								height: "14%"
							},
							children: "YOU"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "px-3 font-hud text-[10px] tracking-widest text-mute",
						children: [lookSide.toUpperCase(), " VIEW · TAP A CAMERA"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaticNoise, { amount: cams ? Math.max(staticAmt, camDead ? .9 : .12) : staticAmt * .4 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scanlines" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vignette" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute left-3 top-3 z-50 font-hud text-xs tracking-widest text-paper md:left-5 md:top-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["NIGHT ", sim.night === 7 ? "CUSTOM" : sim.night] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-lg tabular-nums md:text-2xl",
					children: hourLabel(sim.hour)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute right-3 top-3 z-50 text-right font-hud text-xs tracking-widest text-paper md:right-5 md:top-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "tabular-nums",
					children: [
						"Power ",
						Math.max(0, Math.floor(sim.power)),
						"%"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 flex justify-end gap-1",
					children: Array.from({ length: Math.min(4, usage) }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "usage-bar" }, i))
				})]
			}),
			phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "absolute bottom-24 left-3 right-3 z-50 max-w-lg text-left md:bottom-28 md:left-5",
				onClick: skipPhone,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "phone-text font-hud text-[11px] leading-relaxed md:text-sm",
					children: [phone.slice(0, Math.floor(phoneI)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "opacity-50",
						children: "▌"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-2 block font-hud text-[10px] tracking-widest text-mute",
					children: "TAP TO SKIP"
				})]
			}),
			!powerOut && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "absolute bottom-3 left-1/2 z-50 flex min-h-11 -translate-x-1/2 items-center gap-2 rounded-sm border border-paper/25 bg-void/70 px-5 font-hud text-xs tracking-[0.2em] text-paper md:bottom-5",
				onClick: toggleCams,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4" }), cams ? "CLOSE CAM" : "CAMERAS"]
			}),
			!powerOut && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-16 left-3 z-50 flex gap-2 md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DoorPlate, {
					side: "left",
					door: sim.leftDoor,
					light: sim.leftLight
				})
			}),
			!powerOut && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-16 right-3 z-50 flex gap-2 md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DoorPlate, {
					side: "right",
					door: sim.rightDoor,
					light: sim.rightLight
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pointer-events-none absolute bottom-3 left-3 hidden font-hud text-[10px] tracking-widest text-mute md:block",
				children: "A/D LOOK · Q/W LEFT · O/P RIGHT · SPACE CAM"
			})
		]
	});
}
function preload() {
	return Promise.all(PRELOAD.map((src) => new Promise((resolve) => {
		const img = new Image();
		img.onload = () => resolve();
		img.onerror = () => resolve();
		img.src = src;
	})));
}
function MuteBtn() {
	const muted = useGame((s) => s.muted);
	const toggle = useGame((s) => s.toggleMute);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "absolute right-3 top-3 z-[60] flex size-11 items-center justify-center text-paper/80",
		"aria-label": muted ? "Unmute" : "Mute",
		onClick: toggle,
		children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-5" })
	});
}
function Boot() {
	const boot = useGame((s) => s.boot);
	const setLoad = useGame((s) => s.setLoad);
	const pct = useGame((s) => s.loadPct);
	(0, import_react.useEffect)(() => {
		let n = 0;
		const t = window.setInterval(() => {
			n = Math.min(90, n + 8);
			setLoad(n);
		}, 80);
		preload().then(() => {
			clearInterval(t);
			setLoad(100);
			window.setTimeout(boot, 280);
		});
		return () => clearInterval(t);
	}, [boot, setLoad]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col items-center justify-center bg-void px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl tracking-wide text-paper",
				children: "Five Nights at..."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-4xl text-blood",
				children: "Diddy's"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 h-px w-48 bg-paper/20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-px bg-blood",
					style: { width: `${pct}%` }
				})
			})
		]
	});
}
function Menu() {
	const newGame = useGame((s) => s.newGame);
	const resume = useGame((s) => s.resume);
	const toCustom = useGame((s) => s.toCustom);
	const night = useGame((s) => s.saveNight);
	const custom = useGame((s) => s.unlockedCustom);
	const canResume = night > 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-full bg-void",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "menu-faces-glow" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex w-full flex-col justify-center px-8 py-16 md:w-[46%] md:px-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-[clamp(2rem,6vw,3.4rem)] font-medium leading-[1.05] tracking-wide text-paper",
						children: "Five Nights at..."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-[clamp(2.4rem,7vw,4.2rem)] font-semibold leading-none text-blood",
						children: "Diddy's"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 flex flex-col items-start",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "menu-link",
								onClick: newGame,
								children: "New Game"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "menu-link",
								onClick: resume,
								disabled: !canResume,
								children: ["Resume", canResume ? `  ·  Night ${night}` : ""]
							}),
							custom && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "menu-link",
								onClick: toCustom,
								children: "Custom Night"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-12 max-w-xs font-body text-sm leading-relaxed text-mute",
						children: "Night security. 12 AM to 6 AM. Watch the halls. Close the doors. Don't waste the power."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-y-0 right-0 w-[72%] md:w-[62%]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: ART.faces,
					alt: "",
					className: "h-full w-full object-cover object-left",
					draggable: false
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-void to-transparent" })]
			})
		]
	});
}
function Newspaper() {
	const startNight = useGame((s) => s.startNight);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "flex h-full w-full items-center justify-center bg-void px-4",
		onClick: () => startNight(1),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "max-w-lg rotate-[-1.5deg] bg-[#f4efe2] px-6 py-7 text-left text-[#1b1712] shadow-[0_20px_60px_rgb(0_0_0/0.6)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs tracking-[0.3em] text-[#7a2a22]",
					children: "LOCAL HIRE"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-2xl font-semibold leading-tight md:text-3xl",
					children: "Diddy Entertainment seeks night guard"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 font-body text-sm leading-relaxed",
					children: "A downtown recording studio posted a graveyard shift. Duties include watching security cameras, reporting unusual movement, and remaining in the office until 6 AM."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-body text-sm leading-relaxed",
					children: "“The figures in the halls get restless after midnight,” a spokesman said. “Doors work. Power doesn't last. That's the briefing.”"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 font-hud text-[11px] tracking-widest text-[#7a2a22]",
					children: "CLICK TO CONTINUE"
				})
			]
		})
	});
}
function Intro() {
	const sim = useGame((s) => s.sim);
	const begin = useGame((s) => s.beginPlay);
	(0, import_react.useEffect)(() => {
		const t = window.setTimeout(begin, 1600);
		return () => clearTimeout(t);
	}, [begin]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "flex h-full w-full flex-col items-center justify-center bg-void",
		onClick: begin,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-hud text-sm tracking-[0.4em] text-mute",
			children: "12 AM"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 font-display text-5xl text-paper",
			children: ["Night ", sim?.night === 7 ? "Custom" : sim?.night]
		})]
	});
}
function Jumpscare() {
	const killer = useGame((s) => s.killer);
	(0, import_react.useEffect)(() => {
		const t = window.setTimeout(() => useGame.setState({ screen: "gameover" }), 1100);
		return () => clearTimeout(t);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-full items-center justify-center overflow-hidden bg-void",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: ART.jumpscare,
				alt: "",
				className: "jumpscare-img h-full w-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-blood/20 mix-blend-multiply" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: killer ?? "jumpscare"
			})
		]
	});
}
function GameOver() {
	const retry = useGame((s) => s.retry);
	const toMenu = useGame((s) => s.toMenu);
	const killer = useGame((s) => s.killer);
	const name = killer ? ANIM_META[killer].name : "Something";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col items-center justify-center bg-void px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-5xl tracking-wide text-blood",
				children: "GAME OVER"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 font-body text-mute",
				children: [name, " got in."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-col items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "menu-link",
					onClick: retry,
					children: "Retry Night"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "menu-link",
					onClick: toMenu,
					children: "Menu"
				})]
			})
		]
	});
}
function SixAm() {
	const sim = useGame((s) => s.sim);
	(0, import_react.useEffect)(() => {
		const t = window.setTimeout(() => useGame.setState({ screen: "nightclear" }), 2200);
		return () => clearTimeout(t);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col items-center justify-center bg-void",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "six-am-digit text-paper",
				children: "6"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-3 font-hud text-2xl tracking-[0.3em] text-paper",
				children: "AM"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 font-hud text-sm tracking-widest text-mute",
			children: [
				"Night ",
				sim?.night,
				" complete"
			]
		})]
	});
}
function NightClear() {
	const next = useGame((s) => s.nextNight);
	const sim = useGame((s) => s.sim);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col items-center justify-center bg-void px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-hud text-sm tracking-[0.3em] text-mute",
				children: "SHIFT COMPLETE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-display text-4xl text-paper",
				children: "6 AM"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 font-body text-mute",
				children: [
					"You survived Night ",
					sim?.night === 7 ? "Custom" : sim?.night,
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "menu-link mt-10",
				onClick: next,
				children: "Continue"
			})
		]
	});
}
function Victory() {
	const toMenu = useGame((s) => s.toMenu);
	const toCustom = useGame((s) => s.toCustom);
	const startNight = useGame((s) => s.startNight);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col items-center justify-center bg-void px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "w-full max-w-md bg-[#f4efe2] px-6 py-7 text-[#1b1712] shadow-[0_20px_60px_rgb(0_0_0/0.6)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs tracking-[0.3em] text-[#7a2a22]",
					children: "DIDDY ENTERTAINMENT"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-2xl font-semibold",
					children: "Paycheck"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 font-body text-sm leading-relaxed",
					children: [
						"Employee: Night Guard",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Amount: $4.50",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Note: See you next week. Maybe."
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 flex flex-col items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "menu-link",
					onClick: () => startNight(6),
					children: "Night 6"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "menu-link",
					onClick: toCustom,
					children: "Custom Night"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "menu-link",
					onClick: toMenu,
					children: "Menu"
				})
			]
		})]
	});
}
function Custom() {
	const ai = useGame((s) => s.customAI);
	const setCustom = useGame((s) => s.setCustom);
	const start = useGame((s) => s.startCustom);
	const toMenu = useGame((s) => s.toMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col items-center justify-center bg-void px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-4xl text-paper",
				children: "Custom Night"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid w-full max-w-md gap-5",
				children: [
					"diddy",
					"puff",
					"dash",
					"static"
				].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex justify-between font-hud text-xs tracking-widest",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: ANIM_META[id].name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-eye",
							children: ai[id]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 0,
						max: 20,
						value: ai[id],
						onChange: (e) => setCustom(id, Number(e.target.value)),
						className: "w-full accent-blood"
					})]
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "menu-link mt-8",
				onClick: start,
				children: "Start"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "menu-link",
				onClick: toMenu,
				children: "Menu"
			})
		]
	});
}
function Pause() {
	const unpause = useGame((s) => s.unpause);
	const toMenu = useGame((s) => s.toMenu);
	const shake = useGame((s) => s.shake);
	const toggleShake = useGame((s) => s.toggleShake);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-[55] flex items-center justify-center bg-void/80",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-4xl text-paper",
					children: "Paused"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "menu-link mt-6",
					onClick: unpause,
					children: "Resume"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "menu-link",
					onClick: toggleShake,
					children: ["Shake ", shake ? "On" : "Off"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "menu-link",
					onClick: toMenu,
					children: "Quit to Menu"
				})
			]
		})
	});
}
function GameRoot() {
	const screen = useGame((s) => s.screen);
	const tick = useGame((s) => s.tick);
	const last = (0, import_react.useRef)(performance.now());
	(0, import_react.useEffect)(() => {
		let raf = 0;
		const loop = (now) => {
			const dt = Math.min(.1, (now - last.current) / 1e3);
			last.current = now;
			tick(dt);
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		const vis = () => {
			last.current = performance.now();
		};
		document.addEventListener("visibilitychange", vis);
		return () => {
			cancelAnimationFrame(raf);
			document.removeEventListener("visibilitychange", vis);
		};
	}, [tick]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "game-root",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MuteBtn, {}),
			screen === "boot" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boot, {}),
			screen === "menu" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {}),
			screen === "newspaper" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newspaper, {}),
			screen === "intro" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Intro, {}),
			(screen === "play" || screen === "powerout" || screen === "pause") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayView, {}),
			screen === "pause" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {}),
			screen === "jumpscare" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Jumpscare, {}),
			screen === "gameover" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameOver, {}),
			screen === "sixam" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SixAm, {}),
			screen === "nightclear" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NightClear, {}),
			screen === "victory" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Victory, {}),
			screen === "custom" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Custom, {})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameRoot, {});
}
//#endregion
export { Home as component };
