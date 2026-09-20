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
        const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
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
          gsap.fromTo(line, { yPercent: 110 }, { yPercent: 0, duration: 1, ease: 'cubic-bezier(0.16,1,0.3,1)', delay: 0.3 + i * 0.1 });
        } else {
          gsap.fromTo(
            line,
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: 0.9,
              ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
              delay: (i % 4) * 0.08,
              scrollTrigger: { trigger: line, start: 'top 90%' }
            }
          );
        }
      });

      // ---------- generic reveal-on-scroll ----------
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 32, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            delay: (i % 5) * 0.07,
            scrollTrigger: { trigger: el, start: 'top 88%' }
          }
        );
      });

      // ---------- parallax ----------
      gsap.utils.toArray<HTMLElement>('.parallax').forEach((el) => {
        const rate = parseFloat(el.dataset.parallax || '-12');
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
          { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'cubic-bezier(0.16,1,0.3,1)', scrollTrigger: { trigger: el, start: 'top 85%' } }
        );
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.12 },
            { scale: 1, duration: 1.1, ease: 'cubic-bezier(0.16,1,0.3,1)', scrollTrigger: { trigger: el, start: 'top 85%' } }
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
          .to(wash, { scaleY: 1, duration: 0.5, ease: 'cubic-bezier(0.16,1,0.3,1)' })
          .to(wash, { scaleY: 0, transformOrigin: 'bottom', duration: 0.5, ease: 'cubic-bezier(0.7,0,0.84,0)', delay: 0.1 });
      });
      }); // end gsap.context
      cleanupFns.push(() => ctx.revert());

      // ---------- magnetic cursor ring (desktop only) ----------
      if (!IS_TOUCH && !REDUCED_MOTION) {
        const ring = document.createElement('div');
        ring.className = 'cursor-ring';
        ring.setAttribute('aria-hidden', 'true');
        document.body.appendChild(ring);
        let x = 0,
          y = 0,
          rx = 0,
          ry = 0;
        const onMove = (e: MouseEvent) => {
          x = e.clientX;
          y = e.clientY;
        };
        window.addEventListener('mousemove', onMove);
        const ticker = () => {
          rx += (x - rx) * 0.18;
          ry += (y - ry) * 0.18;
          ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
        };
        gsap.ticker.add(ticker);
        const enter = () => ring.classList.add('cursor-ring--active');
        const leave = () => ring.classList.remove('cursor-ring--active');
        const targets = document.querySelectorAll('a, button, .gcell__btn');
        targets.forEach((el) => {
          el.addEventListener('mouseenter', enter);
          el.addEventListener('mouseleave', leave);
        });
        cleanupFns.push(() => {
          window.removeEventListener('mousemove', onMove);
          gsap.ticker.remove(ticker);
          targets.forEach((el) => {
            el.removeEventListener('mouseenter', enter);
            el.removeEventListener('mouseleave', leave);
          });
          ring.remove();
        });
      }

      // ---------- button micro-interaction ----------
      document.querySelectorAll<HTMLElement>('.btn').forEach((btn) => {
        if (btn.dataset.microReady) return;
        btn.dataset.microReady = '1';
        const fill = document.createElement('span');
        fill.className = 'btn__fill';
        fill.setAttribute('aria-hidden', 'true');
        btn.insertBefore(fill, btn.firstChild);

        btn.addEventListener('pointerenter', (e) => {
          const rect = btn.getBoundingClientRect();
          const px = ((e.clientX - rect.left) / rect.width) * 100;
          const py = ((e.clientY - rect.top) / rect.height) * 100;
          fill.style.transformOrigin = `${px}% ${py}%`;
        });

        const label = btn.querySelector('span:not(.btn__fill)');
        if (label && label.children.length === 0) {
          const text = label.textContent ?? '';
          label.textContent = '';
          text.split('').forEach((ch, i) => {
            const s = document.createElement('span');
            s.className = 'btn__letter';
            s.style.transitionDelay = `${i * 0.02}s`;
            s.textContent = ch === ' ' ? ' ' : ch;
            label.appendChild(s);
          });
        }
      });

      // ---------- tilt cards (desktop only) ----------
      if (!IS_TOUCH && !REDUCED_MOTION) {
        document.querySelectorAll<HTMLElement>('.gcell, .service').forEach((card) => {
          const onMoveCard = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(card, { rotateX: py * -4, rotateY: px * 4, duration: 0.4, ease: 'power2.out', transformPerspective: 600 });
          };
          const onLeaveCard = () => {
            gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'cubic-bezier(0.16,1,0.3,1)' });
          };
          card.addEventListener('mousemove', onMoveCard);
          card.addEventListener('mouseleave', onLeaveCard);
        });
      }

      // ---------- scroll-velocity skew on gallery tiles ----------
      if (!REDUCED_MOTION) {
        const cells = document.querySelectorAll<HTMLElement>('.gcell img');
        if (cells.length) {
          let lastY = window.scrollY,
            lastT = performance.now();
          let skewTimeout: ReturnType<typeof setTimeout>;
          const onScroll = () => {
            const now = performance.now();
            const dy = window.scrollY - lastY;
            const dt = Math.max(now - lastT, 1);
            const velocity = gsap.utils.clamp(-4, 4, (dy / dt) * 8);
            lastY = window.scrollY;
            lastT = now;
            cells.forEach((img) => {
              img.style.transform = `skewY(${velocity}deg)`;
            });
            clearTimeout(skewTimeout);
            skewTimeout = setTimeout(() => {
              cells.forEach((img) => {
                img.style.transform = 'skewY(0deg)';
              });
            }, 120);
          };
          window.addEventListener('scroll', onScroll, { passive: true });
          cleanupFns.push(() => window.removeEventListener('scroll', onScroll));
        }
      }

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
