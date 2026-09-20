import { siteConfig } from '@/lib/config';

export default function Footer() {
  const { business } = siteConfig;
  const whatsapp = `https://wa.me/${business.phone.replace(/[^\d]/g, '')}`;

  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__word">{business.name}</p>
        <div className="footer__cols">
          <div className="footer__col">
            <h4>Contact</h4>
            <a href={business.instagramUrl} target="_blank" rel="noopener">
              DM us on Instagram
            </a>
            <a href={whatsapp} target="_blank" rel="noopener">
              {business.phone}
            </a>
            <p>NYC &amp; Long Island</p>
          </div>
          <div className="footer__col">
            <h4>Quick Links</h4>
            <a href="#about">Studio</a>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#book">Book a Consultation</a>
          </div>
          <div className="footer__col">
            <h4>Follow</h4>
            <div className="footer__socials">
              <a href={business.instagramUrl} aria-label="Instagram" target="_blank" rel="noopener">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>NYC &middot; Long Island &middot; Nassau &middot; Suffolk &middot; Queens</span>
          <span>&copy; {new Date().getFullYear()} {business.name}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
