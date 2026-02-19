import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Github, Linkedin, MessageCircle, Heart } from 'lucide-react';
import styles from '../../pages/LandingPage.module.css';
import InfoModal from './InfoModal';
import { MODAL_CONFIGS } from './FooterModalContent';

/**
 * FooterSection – all footer links now open a gorgeous modal.
 * React Router <Link> is only kept for /register in CTAs.
 */
const navColumns = [
  {
    heading: 'Product',
    links: ['features', 'pricing', 'changelog', 'roadmap'],
  },
  {
    heading: 'Company',
    links: ['about', 'blog', 'careers', 'press'],
  },
  {
    heading: 'Legal',
    links: ['privacy', 'terms', 'security', 'cookies'],
  },
];

const socialLinks = [
  { icon: Github,        href: 'https://github.com/aamir-ullah-offical',        label: 'GitHub' },
  { icon: MessageCircle, href: 'https://wa.me/923113259050',                    label: 'WhatsApp' },
  { icon: Linkedin,      href: 'https://www.linkedin.com/in/aamirullahofficial/', label: 'LinkedIn' },
];

const FooterSection = () => {
  const [openPage, setOpenPage] = useState(null);

  const config = openPage ? MODAL_CONFIGS[openPage] : null;

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          {/* Brand column */}
          <div className={styles.footerBrand}>
            <div className={styles.footerLogoRow}>
              <div className={styles.navLogoBox} style={{ width: '32px', height: '32px' }}>
                <CheckSquare size={18} color="#fff" />
              </div>
              <span className={styles.navBrandText} style={{ fontSize: '18px' }}>Task Flow</span>
            </div>
            <p className={styles.footerTagline}>
              The intelligent workspace for peak productivity. Trusted by 12,000+ teams worldwide.
            </p>
            <div className={styles.footerSocials}>
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={styles.footerSocialIcon} aria-label={label} data-cursor-hover>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns — links open modals */}
          {navColumns.map((col) => (
            <div key={col.heading} className={styles.footerCol}>
              <h4 className={styles.footerColHeading}>{col.heading}</h4>
              <ul className={styles.footerColLinks}>
                {col.links.map((key) => (
                  <li key={key}>
                    <button
                      className={styles.footerLink}
                      onClick={() => setOpenPage(key)}
                      data-cursor-hover
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)' }}
                    >
                      {MODAL_CONFIGS[key]?.title ?? key}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className={styles.footerBottom}>
          <span>© 2026 Task Flow. All rights reserved.</span>
          <span className={styles.footerMadeWith}>
            Made with <Heart size={13} fill="#ef4444" color="#ef4444" /> by Aamir Ullah
          </span>
        </div>
      </footer>

      {/* Modal */}
      {config && (
        <InfoModal
          isOpen={!!openPage}
          onClose={() => setOpenPage(null)}
          title={config.title}
          badge={config.badge}
        >
          <config.Content />
        </InfoModal>
      )}
    </>
  );
};

export default FooterSection;
