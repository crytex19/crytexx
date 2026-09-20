import { siteConfig } from '@/lib/config';

export default function HowWeWork() {
  return (
    <section className="section--gold">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">How We Work</span>
          <h2 className="section-title mask-wrap">
            <span className="mask-line">
              Four steps, <em>zero chaos</em>
            </span>
          </h2>
        </div>

        <ol className="steps">
          {siteConfig.howWeWork.map((step) => (
            <li className="step" data-reveal key={step.num}>
              <div className="step__marker" aria-hidden="true">
                {step.num}
              </div>
              <div className="step__card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={step.image} alt={step.alt} loading="lazy" decoding="async" />
                <div className="step__text">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
