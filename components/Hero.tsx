import { siteConfig } from '@/lib/config';
import HeroConfetti from './HeroConfetti';

export default function Hero() {
  const { hero } = siteConfig;
  return (
    <section className="hero">
      <HeroConfetti />
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1>
            {hero.heading.map((line, i) => (
              <span className="mask-wrap" key={i}>
                <span className="mask-line hero-line" style={{ animationDelay: `${0.15 + i * 0.13}s` }}>
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
          <ul className="hero__tags">
            {hero.tags.map((tag) => (
              <li className="chip" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__collage">
          <span className="hero__sticker">{hero.sticker}</span>
          <figure className="hero__photo hero__photo--a">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero.image} alt={hero.imageAlt} fetchPriority="high" />
          </figure>
          {hero.collage.map((photo, i) => (
            <figure className={`hero__photo hero__photo--${i === 0 ? 'b' : 'c'}`} key={photo.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
