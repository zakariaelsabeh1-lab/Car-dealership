import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const CAR_IMG =
  "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1800&q=80";

const COLS = 8;
const ROWS = 5;
const TOTAL = COLS * ROWS;

// deterministic pseudo-random, stable across renders
const rand = (i, salt) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

function useImageStatus(src) {
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    const img = new Image();
    img.onload = () => setStatus("ok");
    img.onerror = () => setStatus("error");
    img.src = src;
  }, [src]);
  return status;
}

function Fragment({ progress, index, imgOk }) {
  const col = index % COLS;
  const row = Math.floor(index / COLS);

  // each shard settles on its own schedule for an organic feel
  const start = 0.06 + rand(index, 9) * 0.18;
  const end = Math.min(start + 0.34 + rand(index, 5) * 0.18, 0.82);

  const scatterX = (rand(index, 1) - 0.5) * 1500;
  const scatterY = (rand(index, 2) - 0.5) * 950;
  const scatterRot = (rand(index, 3) - 0.5) * 200;
  const scatterScale = 0.35 + rand(index, 4) * 1.3;

  const x = useTransform(progress, [start, end], [scatterX, 0]);
  const y = useTransform(progress, [start, end], [scatterY, 0]);
  const rotate = useTransform(progress, [start, end], [scatterRot, 0]);
  const scale = useTransform(progress, [start, end], [scatterScale, 1]);
  const opacity = useTransform(progress, [start, start + 0.12], [0, 1]);

  const goldShard = `linear-gradient(${135 + rand(index, 6) * 90}deg,
    rgba(${30 + rand(index, 7) * 25}, ${30 + rand(index, 7) * 22}, ${36 + rand(index, 7) * 18}, 1),
    rgba(${60 + rand(index, 8) * 60}, ${50 + rand(index, 8) * 45}, ${30 + rand(index, 8) * 25}, 1))`;

  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${(col / COLS) * 100}%`,
        top: `${(row / ROWS) * 100}%`,
        width: `${100 / COLS}%`,
        height: `${100 / ROWS}%`,
        x,
        y,
        rotate,
        scale,
        opacity,
        willChange: "transform, opacity",
        backgroundImage: imgOk ? `url(${CAR_IMG})` : goldShard,
        backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
        backgroundPosition: `${(col / (COLS - 1)) * 100}% ${(row / (ROWS - 1)) * 100}%`,
      }}
    />
  );
}

export default function Assembly() {
  const ref = useRef(null);
  const imgStatus = useImageStatus(CAR_IMG);
  const imgOk = imgStatus !== "error";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const headOpacity = useTransform(scrollYProgress, [0.01, 0.08, 0.7, 0.8], [0, 1, 1, 0.25]);
  const headY = useTransform(scrollYProgress, [0.01, 0.1], [40, 0]);
  const frameScale = useTransform(scrollYProgress, [0.8, 1], [1, 1.045]);
  const frameGlow = useTransform(scrollYProgress, [0.72, 0.9], [0, 1]);
  const captionOpacity = useTransform(scrollYProgress, [0.82, 0.92], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.82, 0.94], [36, 0]);
  const lineScale = useTransform(scrollYProgress, [0.84, 0.96], [0, 1]);

  return (
    <section id="atelier" ref={ref} style={{ height: "420vh", position: "relative" }}>
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
            marginBottom: "4.5vh",
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

        {/* assembly canvas */}
        <motion.div
          style={{
            position: "relative",
            width: "min(78vw, 1060px)",
            aspectRatio: "16 / 9",
            scale: frameScale,
          }}
        >
          {/* gold aura behind the assembled car */}
          <motion.div
            style={{
              position: "absolute",
              inset: "-12%",
              opacity: frameGlow,
              background:
                "radial-gradient(ellipse 60% 55% at 50% 60%, rgba(201,165,92,0.22), transparent 70%)",
              filter: "blur(8px)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "absolute", inset: 0 }}>
            {Array.from({ length: TOTAL }, (_, i) => (
              <Fragment key={i} progress={scrollYProgress} index={i} imgOk={imgOk} />
            ))}
          </div>
          {/* cinematic frame edges */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              opacity: frameGlow,
              boxShadow: "inset 0 0 90px 8px rgba(10,10,12,0.55)",
              border: "1px solid rgba(201,165,92,0.25)",
              pointerEvents: "none",
            }}
          />
        </motion.div>

        {/* caption after assembly */}
        <motion.div
          style={{
            opacity: captionOpacity,
            y: captionY,
            textAlign: "center",
            marginTop: "4.5vh",
            zIndex: 3,
          }}
        >
          <motion.div
            style={{
              scaleX: lineScale,
              height: 1,
              width: 220,
              margin: "0 auto 18px",
              background:
                "linear-gradient(90deg, transparent, var(--gold), transparent)",
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
              marginTop: 22,
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
                    fontSize: "clamp(22px, 2.6vw, 32px)",
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
                    marginTop: 6,
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
