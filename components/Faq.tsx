'use client';

import { useState } from 'react';
import { siteConfig } from '@/lib/config';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Good to Know</span>
          <h2 className="section-title mask-wrap">
            <span className="mask-line">
              A few <em>questions</em>
            </span>
          </h2>
        </div>
        <div className="faq-list">
          {siteConfig.faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div className={`faq-item${isOpen ? ' is-open' : ''}`} key={item.q}>
                <button
                  className="faq-item__q"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="plus">+</span>
                </button>
                <div className="faq-item__a-wrap">
                  <div className="faq-item__a">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
