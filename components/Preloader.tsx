'use client';

import { useEffect, useState } from 'react';

const WORD = 'Bon Appétit';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const already = sessionStorage.getItem('ba_preloaded');
    if (already) {
      setVisible(false);
      return;
    }
    sessionStorage.setItem('ba_preloaded', '1');
    const finish = () => {
      setDone(true);
      setTimeout(() => setVisible(false), 900);
    };
    const t = setTimeout(finish, reducedMotion ? 200 : 1200);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  const skip = () => {
    setDone(true);
    setTimeout(() => setVisible(false), 900);
  };

  return (
    <div className={`preloader${done ? ' preloader--done' : ''}`} aria-hidden="true">
      <div className="preloader__word" aria-hidden="true">
        {WORD.split('').map((ch, i) => (
          <span key={i} style={{ animationDelay: `${0.05 + i * 0.04}s` }}>
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
      </div>
      <button className="preloader__skip" type="button" onClick={skip}>
        Skip intro
      </button>
    </div>
  );
}
