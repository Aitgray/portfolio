import "./globals.css";
import Link from "next/link";
import TriBackground from "@/components/TriBackground";

export const metadata = {
  title: "Aidan Gray – Portfolio",
  description: "Projects, writing, and contact links.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Reserve space for fixed footer using a CSS var */}
      <body
        className="min-h-screen antialiased"
        style={{ position: "relative", isolation: "isolate", paddingBottom: "var(--footer-h)" }}
      >
        {/* Background */}
        <TriBackground />

        {/* Top bar */}
        <header
          className="border-b"
          style={{
            position: "fixed",
            insetInlineStart: 0,
            insetInlineEnd: 0,
            top: 0,
            zIndex: 50,
            background: "var(--surface, rgba(255,255,255,0.8))",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            style={{
              maxWidth: 1152,
              margin: "0 auto",
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 16px",
            }}
          >
            <Link href="/" style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
              Home
            </Link>

            <nav style={{ display: "flex", height: "100%", gap: 8 }}>
              <Link href="/about" style={{ display: "flex", alignItems: "center", padding: "0 16px" }}>
                About
              </Link>
              <Link href="/projects" style={{ display: "flex", alignItems: "center", padding: "0 16px" }}>
                Projects
              </Link>

              {/* Resume — opens PDF in a new tab */}
              <Link
                href="/Aidan Gray Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                title="Open resume as PDF in a new tab"
                style={{ display: "flex", alignItems: "center", padding: "0 16px", gap: 6 }}
              >
                <span>Resume (PDF)</span>
                <span aria-hidden>↗</span>
              </Link>
            </nav>
          </div>
        </header>

        {/* Content */}
        <main style={{ position: "relative", zIndex: 40, maxWidth: 1152, margin: "0 auto", padding: "80px 16px 64px" }}>
          {children}
        </main>

        {/* FIXED bottom banner */}
        <footer
          className="footer-banner"
          style={{
            position: "fixed",
            insetInlineStart: 0,
            insetInlineEnd: 0,
            bottom: 0,
            height: "var(--footer-h)",
            zIndex: 45,
          }}
        >
          <div
            style={{
              maxWidth: 1152,
              margin: "0 auto",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              padding: "0 16px",
            }}
          >
            <div style={{ fontSize: 14 }}>
              © {new Date().getFullYear()} Aidan Gray. All rights reserved.
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              {/* GitHub */}
              <a
                className="icon-btn"
                href="https://github.com/Aitgray"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
              >
                <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true" focusable="false">
                  <path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.8-.25.8-.56v-2.18c-3.26.71-3.95-1.57-3.95-1.57-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.22 1.79 1.22 1.04 1.78 2.73 1.26 3.4.97.11-.76.41-1.26.75-1.55-2.6-.3-5.35-1.3-5.35-5.8 0-1.28.46-2.33 1.22-3.15-.12-.3-.53-1.53.12-3.18 0 0 1-.32 3.28 1.2a11.36 11.36 0 0 1 5.98 0c2.27-1.52 3.27-1.2 3.27-1.2.65 1.65.24 2.88.12 3.18.76.82 1.21 1.87 1.21 3.15 0 4.51-2.75 5.5-5.37 5.8.42.36.8 1.06.8 2.14v3.18c0 .31.21.67.81.56A11.5 11.5 0 0 0 12 .5Z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                className="icon-btn"
                href="https://www.linkedin.com/in/aidantgray/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true" focusable="false">
                  <path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.41v1.56h.05c.47-.9 1.62-1.85 3.34-1.85 3.58 0 4.24 2.36 4.24 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
