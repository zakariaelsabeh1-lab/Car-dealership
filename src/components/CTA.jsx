import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const CTA_IMG =
  "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=2000&q=80";

export default function CTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "170px 0",
        borderTop: "1px solid var(--line-soft)",
      }}
    >
      <motion.div style={{ position: "absolute", inset: "-15% 0", y: bgY }}>
        <img
          src={CTA_IMG}
          alt=""
          onError={(e) => (e.currentTarget.style.display = "none")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.28,
            filter: "saturate(0.7)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(10,10,12,0.5), rgba(10,10,12,0.95))",
          }}
        />
      </motion.div>

      <div className="wrap" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <motion.p
          className="kicker"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ justifyContent: "center" }}
        >
          By Appointment Only
        </motion.p>
        <motion.h2
          className="h-display"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(36px, 5.6vw, 72px)",
            margin: "24px auto 22px",
            maxWidth: 820,
          }}
        >
          Your next chapter begins <em>behind the wheel.</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            color: "var(--text-dim)",
            maxWidth: 520,
            margin: "0 auto 48px",
            lineHeight: 1.8,
            fontSize: 16,
          }}
        >
          Reserve a private viewing at our flagship atelier. Espresso is on us;
          the keys are on the table.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap" }}
        >
          <a href="mailto:concierge@velocita.example" className="btn btn-gold">
            Book a Private Viewing
          </a>
          <a href="tel:+10000000000" className="btn btn-ghost">
            Call the Concierge
          </a>
        </motion.div>
      </div>
    </section>
  );
}
