import { Bebas_Neue } from "next/font/google";

const display = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <section className="relative z-10">
      <div className="mx-auto max-w-6xl px-4">
        {/* Center the pair in the viewport (accounts for fixed header + footer) */}
        <div
          style={{
            minHeight: "calc(100vh - 80px - var(--footer-h, 56px))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Hard two-column row; will wrap only if truly too narrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "3rem",
              flexWrap: "nowrap",
              width: "100%",
            }}
          >
            {/* LEFT — Name (kept exactly; forced stacking via display:block on each line) */}
            <div style={{ minWidth: 0 }}>
              <h1 className={`${display.className} leading-none`} style={{ textAlign: "left" }}>
                <span
                  className="tracking-tight bg-gradient-to-b from-[var(--c5)] via-[var(--c4)] to-[var(--c3)] text-transparent bg-clip-text"
                  style={{
                    display: "block",
                    fontSize: "clamp(3.5rem, 12vw, 9.5rem)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Hi! I'm
                </span>
                <span
                  className="tracking-tight bg-gradient-to-b from-[var(--c5)] via-[var(--c4)] to-[var(--c3)] text-transparent bg-clip-text"
                  style={{
                    display: "block",
                    fontSize: "clamp(13.5rem, 12vw, 9.5rem)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Aidan Gray
                </span>
              </h1>
            </div>

            {/* RIGHT — Mission statement (rounded like projects, more opaque) */}
            <article
              className="project"
              style={{
                background: "rgba(var(--surface-rgb), 0.7)",
                padding: "1.2rem",
                width: "clamp(360px, 42vw, 680px)", // grows/shrinks but stays reasonable
              }}
            >
              <p style={{ fontSize: "clamp(1.125rem, 2vw, 1.25rem)", textAlign: "center" }}>
                I build practical systems with clean interfaces and lean infrastructure, using ML where it adds
                real value. My focus is reliability, speed, and keeping things inexpensive to run.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
