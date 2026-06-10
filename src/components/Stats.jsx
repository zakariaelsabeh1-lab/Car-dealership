import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const stats = [
  { value: 1200, suffix: "+", label: "Cars delivered" },
  { value: 28, suffix: "", label: "Years of excellence" },
  { value: 99.6, suffix: "%", label: "Client satisfaction", decimals: 1 },
  { value: 4, suffix: "", label: "Private showrooms" },
];

function Counter({ value, suffix, decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) =>
        setDisplay(
          v.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        ),
    });
    return () => controls.stop();
  }, [inView, value, decimals]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section
      style={{
        borderTop: "1px solid var(--line-soft)",
        borderBottom: "1px solid var(--line-soft)",
        background:
          "radial-gradient(ellipse 50% 90% at 50% 50%, rgba(201,165,92,0.06), transparent 70%), var(--bg-soft)",
        padding: "92px 0",
      }}
    >
      <div
        className="wrap stats-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 40,
        }}
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: "center" }}
          >
            <div
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(40px, 5vw, 60px)",
                fontWeight: 500,
                color: "var(--gold-bright)",
                lineHeight: 1,
              }}
            >
              <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
            </div>
            <div
              style={{
                marginTop: 14,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--text-dim)",
              }}
            >
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 880px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
