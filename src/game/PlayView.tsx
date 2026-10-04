import { Camera, Lightbulb, PanelLeftClose, PanelRightClose, Pause } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ART, CAMS, hourLabel, ROOM_TO_CAM, usageOf } from "./constants";
import { occupants } from "./sim";
import { useGame } from "./store";
import type { AnimId, CamId, RoomId } from "./types";

function StaticNoise({ amount }: { amount: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const amountRef = useRef(amount);
  amountRef.current = amount;

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    const width = 160;
    const height = 90;
    let raf = 0;
    let lastDraw = 0;
    let wasVisible = false;
    canvas.width = width;
    canvas.height = height;

    const draw = (now: number) => {
      if (now - lastDraw >= 66) {
        const alpha = amountRef.current;
        if (alpha > 0.04) {
          const image = context.createImageData(width, height);
          const pixels = image.data;
          for (let i = 0; i < pixels.length; i += 4) {
            const value = Math.random() * 255;
            pixels[i] = value;
            pixels[i + 1] = value;
            pixels[i + 2] = value;
            pixels[i + 3] = Math.min(255, alpha * 220);
          }
          context.putImageData(image, 0, 0);
          wasVisible = true;
        } else if (wasVisible) {
          context.clearRect(0, 0, width, height);
          wasVisible = false;
        }
        lastDraw = now;
      }
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 z-30 h-full w-full opacity-70 mix-blend-overlay"
    />
  );
}

function DoorPlate({
  side,
  door,
  light,
}: {
  side: "left" | "right";
  door: boolean;
  light: boolean;
}) {
  const toggleDoor = useGame((s) => s.toggleDoor);
  const toggleLight = useGame((s) => s.toggleLight);
  const Icon = side === "left" ? PanelLeftClose : PanelRightClose;
  return (
    <div className={`flex flex-col gap-2 ${side === "right" ? "items-end" : "items-start"}`}>
      <button
        type="button"
        className="plate-btn w-14"
        data-on={light ? "true" : "false"}
        aria-pressed={light}
        aria-label={`${side} light`}
        onClick={() => toggleLight(side)}
      >
        <Lightbulb className="size-4" />
      </button>
      <button
        type="button"
        className="plate-btn w-14"
        data-on={door ? "true" : "false"}
        data-door="true"
        aria-pressed={door}
        aria-label={`${side} door`}
        onClick={() => toggleDoor(side)}
      >
        <Icon className="size-4" />
      </button>
    </div>
  );
}

function Figure({ id, peek }: { id: AnimId; peek?: number }) {
  const src = id === "dash" ? ART.lurk : ART.door;
  return (
    <img
      src={src}
      alt=""
      className="door-figure"
      style={{
        transform: `translateY(${(1 - (peek ?? 1)) * 28}%) scale(${0.9 + (peek ?? 1) * 0.1})`,
        opacity: 0.35 + (peek ?? 1) * 0.65,
      }}
    />
  );
}

export function PlayView() {
  const sim = useGame((s) => s.sim);
  const lookSide = useGame((s) => s.lookSide);
  const setLook = useGame((s) => s.setLook);
  const toggleCams = useGame((s) => s.toggleCams);
  const pause = useGame((s) => s.pause);
  const setCam = useGame((s) => s.setCam);
  const skipPhone = useGame((s) => s.skipPhone);
  const phone = useGame((s) => s.phone);
  const phoneI = useGame((s) => s.phoneI);
  const staticAmt = useGame((s) => s.staticAmt);
  const hallucination = useGame((s) => s.hallucination);
  const screen = useGame((s) => s.screen);
  const trauma = useGame((s) => s.trauma);
  const shakeOn = useGame((s) => s.shake);
  const panRef = useRef<HTMLDivElement>(null);
  const pan = useRef(0.5);
  const target = useRef(0.5);
  const [held, setHeld] = useState<Record<string, boolean>>({});
  const heldCodes = useRef(new Set<string>());

  useEffect(() => {
    const keyName = (event: KeyboardEvent) => event.key.toLowerCase();
    const directionFor = (code: string, key: string) => {
      if (code === "KeyA" || code === "ArrowLeft" || key === "a" || key === "arrowleft") {
        return "left";
      }
      if (code === "KeyD" || code === "ArrowRight" || key === "d" || key === "arrowright") {
        return "right";
      }
      return null;
    };
    const down = (event: KeyboardEvent) => {
      const key = keyName(event);
      const code = event.code || key;
      const direction = directionFor(code, key);
      if (code === "Space" || code === "ArrowLeft" || code === "ArrowRight") {
        event.preventDefault();
      }
      if (event.repeat || heldCodes.current.has(code)) return;
      heldCodes.current.add(code);
      if (direction) setHeld((previous) => ({ ...previous, [direction]: true }));

      if (code === "Space" || code === "KeyC" || key === " ") toggleCams();
      if (code === "KeyQ" || key === "q") useGame.getState().toggleDoor("left");
      if (code === "KeyW" || key === "w") useGame.getState().toggleLight("left");
      if (code === "KeyO" || key === "o") useGame.getState().toggleLight("right");
      if (code === "KeyP" || key === "p") useGame.getState().toggleDoor("right");
      if (code === "Escape" || key === "escape") {
        const state = useGame.getState();
        if (state.screen === "play" || state.screen === "powerout") state.pause();
        else if (state.screen === "pause") state.unpause();
      }

      const digit = /^Digit([1-9])$/.exec(code)?.[1] ?? (/^[1-9]$/.test(key) ? key : null);
      if (digit) {
        const cam = CAMS[Number(digit) - 1];
        if (cam) setCam(cam.id);
      }
    };
    const up = (event: KeyboardEvent) => {
      const key = keyName(event);
      const code = event.code || key;
      heldCodes.current.delete(code);
      const direction = directionFor(code, key);
      if (direction) setHeld((previous) => ({ ...previous, [direction]: false }));
    };
    const clearHeld = () => {
      heldCodes.current.clear();
      setHeld({});
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", clearHeld);
    document.addEventListener("visibilitychange", clearHeld);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", clearHeld);
      document.removeEventListener("visibilitychange", clearHeld);
    };
  }, [setCam, toggleCams]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (held.left) target.current = Math.max(0, target.current - dt * 1.5);
      if (held.right) target.current = Math.min(1, target.current + dt * 1.5);
      pan.current += (target.current - pan.current) * (1 - Math.exp(-12 * dt));
      const el = panRef.current;
      if (el) {
        const x = pan.current * 32;
        el.style.transform = `translateX(-${x}%)`;
      }
      const side = pan.current < 0.32 ? "left" : pan.current > 0.68 ? "right" : "center";
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
  const camMeta = CAMS.find((c) => c.id === sim.cam)!;
  const camDead = Boolean(sim.camDisabled[sim.cam]);
  const leftHere = occupants(sim, "leftDoor");
  const rightHere = occupants(sim, "rightDoor");
  const camRoom = camMeta.room as RoomId;
  const camHere = occupants(sim, camRoom);
  const dashPeek = sim.anims.dash.dashStage / 4;
  const shake = shakeOn ? trauma * trauma : 0;
  const ox = shake ? (Math.random() * 2 - 1) * shake * 18 : 0;
  const oy = shake ? (Math.random() * 2 - 1) * shake * 12 : 0;

  const onPointer = (e: React.PointerEvent) => {
    if (cams) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (e.pointerType === "touch" && e.type === "pointerdown") {
      target.current = x < 0.33 ? 0 : x > 0.67 ? 1 : x;
      return;
    }
    if (x < 0.22) target.current = Math.max(0, target.current - 0.04);
    else if (x > 0.78) target.current = Math.min(1, target.current + 0.04);
    else target.current = x;
  };

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-void"
      style={{ transform: `translate(${ox}px, ${oy}px)` }}
      onPointerMove={onPointer}
      onPointerDown={onPointer}
    >
      <div ref={panRef} className="office-pan">
        <img src={ART.office} alt="" className="office-bg" draggable={false} />
        {powerOut && <div className="absolute inset-0 bg-void/92" />}

        <div className="doorway doorway-left">
          <div
            className="metal-door"
            style={{ transform: sim.leftDoor ? "scaleX(1)" : "scaleX(0)" }}
          />
          {sim.leftLight && !sim.leftDoor && <div className="light-cone" />}
          {sim.leftLight && !sim.leftDoor && leftHere[0] && <Figure id={leftHere[0]} />}
        </div>
        <div className="doorway doorway-right">
          <div
            className="metal-door"
            style={{ transform: sim.rightDoor ? "scaleX(1)" : "scaleX(0)" }}
          />
          {sim.rightLight && !sim.rightDoor && <div className="light-cone" />}
          {sim.rightLight && !sim.rightDoor && rightHere[0] && <Figure id={rightHere[0]} />}
        </div>
      </div>

      {hallucination > 0 && (
        <img
          src={ART.portrait}
          alt=""
          className="pointer-events-none absolute inset-y-0 left-1/2 z-20 w-[min(70%,420px)] -translate-x-1/2 object-contain mix-blend-lighten"
          style={{ opacity: hallucination }}
        />
      )}

      {powerOut && (
        <img
          src={ART.portrait}
          alt=""
          className="pointer-events-none absolute bottom-0 left-1/2 z-20 w-[min(80%,520px)] -translate-x-1/2 object-contain mix-blend-lighten"
          style={{ opacity: Math.min(0.85, sim.powerOutT / 8) }}
        />
      )}

      {cams && (
        <div className="absolute inset-0 z-30 flex flex-col bg-void/80 md:flex-row">
          <div className="relative min-h-0 flex-1 overflow-hidden">
            {camDead ? (
              <div className="flex h-full items-center justify-center bg-void font-hud text-mute">
                VIDEO ERROR
              </div>
            ) : (
              <>
                <img
                  src={ART.rooms[camMeta.room]}
                  alt=""
                  className="cam-feed h-full w-full object-cover"
                  draggable={false}
                />
                {camHere.map((id) => (
                  <img
                    key={id}
                    src={id === "dash" ? ART.lurk : ART.portrait}
                    alt=""
                    className="pointer-events-none absolute bottom-0 left-1/2 h-[78%] -translate-x-1/2 object-contain mix-blend-lighten"
                  />
                ))}
                {camMeta.id === "1C" && dashPeek > 0 && sim.anims.dash.room === "cove" && (
                  <img
                    src={ART.lurk}
                    alt=""
                    className="pointer-events-none absolute bottom-0 left-1/2 h-[70%] -translate-x-1/2 object-contain mix-blend-lighten"
                    style={{
                      opacity: 0.2 + dashPeek * 0.8,
                      transform: `translate(-50%, ${(1 - dashPeek) * 20}%)`,
                    }}
                  />
                )}
              </>
            )}
            <div className="absolute left-3 top-3 flex items-center gap-2 font-hud text-xs tracking-widest text-paper">
              <span className="rec-dot" />
              CAM {camMeta.id}
            </div>
            <div className="absolute bottom-3 left-3 font-hud text-sm tracking-wide text-paper">
              {camMeta.label}
            </div>
          </div>
          <div className="relative h-[42%] w-full shrink-0 border-t border-paper/15 bg-ink md:h-full md:w-[min(42%,380px)] md:border-l md:border-t-0">
            <div className="relative mx-auto h-[78%] w-[92%] max-w-sm">
              {CAMS.map((c) => {
                const threat =
                  occupants(sim, c.room).length > 0 || (c.id === "1C" && dashPeek > 0.4);
                return (
                  <button
                    key={c.id}
                    type="button"
                    className="blueprint-btn"
                    data-active={c.id === sim.cam ? "true" : "false"}
                    data-threat={threat ? "true" : "false"}
                    style={{
                      left: `${c.x}%`,
                      top: `${c.y}%`,
                      width: `${c.w}%`,
                      height: `${c.h}%`,
                    }}
                    onClick={() => setCam(c.id as CamId)}
                  >
                    {c.id}
                  </button>
                );
              })}
              <div
                className="absolute flex items-center justify-center border border-paper/40 font-hud text-[10px] tracking-widest text-mute"
                style={{ left: "36%", top: "78%", width: "28%", height: "14%" }}
              >
                YOU
              </div>
            </div>
            <p className="px-3 font-hud text-[10px] tracking-widest text-mute">
              {lookSide.toUpperCase()} VIEW · TAP A CAMERA
            </p>
          </div>
        </div>
      )}

      <StaticNoise amount={cams ? Math.max(staticAmt, camDead ? 0.9 : 0.12) : staticAmt * 0.4} />
      <div className="scanlines" />
      <div className="vignette" />

      <div className="pointer-events-none absolute left-3 top-3 z-50 font-hud text-xs tracking-widest text-paper md:left-5 md:top-5">
        <div>NIGHT {sim.night === 7 ? "CUSTOM" : sim.night}</div>
        <div className="mt-1 text-lg tabular-nums md:text-2xl">{hourLabel(sim.hour)}</div>
      </div>
      <div className="pointer-events-none absolute right-14 top-3 z-50 text-right font-hud text-xs tracking-widest text-paper md:right-16 md:top-5">
        <div className="tabular-nums">Power {Math.max(0, Math.floor(sim.power))}%</div>
        <div className="mt-1 flex justify-end gap-1">
          {Array.from({ length: Math.min(4, usage) }).map((_, i) => (
            <span key={i} className="usage-bar" />
          ))}
        </div>
      </div>
      {(screen === "play" || screen === "powerout") && (
        <button
          type="button"
          className="game-pause-button"
          aria-label="Pause night"
          title="Pause night"
          onClick={pause}
        >
          <Pause className="size-4" aria-hidden="true" />
        </button>
      )}

      {phone && (
        <button
          type="button"
          className="absolute bottom-24 left-3 right-3 z-50 max-w-lg text-left md:bottom-28 md:left-5"
          onClick={skipPhone}
        >
          <p className="phone-text font-hud text-[11px] leading-relaxed md:text-sm">
            {phone.slice(0, Math.floor(phoneI))}
            <span className="opacity-50">▌</span>
          </p>
          <span className="mt-2 block font-hud text-[10px] tracking-widest text-mute">
            TAP TO SKIP
          </span>
        </button>
      )}

      {!powerOut && (
        <button
          type="button"
          className="game-camera-toggle absolute left-1/2 z-50 flex min-h-11 -translate-x-1/2 items-center gap-2 rounded-sm border border-paper/25 bg-void/70 px-5 font-hud text-xs tracking-[0.2em] text-paper"
          onClick={toggleCams}
        >
          <Camera className="size-4" />
          {cams ? "CLOSE CAM" : "CAMERAS"}
        </button>
      )}

      {!powerOut && !cams && (
        <div className="absolute left-2 top-[42%] z-50 -translate-y-1/2 md:left-3">
          <DoorPlate side="left" door={sim.leftDoor} light={sim.leftLight} />
        </div>
      )}
      {!powerOut && !cams && (
        <div className="absolute right-2 top-[42%] z-50 -translate-y-1/2 md:right-3">
          <DoorPlate side="right" door={sim.rightDoor} light={sim.rightLight} />
        </div>
      )}

      <p className="pointer-events-none absolute bottom-3 left-3 hidden font-hud text-[10px] tracking-widest text-mute md:block">
        A/D LOOK · Q/W LEFT · O/P RIGHT · SPACE CAM
      </p>
    </div>
  );
}

void ROOM_TO_CAM;
