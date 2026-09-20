'use client';

import { useEffect, useRef } from 'react';
import { siteConfig } from '@/lib/config';

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new MutationObserver(() => {
      const dir = document.documentElement.getAttribute('data-scroll-dir');
      el.classList.toggle('marquee--reverse', dir === 'up');
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-scroll-dir'] });
    return () => obs.disconnect();
  }, []);

  const items = siteConfig.marquee;
  const doubled = [...items, ...items];

  return (
    <div className="marquee-section">
      <div className="marquee" ref={ref}>
        <div className="marquee__track">
          {doubled.map((item, i) => (
            <span className="marquee__item" key={i}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
