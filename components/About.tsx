import { siteConfig } from '@/lib/config';
import Team from './Team';

export default function About() {
  const { about } = siteConfig;
  return (
    <section id="about">
      <div className="container about__grid parallax-wrap">
        <div className="about__media clip-reveal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="parallax" data-parallax="-12" src={about.image} alt={about.imageAlt} loading="lazy" decoding="async" />
        </div>
        <div className="about__copy parallax" data-parallax="6">
          <p className="eyebrow">About Us</p>
          <h2 className="section-title mask-wrap">
            <span className="mask-line">About Us</span>
          </h2>
          <p className="about__paragraph" data-about-paragraph>
            {about.paragraph} <span className="about__closing">{about.closing}</span>
          </p>
        </div>
      </div>

      <Team />
    </section>
  );
}
