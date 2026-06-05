'use client';

// Purely-decorative floating geometry used to fill the empty side/corner space
// of sections. Absolutely positioned, behind content (z-index 0), never
// interactive. Pass a `variant` for a distinct arrangement per section and
// `tone="dark"` on dark backgrounds.

function Orb({ color, size, style }) {
  return (
    <span
      aria-hidden
      style={{
        position: 'absolute', width: size, height: size, borderRadius: '50%',
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        filter: 'blur(36px)', ...style,
      }}
    />
  );
}

function Shape({ style, float, children }) {
  return (
    <span aria-hidden className={float ? `op-float ${float}` : undefined} style={{ position: 'absolute', lineHeight: 0, ...style }}>
      {children}
    </span>
  );
}

const Ring = (s, w = 2, dash) => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" stroke={s} strokeWidth={w} strokeDasharray={dash} />
  </svg>
);
const RoundSquare = (s, w = 2) => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
    <rect x="4" y="4" width="92" height="92" rx="26" stroke={s} strokeWidth={w} />
  </svg>
);
const Triangle = (s, w = 2) => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
    <path d="M50 6 L94 88 L6 88 Z" stroke={s} strokeWidth={w} strokeLinejoin="round" />
  </svg>
);
const Plus = (s, w = 3) => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" stroke={s} strokeWidth={w} strokeLinecap="round">
    <line x1="50" y1="14" x2="50" y2="86" /><line x1="14" y1="50" x2="86" y2="50" />
  </svg>
);
const Dots = (s) => (
  <svg width="100%" height="100%" viewBox="0 0 100 100">
    {[12, 32, 52, 72, 92].map((y) => [12, 32, 52, 72, 92].map((x) => (
      <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill={s} />
    )))}
  </svg>
);

export default function Decor({ variant = 'a', tone = 'light' }) {
  const s1 = tone === 'dark' ? 'rgba(255,255,255,0.16)' : 'rgba(79,70,229,0.22)';
  const s2 = tone === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(124,58,237,0.20)';
  const dot = tone === 'dark' ? 'rgba(255,255,255,0.14)' : 'rgba(79,70,229,0.18)';
  const orb1 = tone === 'dark' ? 'rgba(124,58,237,0.18)' : 'rgba(79,70,229,0.12)';
  const orb2 = tone === 'dark' ? 'rgba(14,165,233,0.14)' : 'rgba(124,58,237,0.10)';

  const variants = {
    a: (
      <>
        <Orb color={orb1} size="380px" style={{ top: '-120px', left: '-90px' }} />
        <Shape style={{ top: '14%', left: '2.5%', width: 70, height: 70 }} float="">{Ring(s1)}</Shape>
        <Shape style={{ bottom: '16%', left: '5%', width: 30, height: 30 }} float="slow">{Plus(s2)}</Shape>
        <Shape style={{ top: '22%', right: '3%', width: 56, height: 56 }} float="slow">{Dots(dot)}</Shape>
        <Shape style={{ bottom: '12%', right: '4.5%', width: 84, height: 84, transform: 'rotate(12deg)' }} float="">{RoundSquare(s2)}</Shape>
      </>
    ),
    b: (
      <>
        <Orb color={orb2} size="420px" style={{ bottom: '-150px', right: '-100px' }} />
        <Shape style={{ top: '18%', right: '3%', width: 64, height: 64, transform: 'rotate(18deg)' }} float="slow">{RoundSquare(s1)}</Shape>
        <Shape style={{ bottom: '20%', left: '3%', width: 72, height: 72 }} float="">{Triangle(s2)}</Shape>
        <Shape style={{ top: '26%', left: '5.5%', width: 26, height: 26 }} float="slow">{Plus(s1)}</Shape>
        <Shape style={{ bottom: '14%', right: '7%', width: 50, height: 50 }} float="">{Ring(s2, 2, '6 7')}</Shape>
      </>
    ),
    c: (
      <>
        <Orb color={orb1} size="360px" style={{ top: '-130px', right: '-80px' }} />
        <Shape style={{ top: '16%', left: '3%', width: 60, height: 60 }} float="slow">{Ring(s1, 2, '5 6')}</Shape>
        <Shape style={{ bottom: '18%', left: '6%', width: 54, height: 54 }} float="">{Dots(dot)}</Shape>
        <Shape style={{ top: '24%', right: '4%', width: 78, height: 78, transform: 'rotate(-10deg)' }} float="slow">{RoundSquare(s2)}</Shape>
        <Shape style={{ bottom: '15%', right: '5%', width: 28, height: 28 }} float="">{Plus(s1)}</Shape>
      </>
    ),
    d: (
      <>
        <Orb color={orb2} size="400px" style={{ top: '-140px', left: '-90px' }} />
        <Shape style={{ top: '20%', right: '3.5%', width: 66, height: 66 }} float="">{Triangle(s1)}</Shape>
        <Shape style={{ bottom: '16%', left: '3.5%', width: 58, height: 58 }} float="slow">{Ring(s2)}</Shape>
        <Shape style={{ top: '30%', left: '6%', width: 50, height: 50 }} float="">{Dots(dot)}</Shape>
        <Shape style={{ bottom: '20%', right: '6%', width: 26, height: 26 }} float="slow">{Plus(s2)}</Shape>
      </>
    ),
    e: (
      <>
        <Orb color={orb1} size="340px" style={{ bottom: '-120px', left: '-70px' }} />
        <Shape style={{ top: '16%', left: '4%', width: 56, height: 56, transform: 'rotate(14deg)' }} float="slow">{RoundSquare(s1)}</Shape>
        <Shape style={{ bottom: '18%', right: '4%', width: 64, height: 64 }} float="">{Ring(s2, 2, '6 7')}</Shape>
        <Shape style={{ top: '24%', right: '6%', width: 26, height: 26 }} float="slow">{Plus(s1)}</Shape>
      </>
    ),
  };

  return (
    <div aria-hidden className="op-decor" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {variants[variant] || variants.a}
    </div>
  );
}
