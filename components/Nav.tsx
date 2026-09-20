'use client';

import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/lib/config';

const LINKS = [
  { href: '#about', label: 'About', bg: '/assets/stage-13.jpg' },
  { href: '#services', label: 'Services', bg: '/assets/mehndi-08.jpg' },
  { href: '#work', label: 'Work', bg: '/assets/amalfi-17.jpg' },
  { href: '#book', label: 'Book', bg: '/assets/ballroom-05.jpg' }
];

export default function Nav() {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const [overlayBg, setOverlayBg] = useState(LINKS[0].bg);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    let lastY = window.scrollY;
    const onDir = () => {
      const dir = window.scrollY > lastY ? 'down' : 'up';
      document.documentElement.setAttribute('data-scroll-dir', dir);
      lastY = window.scrollY;
    };
    window.addEventListener('scroll', onDir, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onDir);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
    if (open) firstLinkRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [open]);

  return (
    <>
      <header className={`nav${condensed ? ' nav--condensed' : ''}`} data-reveal>
        <a href="#main" className="nav__word">
          {siteConfig.business.name}
        </a>
        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <a href="#book" className="btn btn--primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}>
            <span>Book a Consultation</span>
          </a>
        </nav>
        <button
          ref={toggleRef}
          className="nav__toggle"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="nav-overlay"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      <div
        className={`nav-overlay${open ? ' nav-overlay--open' : ''}`}
        id="nav-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <button className="nav-overlay__close" aria-label="Close menu" onClick={() => setOpen(false)}>
          &times;
        </button>
        <div className="nav-overlay__links">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              ref={i === 0 ? firstLinkRef : undefined}
              className="nav-overlay__link"
              href={l.href}
              onMouseEnter={() => setOverlayBg(l.bg)}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="nav-overlay__bg" style={{ backgroundImage: `url('${overlayBg}')` }} />
      </div>

      <a
        className="fab"
        href={`https://wa.me/${siteConfig.business.phone.replace(/[^\d]/g, '')}`}
        target="_blank"
        rel="noopener"
        aria-label={`Message ${siteConfig.business.name} on WhatsApp`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8.9-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.2.2-.4.1-.1 0-.3 0-.4 0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.5 3.9 3.4.5.2 1 .4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3z" />
        </svg>
      </a>
    </>
  );
}
