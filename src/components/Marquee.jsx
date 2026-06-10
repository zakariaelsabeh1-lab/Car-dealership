const marques = [
  "Nissan GT-R",
  "Porsche",
  "Lamborghini",
  "Ferrari",
  "Aston Martin",
  "McLaren",
  "Bentley",
  "Maserati",
];

export default function Marquee() {
  const row = [...marques, ...marques];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((half) => (
          <div key={half} style={{ display: "flex" }}>
            {row.map((m, i) => (
              <span className="marquee-item" key={`${half}-${i}`}>
                {m}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
