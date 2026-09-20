const COLORS = ['#E8467E', '#E4A429', '#7C57D6', '#4C7DBE', '#F2CB3B'];

// Fixed positions/timings (not Math.random()) so server and client render
// identically — a client-only random set would just be a hydration bug.
const PIECES = [
  { left: 4, size: 8, delay: 0, duration: 13, colorIdx: 0 },
  { left: 12, size: 6, delay: 2.4, duration: 15, colorIdx: 1 },
  { left: 20, size: 9, delay: 5.1, duration: 12, colorIdx: 2 },
  { left: 29, size: 7, delay: 1.2, duration: 16, colorIdx: 3 },
  { left: 37, size: 6, delay: 6.8, duration: 14, colorIdx: 4 },
  { left: 45, size: 8, delay: 3.6, duration: 13, colorIdx: 0 },
  { left: 53, size: 7, delay: 0.8, duration: 17, colorIdx: 2 },
  { left: 61, size: 6, delay: 4.5, duration: 12, colorIdx: 1 },
  { left: 69, size: 9, delay: 7.9, duration: 15, colorIdx: 3 },
  { left: 77, size: 7, delay: 2.9, duration: 14, colorIdx: 4 },
  { left: 85, size: 8, delay: 5.7, duration: 13, colorIdx: 2 },
  { left: 92, size: 6, delay: 1.7, duration: 16, colorIdx: 0 },
  { left: 8, size: 7, delay: 8.4, duration: 15, colorIdx: 3 },
  { left: 96, size: 6, delay: 3.3, duration: 12, colorIdx: 1 }
];

export default function HeroConfetti() {
  return (
    <div className="hero__confetti" aria-hidden="true">
      {PIECES.map((p, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.5,
            background: COLORS[p.colorIdx],
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`
          }}
        />
      ))}
    </div>
  );
}
