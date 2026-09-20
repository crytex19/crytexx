'use client';

import { useEffect } from 'react';

export default function MotionSystem() {
  useEffect(() => {
    let cleanupFns: Array<() => void> = [];
    let destroyed = false;

    (async () => {
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);
      if (destroyed) return;

      const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const IS_TOUCH = matchMedia('(pointer: coarse)').matches;
      document.documentElement.classList.add('has-gsap');

      // ---------- Lenis smooth scroll ----------
      let lenisRaf: number | null = null;
      if (!REDUCED_MOTION && !IS_TOUCH) {
        const { default: Lenis } = await import('lenis');
        const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
        lenis.on('scroll', () => ScrollTrigger.update());
        const raf = (time: number) => {
          lenis.raf(time);
          lenisRaf = requestAnimationFrame(raf);
        };
        lenisRaf = requestAnimationFrame(raf);
        cleanupFns.push(() => {
          if (lenisRaf) cancelAnimationFrame(lenisRaf);
          lenis.destroy();
        });
      }

      // Everything GSAP creates from here down is wrapped in a context so
      // React StrictMode's dev-only double-invoke (mount -> cleanup -> mount)
      // can't leave two competing tweens fighting over the same elements —
      // ctx.revert() below undoes every tween/ScrollTrigger created inside.
      const ctx = gsap.context(() => {
      // ---------- mask-line reveals ----------
      gsap.utils.toArray<HTMLElement>('.mask-line').forEach((line, i) => {
        const inHero = line.closest('.hero');
        if (inHero) {
          gsap.fromTo(line, { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: 'cubic-bezier(0.16,1,0.3,1)', delay: 0.3 + i * 0.1 });
        } else {
          gsap.fromTo(
            line,
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: 0.7,
              ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
              delay: (i % 4) * 0.06,
              scrollTrigger: { trigger: line, start: 'top 90%' }
            }
          );
        }
      });

      // ---------- generic reveal-on-scroll (gentle fade + small lift, no bounce) ----------
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: 'cubic-bezier(0.16,1,0.3,1)',
            delay: (i % 5) * 0.05,
            scrollTrigger: { trigger: el, start: 'top 90%' }
          }
        );
      });

      // ---------- parallax (subtle) ----------
      gsap.utils.toArray<HTMLElement>('.parallax').forEach((el) => {
        const rate = parseFloat(el.dataset.parallax || '-12') * 0.4;
        gsap.to(el, {
          yPercent: rate,
          ease: 'none',
          scrollTrigger: { trigger: el.closest('.parallax-wrap') || el, start: 'top bottom', end: 'bottom top', scrub: true }
        });
      });

      // ---------- clip reveals ----------
      gsap.utils.toArray<HTMLElement>('.clip-reveal').forEach((el) => {
        const img = el.querySelector('img');
        gsap.fromTo(
          el,
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'cubic-bezier(0.16,1,0.3,1)', scrollTrigger: { trigger: el, start: 'top 85%' } }
        );
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.06 },
            { scale: 1, duration: 0.9, ease: 'cubic-bezier(0.16,1,0.3,1)', scrollTrigger: { trigger: el, start: 'top 85%' } }
          );
        }
      });

      // ---------- section transition washes ----------
      gsap.utils.toArray<HTMLElement>('.wash-trigger').forEach((el) => {
        const wash = el.querySelector<HTMLElement>('.wash');
        if (!wash) return;
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: 'top 70%' },
          onComplete: () => gsap.set(wash, { scaleY: 0, transformOrigin: 'bottom' })
        });
        tl.set(wash, { transformOrigin: 'top' })
          .to(wash, { scaleY: 1, duration: 0.4, ease: 'cubic-bezier(0.16,1,0.3,1)' })
          .to(wash, { scaleY: 0, transformOrigin: 'bottom', duration: 0.4, ease: 'cubic-bezier(0.7,0,0.84,0)', delay: 0.1 });
      });
      }); // end gsap.context
      cleanupFns.push(() => ctx.revert());

      // ---------- button micro-interaction (shimmer sweep + letter lift) ----------
      document.querySelectorAll<HTMLElement>('.btn').forEach((btn) => {
        if (btn.dataset.microReady) return;
        btn.dataset.microReady = '1';
        const fill = document.createElement('span');
        fill.className = 'btn__fill';
        fill.setAttribute('aria-hidden', 'true');
        btn.insertBefore(fill, btn.firstChild);

        const label = btn.querySelector('span:not(.btn__fill)');
        if (label && label.children.length === 0) {
          const text = label.textContent ?? '';
          label.textContent = '';
          text.split('').forEach((ch, i) => {
            const s = document.createElement('span');
            s.className = 'btn__letter';
            s.style.transitionDelay = `${i * 0.015}s`;
            s.textContent = ch === ' ' ? ' ' : ch;
            label.appendChild(s);
          });
        }
      });

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener('resize', onResize);
      cleanupFns.push(() => window.removeEventListener('resize', onResize));

      cleanupFns.push(() => ScrollTrigger.getAll().forEach((t) => t.kill()));
    })();

    return () => {
      destroyed = true;
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  return null;
}
