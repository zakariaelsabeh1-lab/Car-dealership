import { motion } from "framer-motion";

const cars = [
  {
    name: "Nissan GT-R NISMO",
    year: "2024",
    specs: ["600 HP", "AWD", "V6 Twin-Turbo"],
    price: "$221,000",
    img: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80",
    tone: "linear-gradient(135deg, #1a1a20, #2c2418)",
  },
  {
    name: "Porsche 911 Turbo S",
    year: "2024",
    specs: ["640 HP", "AWD", "Flat-6 Twin-Turbo"],
    price: "$248,000",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    tone: "linear-gradient(135deg, #16161c, #232c33)",
  },
  {
    name: "Lamborghini Huracán EVO",
    year: "2023",
    specs: ["631 HP", "AWD", "V10 N/A"],
    price: "$287,000",
    img: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1200&q=80",
    tone: "linear-gradient(135deg, #1c1a14, #30240f)",
  },
  {
    name: "BMW M4 Competition",
    year: "2024",
    specs: ["503 HP", "RWD", "Inline-6 Twin-Turbo"],
    price: "$92,400",
    img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
    tone: "linear-gradient(135deg, #14161e, #1b2436)",
  },
  {
    name: "Ferrari 488 GTB",
    year: "2022",
    specs: ["661 HP", "RWD", "V8 Twin-Turbo"],
    price: "$334,000",
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
    tone: "linear-gradient(135deg, #1e1414, #321414)",
  },
  {
    name: "Ford Mustang GT500",
    year: "2023",
    specs: ["760 HP", "RWD", "V8 Supercharged"],
    price: "$108,000",
    img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
    tone: "linear-gradient(135deg, #1c1712, #2e2008)",
  },
];

function Card({ car, i }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: (i % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10 }}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--line-soft)",
        borderRadius: 4,
        overflow: "hidden",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(201,165,92,0.35)";
        e.currentTarget.style.boxShadow = "0 30px 60px -30px rgba(0,0,0,0.8)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--line-soft)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 10",
          overflow: "hidden",
          background: car.tone,
        }}
      >
        <motion.img
          src={car.img}
          alt={car.name}
          loading="lazy"
          onError={(e) => (e.currentTarget.style.display = "none")}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, transparent 55%, rgba(10,10,12,0.65) 100%)",
            pointerEvents: "none",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--gold-bright)",
            background: "rgba(10,10,12,0.66)",
            backdropFilter: "blur(8px)",
            padding: "7px 13px",
            borderRadius: 2,
            border: "1px solid rgba(201,165,92,0.25)",
          }}
        >
          {car.year}
        </span>
      </div>

      <div style={{ padding: "26px 26px 28px" }}>
        <h3
          style={{
            fontFamily: "var(--serif)",
            fontWeight: 500,
            fontSize: 23,
            marginBottom: 12,
          }}
        >
          {car.name}
        </h3>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
          {car.specs.map((s) => (
            <span
              key={s}
              style={{
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--text-dim)",
                border: "1px solid var(--line-soft)",
                padding: "6px 11px",
                borderRadius: 2,
              }}
            >
              {s}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid var(--line-soft)",
            paddingTop: 20,
          }}
        >
          <span style={{ fontFamily: "var(--serif)", fontSize: 22, color: "var(--gold-bright)" }}>
            {car.price}
          </span>
          <a
            href="#contact"
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "var(--text)",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "color 0.3s, gap 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--gold-bright)";
              e.currentTarget.style.gap = "14px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text)";
              e.currentTarget.style.gap = "8px";
            }}
          >
            Enquire <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Showcase() {
  return (
    <section id="collection" style={{ padding: "140px 0 120px", background: "var(--bg)" }}>
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
            marginBottom: 64,
          }}
        >
          <div>
            <p className="kicker">The Collection</p>
            <h2 className="h-display" style={{ fontSize: "clamp(34px, 5vw, 62px)", marginTop: 18 }}>
              Curated. <em>Never common.</em>
            </h2>
          </div>
          <p style={{ maxWidth: 380, color: "var(--text-dim)", lineHeight: 1.8, fontSize: 15 }}>
            Every machine in our showroom is hand-selected, provenance-verified
            and prepared to concours standard before it ever meets your eyes.
          </p>
        </motion.div>

        <div
          className="showcase-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 28,
          }}
        >
          {cars.map((car, i) => (
            <Card key={car.name} car={car} i={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1020px) {
          .showcase-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .showcase-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
