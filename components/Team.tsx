'use client';

import { useState } from 'react';
import { siteConfig } from '@/lib/config';

export default function Team() {
  const [open, setOpen] = useState(true);
  const [openCard, setOpenCard] = useState<string | null>(null);

  return (
    <div className="container team">
      <button
        type="button"
        className="team-toggle"
        id="team-toggle"
        aria-expanded={open}
        aria-controls="team-grid-wrap"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="team-toggle__label">Meet the Team</span>
        <span className="team-toggle__rule" aria-hidden="true"></span>
        <span className="team-toggle__chevron" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>
      <div
        className="team-grid-wrap"
        id="team-grid-wrap"
        role="region"
        aria-labelledby="team-toggle"
        style={{ height: open ? 'auto' : '0px', overflow: open ? 'visible' : 'hidden' }}
      >
        <ul className="team-grid">
          {siteConfig.team.map((member) => {
            const panelId = `team-desc-${member.num}`;
            const isOpen = openCard === member.num;
            return (
              <li className={`team-card${isOpen ? ' is-open' : ''}`} data-team-card key={member.num}>
                <button
                  type="button"
                  className="team-card__toggle"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenCard(isOpen ? null : member.num)}
                >
                  <span className="team-card__num">{member.num}</span>
                  <span className="team-card__name">{member.name}</span>
                  <span className="team-card__plus" aria-hidden="true">
                    +
                  </span>
                </button>
                <div className="team-card__panel" id={panelId}>
                  <div className="team-card__panel-inner">
                    <p className="team-card__desc">{member.desc}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
