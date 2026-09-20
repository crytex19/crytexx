import { siteConfig } from '@/lib/config';
import HeroConfetti from './HeroConfetti';

export default function Hero() {
  const { hero } = siteConfig;
  return (
    <section className="hero">
      <div className="hero__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hero.image} alt={hero.imageAlt} fetchPriority="high" />
      </div>
      <HeroConfetti />
      <div className="container hero__content">
        <p className="eyebrow hero__eyebrow">{hero.eyebrow}</p>
        <h1>
          {hero.heading.map((line, i) => (
            <span className="mask-wrap" key={i}>
              <span className="mask-line hero-line" style={{ animationDelay: `${0.2 + i * 0.15}s` }}>
                {line}
              </span>
            </span>
          ))}
        </h1>
        <p className="hero__sub">{hero.sub}</p>
        <div className="hero__ctas">
          <a href="#book" className="btn btn--primary">
            <span>Book a Consultation</span>
          </a>
          <a href="#work" className="btn btn--ghost">
            <span>See Our Work</span>
          </a>
        </div>
      </div>
      <span className="hero__scrollcue">Scroll</span>
    </section>
  );
}
