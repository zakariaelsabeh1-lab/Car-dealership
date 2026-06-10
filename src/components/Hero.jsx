import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HERO_IMG =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=80";

const word = "VELOCITÀ".split("");

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);

  return (
    <section
      id="top"
      ref={ref}
      style={{
        position: "relative",
        height: "100svh",
        minHeight: 640,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* backdrop */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-12% 0",
          y: bgY,
          background:
            "radial-gradient(ellipse 70% 55% at 50% 60%, rgba(201,165,92,0.13), transparent 65%), linear-gradient(180deg, #0a0a0c 0%, #131318 55%, #0a0a0c 100%)",
        }}
      >
        <img
          src={HERO_IMG}
          alt=""
          onError={(e) => (e.currentTarget.style.display = "none")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.5,
            filter: "saturate(0.85) contrast(1.05)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,10,12,0.72) 0%, rgba(10,10,12,0.35) 45%, rgba(10,10,12,0.95) 100%)",
          }}
        />
      </motion.div>

      {/* content */}
      <motion.div
        className="wrap"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          opacity: fade,
          y: textY,
        }}
      >
        <motion.p
          className="kicker"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ justifyContent: "center" }}
        >
          Luxury Automotive Atelier
        </motion.p>

        <h1
          aria-label="Velocità"
          style={{
            fontFamily: "var(--serif)",
            fontWeight: 500,
            fontSize: "clamp(64px, 13vw, 188px)",
            lineHeight: 1,
            margin: "26px 0 8px",
            letterSpacing: "0.02em",
            display: "flex",
            justifyContent: "center",
            overflow: "hidden",
            paddingBottom: "0.08em",
          }}
        >
          {word.map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: "110%", rotate: 4, opacity: 0 }}
              animate={{ y: 0, rotate: 0, opacity: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.35 + i * 0.065,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                display: "inline-block",
                background:
                  "linear-gradient(180deg, #f7f3e9 30%, #cdbf9f 75%, #9a8a63 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {ch}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "clamp(17px, 2.2vw, 24px)",
            color: "var(--text-dim)",
            maxWidth: 620,
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          Where engineering becomes art. Curated performance machines,
          delivered with ceremony.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            gap: 18,
            justifyContent: "center",
            marginTop: 44,
            flexWrap: "wrap",
          }}
        >
          <a href="#collection" className="btn btn-gold">
            Explore the Collection
          </a>
          <a href="#atelier" className="btn btn-ghost">
            The Atelier
          </a>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: "absolute",
          bottom: 34,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 9,
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "var(--text-faint)",
          }}
        >
          Scroll
        </span>
        <motion.span
          animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 1,
            height: 52,
            background: "linear-gradient(180deg, var(--gold), transparent)",
            display: "block",
          }}
        />
      </motion.div>
    </section>
  );
}
