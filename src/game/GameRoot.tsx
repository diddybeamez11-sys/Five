import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef } from "react";
import { ART, PRELOAD } from "./constants";
import { PlayView } from "./PlayView";
import { useGame } from "./store";
import { ANIM_META } from "./constants";
import type { AnimId } from "./types";

function preload() {
  return Promise.all(
    PRELOAD.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
        }),
    ),
  );
}

function MuteBtn() {
  const muted = useGame((s) => s.muted);
  const toggle = useGame((s) => s.toggleMute);
  return (
    <button
      type="button"
      className="game-mute-button text-paper/80"
      aria-label={muted ? "Unmute" : "Mute"}
      onClick={toggle}
    >
      {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
    </button>
  );
}

function Boot() {
  const boot = useGame((s) => s.boot);
  const setLoad = useGame((s) => s.setLoad);
  const pct = useGame((s) => s.loadPct);
  useEffect(() => {
    let n = 0;
    let cancelled = false;
    let finishTimer = 0;
    const progressTimer = window.setInterval(() => {
      n = Math.min(90, n + 8);
      setLoad(n);
    }, 80);
    void preload().then(() => {
      window.clearInterval(progressTimer);
      if (cancelled) return;
      setLoad(100);
      finishTimer = window.setTimeout(boot, 280);
    });
    return () => {
      cancelled = true;
      window.clearInterval(progressTimer);
      window.clearTimeout(finishTimer);
    };
  }, [boot, setLoad]);
  return (
    <div className="flex h-full flex-col items-center justify-center bg-void px-6">
      <p className="font-display text-3xl tracking-wide text-paper">Five Nights at...</p>
      <p className="mt-2 font-display text-4xl text-blood">Diddy's</p>
      <div className="mt-10 h-px w-48 bg-paper/20">
        <div className="h-px bg-blood" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Menu() {
  const newGame = useGame((s) => s.newGame);
  const resume = useGame((s) => s.resume);
  const toCustom = useGame((s) => s.toCustom);
  const night = useGame((s) => s.saveNight);
  const custom = useGame((s) => s.unlockedCustom);
  const canResume = night > 1;
  return (
    <div className="relative flex h-full bg-void">
      <div className="menu-faces-glow" />
      <div className="relative z-10 flex w-full flex-col justify-center px-8 py-16 md:w-[46%] md:px-14">
        <h1 className="font-display text-[clamp(2rem,6vw,3.4rem)] font-medium leading-[1.05] tracking-wide text-paper">
          Five Nights at...
        </h1>
        <p className="mt-2 font-display text-[clamp(2.4rem,7vw,4.2rem)] font-semibold leading-none text-blood">
          Diddy's
        </p>
        <div className="mt-10 flex flex-col items-start">
          <button type="button" className="menu-link" onClick={newGame}>
            New Game
          </button>
          <button type="button" className="menu-link" onClick={resume} disabled={!canResume}>
            Resume{canResume ? `  ·  Night ${night}` : ""}
          </button>
          {custom && (
            <button type="button" className="menu-link" onClick={toCustom}>
              Custom Night
            </button>
          )}
        </div>
        <p className="mt-12 max-w-xs font-body text-sm leading-relaxed text-mute">
          Night security. Tap or drag at the left and right edges to look around. Check the cameras,
          use the hall controls carefully, and make it to 6 AM without wasting power.
        </p>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[72%] md:w-[62%]">
        <img
          src={ART.faces}
          alt=""
          className="h-full w-full object-cover object-left"
          draggable={false}
        />
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-void to-transparent" />
      </div>
    </div>
  );
}

function Newspaper() {
  const startNight = useGame((s) => s.startNight);
  return (
    <button
      type="button"
      className="flex h-full w-full items-center justify-center bg-void px-4"
      onClick={() => startNight(1)}
    >
      <article className="max-w-lg rotate-[-1.5deg] bg-[#f4efe2] px-6 py-7 text-left text-[#1b1712] shadow-[0_20px_60px_rgb(0_0_0/0.6)]">
        <p className="font-display text-xs tracking-[0.3em] text-[#7a2a22]">LOCAL HIRE</p>
        <h2 className="mt-2 font-display text-2xl font-semibold leading-tight md:text-3xl">
          Diddy Entertainment seeks night guard
        </h2>
        <p className="mt-4 font-body text-sm leading-relaxed">
          A downtown recording studio posted a graveyard shift. Duties include watching security
          cameras, reporting unusual movement, and remaining in the office until 6 AM.
        </p>
        <p className="mt-3 font-body text-sm leading-relaxed">
          &ldquo;The figures in the halls get restless after midnight,&rdquo; a spokesman said.
          &ldquo;Doors work. Power doesn't last. That's the briefing.&rdquo;
        </p>
        <p className="mt-6 font-hud text-[11px] tracking-widest text-[#7a2a22]">
          CLICK TO CONTINUE
        </p>
      </article>
    </button>
  );
}

function Intro() {
  const sim = useGame((s) => s.sim);
  const begin = useGame((s) => s.beginPlay);
  useEffect(() => {
    const t = window.setTimeout(begin, 1600);
    return () => clearTimeout(t);
  }, [begin]);
  return (
    <button
      type="button"
      className="flex h-full w-full flex-col items-center justify-center bg-void"
      onClick={begin}
    >
      <p className="font-hud text-sm tracking-[0.4em] text-mute">12 AM</p>
      <p className="mt-3 font-display text-5xl text-paper">
        Night {sim?.night === 7 ? "Custom" : sim?.night}
      </p>
    </button>
  );
}

function Jumpscare() {
  const killer = useGame((s) => s.killer);
  useEffect(() => {
    const t = window.setTimeout(() => useGame.setState({ screen: "gameover" }), 1100);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden bg-void">
      <img src={ART.jumpscare} alt="" className="jumpscare-img h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-blood/20 mix-blend-multiply" />
      <span className="sr-only">{killer ?? "jumpscare"}</span>
    </div>
  );
}

function GameOver() {
  const retry = useGame((s) => s.retry);
  const toMenu = useGame((s) => s.toMenu);
  const killer = useGame((s) => s.killer);
  const name = killer ? ANIM_META[killer as AnimId].name : "Something";
  return (
    <div className="flex h-full flex-col items-center justify-center bg-void px-6">
      <p className="font-display text-5xl tracking-wide text-blood">GAME OVER</p>
      <p className="mt-3 font-body text-mute">{name} got in.</p>
      <div className="mt-10 flex flex-col items-center gap-2">
        <button type="button" className="menu-link" onClick={retry}>
          Retry Night
        </button>
        <button type="button" className="menu-link" onClick={toMenu}>
          Menu
        </button>
      </div>
    </div>
  );
}

function SixAm() {
  const sim = useGame((s) => s.sim);
  useEffect(() => {
    const t = window.setTimeout(() => useGame.setState({ screen: "nightclear" }), 2200);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="flex h-full flex-col items-center justify-center bg-void">
      <div className="flex items-end gap-3">
        <span className="six-am-digit text-paper">6</span>
        <span className="mb-3 font-hud text-2xl tracking-[0.3em] text-paper">AM</span>
      </div>
      <p className="mt-4 font-hud text-sm tracking-widest text-mute">Night {sim?.night} complete</p>
    </div>
  );
}

function NightClear() {
  const next = useGame((s) => s.nextNight);
  const sim = useGame((s) => s.sim);
  return (
    <div className="flex h-full flex-col items-center justify-center bg-void px-6">
      <p className="font-hud text-sm tracking-[0.3em] text-mute">SHIFT COMPLETE</p>
      <p className="mt-3 font-display text-4xl text-paper">6 AM</p>
      <p className="mt-2 font-body text-mute">
        You survived Night {sim?.night === 7 ? "Custom" : sim?.night}.
      </p>
      <button type="button" className="menu-link mt-10" onClick={next}>
        Continue
      </button>
    </div>
  );
}

function Victory() {
  const toMenu = useGame((s) => s.toMenu);
  const toCustom = useGame((s) => s.toCustom);
  const startNight = useGame((s) => s.startNight);
  return (
    <div className="flex h-full flex-col items-center justify-center bg-void px-6">
      <article className="w-full max-w-md bg-[#f4efe2] px-6 py-7 text-[#1b1712] shadow-[0_20px_60px_rgb(0_0_0/0.6)]">
        <p className="font-display text-xs tracking-[0.3em] text-[#7a2a22]">DIDDY ENTERTAINMENT</p>
        <h2 className="mt-2 font-display text-2xl font-semibold">Paycheck</h2>
        <p className="mt-4 font-body text-sm leading-relaxed">
          Employee: Night Guard
          <br />
          Amount: $4.50
          <br />
          Note: See you next week. Maybe.
        </p>
      </article>
      <div className="mt-8 flex flex-col items-center">
        <button type="button" className="menu-link" onClick={() => startNight(6)}>
          Night 6
        </button>
        <button type="button" className="menu-link" onClick={toCustom}>
          Custom Night
        </button>
        <button type="button" className="menu-link" onClick={toMenu}>
          Menu
        </button>
      </div>
    </div>
  );
}

function Custom() {
  const ai = useGame((s) => s.customAI);
  const setCustom = useGame((s) => s.setCustom);
  const start = useGame((s) => s.startCustom);
  const toMenu = useGame((s) => s.toMenu);
  const ids = ["diddy", "puff", "dash", "static"] as const;
  return (
    <div className="flex h-full flex-col items-center justify-center bg-void px-6">
      <h2 className="font-display text-4xl text-paper">Custom Night</h2>
      <div className="mt-8 grid w-full max-w-md gap-5">
        {ids.map((id) => (
          <label key={id} className="block">
            <div className="mb-1 flex justify-between font-hud text-xs tracking-widest">
              <span>{ANIM_META[id].name}</span>
              <span className="tabular-nums text-eye">{ai[id]}</span>
            </div>
            <input
              type="range"
              min={0}
              max={20}
              value={ai[id]}
              onChange={(e) => setCustom(id, Number(e.target.value))}
              className="w-full accent-blood"
            />
          </label>
        ))}
      </div>
      <button type="button" className="menu-link mt-8" onClick={start}>
        Start
      </button>
      <button type="button" className="menu-link" onClick={toMenu}>
        Menu
      </button>
    </div>
  );
}

function Pause() {
  const unpause = useGame((s) => s.unpause);
  const toMenu = useGame((s) => s.toMenu);
  const shake = useGame((s) => s.shake);
  const toggleShake = useGame((s) => s.toggleShake);
  return (
    <div className="absolute inset-0 z-[55] flex items-center justify-center bg-void/80">
      <div className="flex flex-col items-center">
        <p className="font-display text-4xl text-paper">Paused</p>
        <button type="button" className="menu-link mt-6" onClick={unpause}>
          Resume
        </button>
        <button type="button" className="menu-link" onClick={toggleShake}>
          Shake {shake ? "On" : "Off"}
        </button>
        <button type="button" className="menu-link" onClick={toMenu}>
          Quit to Menu
        </button>
      </div>
    </div>
  );
}

export function GameRoot() {
  const screen = useGame((s) => s.screen);
  const tick = useGame((s) => s.tick);
  const last = useRef(performance.now());

  useEffect(() => {
    let raf = 0;
    const loop = (now: number) => {
      const dt = Math.min(0.1, (now - last.current) / 1000);
      last.current = now;
      tick(dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const vis = () => {
      if (document.visibilityState === "hidden") useGame.getState().pause();
      last.current = performance.now();
    };
    document.addEventListener("visibilitychange", vis);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", vis);
    };
  }, [tick]);

  return (
    <main className="game-root">
      <MuteBtn />
      {screen === "boot" && <Boot />}
      {screen === "menu" && <Menu />}
      {screen === "newspaper" && <Newspaper />}
      {screen === "intro" && <Intro />}
      {(screen === "play" || screen === "powerout" || screen === "pause") && <PlayView />}
      {screen === "pause" && <Pause />}
      {screen === "jumpscare" && <Jumpscare />}
      {screen === "gameover" && <GameOver />}
      {screen === "sixam" && <SixAm />}
      {screen === "nightclear" && <NightClear />}
      {screen === "victory" && <Victory />}
      {screen === "custom" && <Custom />}
    </main>
  );
}
