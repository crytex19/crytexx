import { siteConfig } from '@/lib/config';

export default function Services() {
  return (
    <section id="services">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">What We Build</p>
          <h2 className="section-title mask-wrap">
            <span className="mask-line">Every occasion, one crew</span>
          </h2>
        </div>
        <div className="services__grid">
          {siteConfig.services.map((s) => (
            <article className="service" data-reveal key={s.num}>
              <div className="service__bg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.image} alt={s.alt} loading="lazy" decoding="async" />
              </div>
              <div className="service__scrim"></div>
              <div className="service__wash"></div>
              <div className="service__body">
                <p className="service__num">{s.num}</p>
                <h3 className="service__title">{s.title}</h3>
                <p className="service__desc">{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
