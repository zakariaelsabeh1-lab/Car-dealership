export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--line)",
        background: "var(--bg-soft)",
        padding: "72px 0 36px",
      }}
    >
      <div
        className="wrap footer-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 48,
          marginBottom: 64,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 18 }}>
            <span
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: 28,
              }}
            >
              Velocità
            </span>
            <span style={{ width: 5, height: 5, background: "var(--gold)", borderRadius: "50%" }} />
          </div>
          <p style={{ color: "var(--text-dim)", lineHeight: 1.8, fontSize: 14, maxWidth: 320 }}>
            A luxury automotive atelier. Curated performance machines,
            provenance-verified and delivered with ceremony.
          </p>
        </div>

        {[
          {
            title: "Visit",
            lines: ["88 Corso Meccanica", "Milano District", "Open by appointment"],
          },
          {
            title: "Contact",
            lines: ["concierge@velocita.example", "+1 (000) 000-0000"],
          },
          {
            title: "Follow",
            lines: ["Instagram", "YouTube", "LinkedIn"],
          },
        ].map((col) => (
          <div key={col.title}>
            <h4
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: 20,
              }}
            >
              {col.title}
            </h4>
            {col.lines.map((line) => (
              <p
                key={line}
                style={{ color: "var(--text-dim)", fontSize: 14, lineHeight: 2.1 }}
              >
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div
        className="wrap"
        style={{
          borderTop: "1px solid var(--line-soft)",
          paddingTop: 28,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 12, color: "var(--text-faint)" }}>
          © 2026 Velocità Automotive Atelier. A demo experience.
        </span>
        <span style={{ fontSize: 12, color: "var(--text-faint)" }}>
          Designed for the road ahead.
        </span>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
