import { useRef } from "react";
import { motion, useScroll, useTransform, easeOut } from "framer-motion";

/*
 * Scroll-driven build-up of a GT-R style coupe: each mechanical component
 * (chassis, engine, transaxle, suspension, exhaust, wheels, body, wing)
 * flies in on its own scroll window, in real assembly order.
 */

const STAGES = [
  { key: "chassis", win: [0.1, 0.19], title: "Chassis", spec: "Carbon-hybrid platform" },
  { key: "engine", win: [0.17, 0.26], title: "Engine", spec: "3.8L V6 twin-turbo · 600 hp" },
  { key: "trans", win: [0.24, 0.33], title: "Transaxle", spec: "Rear-mounted 6-speed dual-clutch" },
  { key: "susp", win: [0.31, 0.4], title: "Suspension", spec: "Adaptive coilover dampers" },
  { key: "exhaust", win: [0.38, 0.46], title: "Exhaust", spec: "Full titanium system" },
  { key: "wheels", win: [0.44, 0.55], title: "Wheels", spec: "20-inch forged alloys · carbon-ceramic brakes" },
  { key: "body", win: [0.56, 0.68], title: "Body", spec: "Hand-formed aluminium & carbon fibre" },
  { key: "wing", win: [0.67, 0.74], title: "Aero", spec: "Carbon rear wing · 220 kg downforce" },
];

const win = (key) => STAGES.find((s) => s.key === key).win;

const GOLD = "#c9a55c";
const GOLD_BRIGHT = "#e3c27e";
const GOLD_DIM = "#9a7637";
const IVORY = "#e8e2d2";

function Part({ progress, window: w, from = {}, children }) {
  const [a, b] = w;
  const x = useTransform(progress, [a, b], [from.x ?? 0, 0], { ease: easeOut });
  const y = useTransform(progress, [a, b], [from.y ?? 0, 0], { ease: easeOut });
  const opacity = useTransform(progress, [a, a + 0.05], [0, 1]);
  return <motion.g style={{ x, y, opacity }}>{children}</motion.g>;
}

function Wheel({ progress, window: w, cx, fromX }) {
  const [a, b] = w;
  const x = useTransform(progress, [a, b], [fromX, 0], { ease: easeOut });
  const rotate = useTransform(progress, [a, b], [fromX * 0.75, 0], { ease: easeOut });
  const opacity = useTransform(progress, [a, a + 0.04], [0, 1]);
  return (
    <g transform={`translate(${cx} 310)`}>
      <motion.g
        style={{ x, rotate, opacity, transformBox: "fill-box", originX: 0.5, originY: 0.5 }}
      >
        {/* tire */}
        <circle r="58" fill="rgba(12,12,15,0.85)" stroke="#55482e" strokeWidth="10" />
        {/* brake disc */}
        <circle r="24" fill="none" stroke="rgba(227,194,126,0.45)" strokeWidth="6" />
        {/* rim */}
        <circle r="38" fill="none" stroke={GOLD_BRIGHT} strokeWidth="2.5" />
        {/* spokes */}
        {Array.from({ length: 6 }, (_, i) => (
          <line
            key={i}
            x1="0"
            y1="-9"
            x2="0"
            y2="-36"
            stroke={GOLD}
            strokeWidth="2.5"
            transform={`rotate(${i * 60})`}
          />
        ))}
        <circle r="8" fill="#0a0a0c" stroke={GOLD_BRIGHT} strokeWidth="2" />
      </motion.g>
    </g>
  );
}

function StageLabel({ progress, window: w, title, spec }) {
  const [a, b] = w;
  const opacity = useTransform(progress, [a + 0.01, a + 0.05, b + 0.02, b + 0.06], [0, 1, 1, 0]);
  const y = useTransform(progress, [a, a + 0.05], [14, 0]);
  return (
    <motion.div
      style={{
        position: "absolute",
        inset: "0 0 auto 0",
        textAlign: "center",
        opacity,
        y,
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: GOLD_BRIGHT,
        }}
      >
        {title}
      </span>
      <span
        style={{
          display: "block",
          marginTop: 8,
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 17,
          color: "var(--text-dim)",
        }}
      >
        {spec}
      </span>
    </motion.div>
  );
}

function CarBuild({ progress }) {
  const bodyFill = useTransform(progress, [0.6, 0.8], [0.1, 0.97]);
  const glassFill = useTransform(progress, [0.6, 0.8], [0.06, 0.16]);
  const shadow = useTransform(progress, [0.56, 0.72], [0, 0.5]);

  return (
    <svg viewBox="0 0 1000 400" style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#202027" />
          <stop offset="55%" stopColor="#131318" />
          <stop offset="100%" stopColor="#0c0c0f" />
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <motion.ellipse cx="500" cy="374" rx="400" ry="13" fill="url(#groundShadow)" style={{ opacity: shadow }} />

      {/* ---- chassis ---- */}
      <Part progress={progress} window={win("chassis")} from={{ y: 300 }}>
        <rect x="150" y="316" width="670" height="10" rx="4" fill="rgba(201,165,92,0.08)" stroke={GOLD_DIM} strokeWidth="1.5" />
        {[260, 380, 500, 620, 740].map((x) => (
          <line key={x} x1={x} y1="316" x2={x} y2="326" stroke={GOLD_DIM} strokeWidth="1.5" />
        ))}
        <rect x="170" y="307" width="110" height="9" rx="3" fill="none" stroke={GOLD_DIM} strokeWidth="1.5" />
        <rect x="650" y="307" width="120" height="9" rx="3" fill="none" stroke={GOLD_DIM} strokeWidth="1.5" />
      </Part>

      {/* ---- engine ---- */}
      <Part progress={progress} window={win("engine")} from={{ x: -560 }}>
        <rect x="190" y="258" width="90" height="48" rx="5" fill="rgba(201,165,92,0.07)" stroke={GOLD} strokeWidth="2" />
        <rect x="196" y="246" width="78" height="12" rx="3" fill="none" stroke={GOLD} strokeWidth="1.5" />
        {[212, 228, 244, 260].map((x) => (
          <line key={x} x1={x} y1="248" x2={x} y2="256" stroke={GOLD} strokeWidth="1.2" />
        ))}
        <path d="M 280 268 C 293 268 298 273 298 281" fill="none" stroke={GOLD} strokeWidth="2" />
        <circle cx="298" cy="288" r="10" fill="none" stroke={GOLD} strokeWidth="2" />
        <line x1="200" y1="306" x2="270" y2="306" stroke={GOLD} strokeWidth="1.2" />
      </Part>

      {/* ---- transaxle + driveshaft ---- */}
      <Part progress={progress} window={win("trans")} from={{ x: 560 }}>
        <rect x="284" y="296" width="368" height="7" rx="3" fill="none" stroke={GOLD} strokeWidth="1.5" />
        {[400, 520].map((x) => (
          <line key={x} x1={x} y1="294" x2={x} y2="305" stroke={GOLD} strokeWidth="1.5" />
        ))}
        <rect x="652" y="276" width="92" height="40" rx="7" fill="rgba(201,165,92,0.07)" stroke={GOLD} strokeWidth="2" />
        {[674, 694, 714].map((x) => (
          <line key={x} x1={x} y1="282" x2={x} y2="310" stroke={GOLD} strokeWidth="1.2" />
        ))}
      </Part>

      {/* ---- suspension ---- */}
      <Part progress={progress} window={win("susp")} from={{ y: 280 }}>
        {[260, 740].map((wx) => {
          const inward = wx < 500 ? 1 : -1;
          return (
            <g key={wx}>
              <rect x={wx - 11} y="240" width="22" height="6" rx="2" fill="none" stroke={GOLD} strokeWidth="1.5" />
              <line x1={wx} y1="246" x2={wx} y2="300" stroke={GOLD} strokeWidth="2" />
              <polyline
                points={`${wx - 9},252 ${wx + 9},258 ${wx - 9},264 ${wx + 9},270 ${wx - 9},276 ${wx + 9},282 ${wx - 9},288`}
                fill="none"
                stroke={GOLD_BRIGHT}
                strokeWidth="1.8"
              />
              <circle cx={wx} cy="304" r="7" fill="none" stroke={GOLD} strokeWidth="2" />
              <line x1={wx + 6 * inward} y1="306" x2={wx + 82 * inward} y2="318" stroke={GOLD} strokeWidth="2" />
            </g>
          );
        })}
      </Part>

      {/* ---- exhaust ---- */}
      <Part progress={progress} window={win("exhaust")} from={{ x: 420, y: 100 }}>
        <path d="M 700 318 L 758 332" fill="none" stroke={GOLD} strokeWidth="2" />
        <rect x="758" y="326" width="70" height="15" rx="7" fill="rgba(201,165,92,0.07)" stroke={GOLD} strokeWidth="1.8" />
        <rect x="828" y="328" width="34" height="11" rx="5" fill="none" stroke={GOLD_BRIGHT} strokeWidth="1.8" />
      </Part>

      {/* ---- wheels ---- */}
      <Wheel progress={progress} window={win("wheels")} cx={260} fromX={-700} />
      <Wheel progress={progress} window={win("wheels")} cx={740} fromX={700} />

      {/* ---- body shell ---- */}
      <Part progress={progress} window={win("body")} from={{ y: -360 }}>
        <motion.path
          d="M 82 326
             C 68 308 66 288 76 270
             C 88 252 130 248 188 244
             C 252 238 310 234 338 230
             C 372 224 392 200 425 188
             C 458 176 530 173 572 178
             C 620 184 660 200 700 214
             C 745 226 800 228 845 228
             C 872 230 888 248 886 270
             C 884 298 880 316 870 326
             L 812 326
             A 72 72 0 0 0 668 326
             L 332 326
             A 72 72 0 0 0 188 326
             L 82 326 Z"
          fill="url(#bodyGrad)"
          stroke={IVORY}
          strokeWidth="2.2"
          strokeLinejoin="round"
          style={{ fillOpacity: bodyFill }}
        />
        {/* greenhouse */}
        <motion.path
          d="M 426 193
             C 462 179 540 176 578 181
             C 616 188 650 203 678 214
             C 626 221 498 221 448 212
             C 439 206 431 199 426 193 Z"
          fill={GOLD_BRIGHT}
          stroke="rgba(232,226,210,0.55)"
          strokeWidth="1.2"
          style={{ fillOpacity: glassFill }}
        />
        <path d="M 470 184 L 480 210" stroke="rgba(232,226,210,0.4)" strokeWidth="1.2" />
        {/* door seams */}
        <path d="M 470 214 C 468 252 466 290 470 322" fill="none" stroke="rgba(232,226,210,0.28)" strokeWidth="1.2" />
        <path d="M 642 212 C 644 250 645 288 647 320" fill="none" stroke="rgba(232,226,210,0.28)" strokeWidth="1.2" />
        <line x1="590" y1="232" x2="616" y2="230" stroke="rgba(232,226,210,0.5)" strokeWidth="2" />
        {/* headlight */}
        <path d="M 92 258 C 112 251 138 248 160 247 C 142 258 116 263 98 265 Z" fill="rgba(227,194,126,0.35)" stroke={GOLD_BRIGHT} strokeWidth="1.2" />
        {/* front intake */}
        <path d="M 76 296 C 92 303 112 306 134 306" fill="none" stroke="rgba(232,226,210,0.4)" strokeWidth="1.5" />
        {/* taillight */}
        <rect x="856" y="244" width="26" height="13" rx="5" fill="rgba(227,194,126,0.25)" stroke={GOLD_BRIGHT} strokeWidth="1.2" />
      </Part>

      {/* ---- rear wing ---- */}
      <Part progress={progress} window={win("wing")} from={{ x: 90, y: -240 }}>
        <path d="M 768 198 C 802 191 860 189 906 193 L 906 201 C 860 197 802 199 772 206 Z" fill="rgba(201,165,92,0.2)" stroke={GOLD_BRIGHT} strokeWidth="1.6" />
        <line x1="800" y1="201" x2="806" y2="228" stroke={GOLD_BRIGHT} strokeWidth="2" />
        <line x1="868" y1="197" x2="874" y2="228" stroke={GOLD_BRIGHT} strokeWidth="2" />
      </Part>
    </svg>
  );
}

export default function Assembly() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const headOpacity = useTransform(scrollYProgress, [0.01, 0.08, 0.72, 0.82], [0, 1, 1, 0.25]);
  const headY = useTransform(scrollYProgress, [0.01, 0.1], [40, 0]);
  const sceneScale = useTransform(scrollYProgress, [0.8, 1], [1, 1.05]);
  const glow = useTransform(scrollYProgress, [0.72, 0.9], [0, 1]);
  const captionOpacity = useTransform(scrollYProgress, [0.82, 0.92], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.82, 0.94], [36, 0]);
  const lineScale = useTransform(scrollYProgress, [0.84, 0.96], [0, 1]);

  return (
    <section id="atelier" ref={ref} style={{ height: "460vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse 60% 45% at 50% 55%, rgba(201,165,92,0.07), transparent 70%), var(--bg)",
        }}
      >
        {/* heading */}
        <motion.div
          style={{
            opacity: headOpacity,
            y: headY,
            textAlign: "center",
            marginBottom: "2.5vh",
            padding: "0 6vw",
            zIndex: 3,
          }}
        >
          <p className="kicker" style={{ justifyContent: "center" }}>
            The Atelier
          </p>
          <h2
            className="h-display"
            style={{ fontSize: "clamp(30px, 4.6vw, 58px)", marginTop: 18 }}
          >
            A thousand parts. <em>One obsession.</em>
          </h2>
        </motion.div>

        {/* build scene */}
        <motion.div
          style={{
            position: "relative",
            width: "min(84vw, 1020px)",
            scale: sceneScale,
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              inset: "-14%",
              opacity: glow,
              background:
                "radial-gradient(ellipse 60% 55% at 50% 62%, rgba(201,165,92,0.2), transparent 70%)",
              filter: "blur(10px)",
              pointerEvents: "none",
            }}
          />
          <CarBuild progress={scrollYProgress} />
        </motion.div>

        {/* rotating stage captions */}
        <div style={{ position: "relative", height: 64, width: "100%", marginTop: "1.5vh" }}>
          {STAGES.map((s) => (
            <StageLabel key={s.key} progress={scrollYProgress} window={s.win} title={s.title} spec={s.spec} />
          ))}

          {/* final caption after assembly */}
          <motion.div
            style={{
              opacity: captionOpacity,
              y: captionY,
              position: "absolute",
              inset: "0 0 auto 0",
              textAlign: "center",
              zIndex: 3,
            }}
          >
            <motion.div
              style={{
                scaleX: lineScale,
                height: 1,
                width: 220,
                margin: "0 auto 16px",
                background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
              }}
            />
            <p
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "clamp(16px, 2vw, 22px)",
                color: "var(--text-dim)",
              }}
            >
              Nissan GT-R NISMO — precision, assembled.
            </p>
            <div
              style={{
                display: "flex",
                gap: 48,
                justifyContent: "center",
                marginTop: 18,
                flexWrap: "wrap",
              }}
            >
              {[
                ["600", "HP"],
                ["2.5s", "0–100 km/h"],
                ["315", "km/h top speed"],
              ].map(([v, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: "clamp(20px, 2.4vw, 28px)",
                      color: "var(--gold-bright)",
                    }}
                  >
                    {v}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "var(--text-faint)",
                      marginTop: 4,
                    }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
