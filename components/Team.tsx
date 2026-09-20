'use client';

import { useState } from 'react';
import { siteConfig } from '@/lib/config';

export default function Team() {
  const [open, setOpen] = useState(true);
  const [openRow, setOpenRow] = useState<string | null>(null);

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
          +
        </span>
      </button>

      <div
        className="team-grid-wrap"
        id="team-grid-wrap"
        role="region"
        aria-labelledby="team-toggle"
        hidden={!open}
      >
        <ul className="lineup">
          {siteConfig.team.map((member) => {
            const panelId = `team-desc-${member.num}`;
            const isOpen = openRow === member.num;
            return (
              <li className={`lineup__row${isOpen ? ' is-open' : ''}`} key={member.num}>
                <button
                  type="button"
                  className="lineup__btn"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenRow(isOpen ? null : member.num)}
                >
                  <span className="lineup__num">{member.num}</span>
                  <span className="lineup__name">{member.name}</span>
                  <span className="lineup__icon" aria-hidden="true">
                    +
                  </span>
                </button>
                <div className="lineup__panel" id={panelId}>
                  <div className="lineup__panel-inner">
                    <p className="lineup__desc">{member.desc}</p>
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
