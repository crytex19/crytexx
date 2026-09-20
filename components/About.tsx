import { siteConfig } from '@/lib/config';
import Team from './Team';

const FACTS = ['Est. 2022', 'Family run', 'NYC + Long Island', 'Out-of-state available'];

export default function About() {
  const { about } = siteConfig;
  return (
    <section id="about" className="section--purple">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">About Us</span>
          <h2 className="section-title mask-wrap">
            <span className="mask-line">
              We learned this job <em>the hard way</em>
            </span>
          </h2>
        </div>

        <div className="about__grid parallax-wrap">
          <div className="about__media clip-reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={about.image} alt={about.imageAlt} loading="lazy" decoding="async" />
          </div>
          <div className="about__copy">
            <p className="about__paragraph" data-about-paragraph>
              {about.paragraph}
            </p>
            <strong className="about__closing">{about.closing}</strong>
            <ul className="about__facts">
              {FACTS.map((fact) => (
                <li className="chip" key={fact}>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Team />
    </section>
  );
}
