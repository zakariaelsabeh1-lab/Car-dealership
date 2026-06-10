import { motion } from "framer-motion";

const items = [
  {
    n: "01",
    title: "Private Viewings",
    body: "Your appointment, your showroom. Each viewing is exclusive — one client, one machine, no interruptions.",
  },
  {
    n: "02",
    title: "Provenance Verified",
    body: "Full history, ownership chain and factory documentation, independently authenticated before listing.",
  },
  {
    n: "03",
    title: "Bespoke Financing",
    body: "Discreet, tailored structures — from classic financing to collection-backed lending arrangements.",
  },
  {
    n: "04",
    title: "White-Glove Delivery",
    body: "Enclosed transport to your door, anywhere in the world, with a ceremonial handover worthy of the car.",
  },
];

export default function Experience() {
  return (
    <section id="experience" style={{ padding: "140px 0", background: "var(--bg)" }}>
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: 72 }}
        >
          <p className="kicker" style={{ justifyContent: "center" }}>
            The Experience
          </p>
          <h2 className="h-display" style={{ fontSize: "clamp(34px, 5vw, 62px)", marginTop: 18 }}>
            Bought like an asset.
            <br />
            <em>Delivered like a gift.</em>
          </h2>
        </motion.div>

        <div
          className="exp-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            borderTop: "1px solid var(--line-soft)",
            borderLeft: "1px solid var(--line-soft)",
          }}
        >
          {items.map((item, i) => (
            <motion.div
              key={item.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: "44px 34px 48px",
                borderRight: "1px solid var(--line-soft)",
                borderBottom: "1px solid var(--line-soft)",
                background: "transparent",
                transition: "background 0.5s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(201,165,92,0.045)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: 15,
                  color: "var(--gold)",
                  marginBottom: 26,
                }}
              >
                {item.n}
              </div>
              <h3
                style={{
                  fontFamily: "var(--serif)",
                  fontWeight: 500,
                  fontSize: 22,
                  marginBottom: 16,
                }}
              >
                {item.title}
              </h3>
              <p style={{ color: "var(--text-dim)", lineHeight: 1.8, fontSize: 14 }}>{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1020px) {
          .exp-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .exp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
