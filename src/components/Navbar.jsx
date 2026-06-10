import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Collection", href: "#collection" },
  { label: "Atelier", href: "#atelier" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease",
        background: scrolled ? "rgba(10, 10, 12, 0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: `1px solid ${scrolled ? "rgba(201,165,92,0.14)" : "transparent"}`,
      }}
    >
      <nav
        className="wrap"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 78,
        }}
      >
        <a href="#top" style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: 26,
              letterSpacing: "0.02em",
            }}
          >
            Velocità
          </span>
          <span style={{ width: 5, height: 5, background: "var(--gold)", borderRadius: "50%" }} />
        </a>

        <ul
          className="nav-links"
          style={{ display: "flex", gap: 42, listStyle: "none", alignItems: "center" }}
        >
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--text-dim)",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-bright)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn btn-ghost" style={{ padding: "11px 22px", fontSize: 10 }}>
          Book a Viewing
        </a>
      </nav>

      <style>{`
        @media (max-width: 880px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </motion.header>
  );
}
