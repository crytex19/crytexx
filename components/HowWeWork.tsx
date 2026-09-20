'use client';

import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/lib/config';

export default function HowWeWork() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(i);
          });
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">How We Work</p>
          <h2 className="section-title mask-wrap">
            <span className="mask-line">Four steps</span>
          </h2>
        </div>
        <div className="howwework">
          <div className="howwework__counter">
            {siteConfig.howWeWork.map((step, i) => (
              <p className={`howwework__count-item${active === i ? ' is-active' : ''}`} key={step.num}>
                {step.num} &middot; {step.title}
              </p>
            ))}
          </div>
          <div>
            {siteConfig.howWeWork.map((step, i) => (
              <div
                className="howwework__step"
                data-reveal
                key={step.num}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={step.image} alt={step.alt} loading="lazy" decoding="async" />
                <div>
                  <p className="howwework__step-num">{step.num}</p>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
