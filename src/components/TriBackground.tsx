"use client";

import { useEffect, useMemo, useState } from "react";

type Pt = { x: number; y: number };
type Tri = [Pt, Pt, Pt];

function hexToRgb(hex: string) {
  const h = hex.replace("#", "").trim();
  const v = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
  const n = parseInt(v, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
function rgbToHex(r: number, g: number, b: number) {
  const to = (n: number) => n.toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
function lerpHex(a: string, b: string, t: number) {
  const A = hexToRgb(a), B = hexToRgb(b);
  return rgbToHex(
    Math.round(lerp(A.r, B.r, t)),
    Math.round(lerp(A.g, B.g, t)),
    Math.round(lerp(A.b, B.b, t))
  );
}
function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export default function TriBackground() {
  // Viewport-only sizing so background never pushes layout
  const [vw, setVw] = useState(1280);
  const [vh, setVh] = useState(720);
  const [palette, setPalette] = useState<string[]>(["#AAA9AD", "#848689", "#5B676D", "#2A3439", "#1F262A"]);

  useEffect(() => {
    const update = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    const readPalette = () => {
      const s = getComputedStyle(document.documentElement);
      const p = ["--c1", "--c2", "--c3", "--c4", "--c5"].map(v => s.getPropertyValue(v).trim());
      if (p.every(Boolean)) setPalette(p);
    };
    update();
    readPalette();
    window.addEventListener("resize", update);

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onTheme = () => readPalette();
    mql.addEventListener?.("change", onTheme);

    return () => {
      window.removeEventListener("resize", update);
      mql.removeEventListener?.("change", onTheme);
    };
  }, []);

  const overscan = 200; // generous overscan
  const W = vw + overscan * 2;
  const H = vh + overscan * 2;

  const { tris, pts, edges, viewBox } = useMemo(() => {
    const rng = mulberry32(42);
    const cell = 110; // density
    const cols = Math.max(8, Math.ceil(W / cell));
    const rows = Math.max(8, Math.ceil(H / cell));

    const points: Pt[] = [];
    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        const xBase = (c / cols) * W - overscan;
        const yBase = (r / rows) * H - overscan;

        const edgeCol = c === 0 || c === cols;
        const edgeRow = r === 0 || r === rows;

        // Clamp outer ring exactly on the boundary; jitter only inside
        let x = edgeCol ? (c === 0 ? -overscan : vw + overscan) : xBase + (rng() - 0.5) * (W / cols) * 0.6;
        let y = edgeRow ? (r === 0 ? -overscan : vh + overscan) : yBase + (rng() - 0.5) * (H / rows) * 0.6;

        points.push({ x, y });
      }
    }
    const idx = (rr: number, cc: number) => rr * (cols + 1) + cc;

    const triangles: Tri[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const p00 = points[idx(r, c)];
        const p10 = points[idx(r, c + 1)];
        const p01 = points[idx(r + 1, c)];
        const p11 = points[idx(r + 1, c + 1)];
        const flip = (r + c) % 2 === 0;
        if (flip) triangles.push([p00, p10, p11], [p00, p11, p01]);
        else      triangles.push([p00, p10, p01], [p10, p11, p01]);
      }
    }

    // Build a unique edge set for wireframe lines
    const edgeKey = (a: Pt, b: Pt) => {
      const k = (p: Pt) => `${Math.round(p.x * 10) / 10},${Math.round(p.y * 10) / 10}`;
      const k1 = k(a), k2 = k(b);
      return k1 < k2 ? `${k1}|${k2}` : `${k2}|${k1}`;
    };
    const edgeSet = new Set<string>();
    const edgesArr: Array<[Pt, Pt]> = [];
    for (const [a, b, c] of triangles) {
      const pairs: Array<[Pt, Pt]> = [[a, b], [b, c], [c, a]];
      for (const [p, q] of pairs) {
        const key = edgeKey(p, q);
        if (!edgeSet.has(key)) {
          edgeSet.add(key);
          edgesArr.push([p, q]);
        }
      }
    }

    return {
      tris: triangles,
      pts: points,
      edges: edgesArr,
      viewBox: `${-overscan} ${-overscan} ${vw + overscan * 2} ${vh + overscan * 2}`,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vw, vh]);

  // Triangle fills (vertical gradient across palette)
  const fills = useMemo(() => {
    return tris.map((t) => {
      const avgY = (t[0].y + t[1].y + t[2].y) / 3 + overscan;
      const tt = Math.min(1, Math.max(0, avgY / vh));
      const band = Math.floor(tt * (palette.length - 1));
      const bandT = (tt * (palette.length - 1)) - band;
      return lerpHex(palette[band], palette[Math.min(palette.length - 1, band + 1)], bandT);
    });
  }, [tris, palette, vh]);

  return (
    // Inline styles guarantee layering even if Tailwind isn't running
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <svg
        viewBox={viewBox}
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        aria-hidden="true"
        style={{ display: "block" }}
      >
        {/* Full gradient underlay to ensure NO transparent band */}
        <defs>
          <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
            {palette.map((c, i) => (
              <stop key={i} offset={`${(i / (palette.length - 1)) * 100}%`} stopColor={c} />
            ))}
          </linearGradient>
        </defs>
        <rect x={-overscan} y={-overscan} width={vw + overscan * 2} height={vh + overscan * 2} fill="url(#bgGrad)" />

        {/* Faceted triangles: fill + tiny same-color stroke to hide anti-alias seams */}
        {tris.map((t, i) => (
          <polygon
            key={i}
            points={t.map(p => `${p.x},${p.y}`).join(" ")}
            fill={fills[i]}
            stroke={fills[i]}
            strokeWidth={0.5}
            vectorEffect="non-scaling-stroke"
            opacity={0.34}
            shapeRendering="geometricPrecision"
            strokeLinejoin="round"
          />
        ))}

        {/* Wireframe lines */}
        <g>
          {edges.map(([a, b], i) => (
            <line
              key={i}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="#000"
              strokeOpacity={0.3}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        {/* Black vertex dots */}
        <g>
          {pts.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={0.6}
              fill="#000000ff"
              opacity={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
