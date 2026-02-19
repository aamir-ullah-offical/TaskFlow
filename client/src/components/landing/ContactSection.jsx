import { useState } from 'react';
import { Send, Mail, User, MessageSquare, CheckCircle2, Sparkles } from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';
import styles from '../../pages/LandingPage.module.css';

/**
 * ContactSection – CTA + contact form with:
 * - Gradient background overlay
 * - Name, email, message fields (static, no backend)
 * - Submit button with glow animation and success state
 */
const ContactSection = () => {
  const sectionRef = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async submit (static – no backend)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id="contact" className={styles.contactSection} ref={sectionRef}>
      {/* Background */}
      <div className={styles.contactBg} />
      <div className={styles.contactGlobePurple} />
      <div className={styles.contactGlobeBlue} />

      <div className={styles.contactInner}>
        {/* Left – CTA copy */}
        <div className={styles.contactCopy} data-reveal>
          <div className={styles.sectionBadge}>
            <Sparkles size={14} />
            <span>Get in Touch</span>
          </div>
          <h2 className={styles.sectionTitle} style={{ textAlign: 'left', maxWidth: '420px' }}>
            Ready to reach <span className={styles.heroAccent}>peak flow</span>?
          </h2>
          <p className={styles.contactSubtitle}>
            Have a question, partnership inquiry, or just want to say hi?
            Drop us a message and we'll get back to you within 24 hours.
          </p>

          <ul className={styles.contactBenefits}>
            {['Free 14-day trial, no credit card', 'Onboarding call for teams', 'Priority support for enterprise'].map((b) => (
              <li key={b} className={styles.contactBenefit}>
                <CheckCircle2 size={16} color="#10b981" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right – Form */}
        <div className={styles.contactFormBox} data-reveal>
          {submitted ? (
            <div className={styles.contactSuccess}>
              <CheckCircle2 size={48} color="#10b981" />
              <h3>Message Sent!</h3>
              <p>Thanks for reaching out. We'll get back to you within 24 hours.</p>
              <button className="btn-primary" onClick={() => setSubmitted(false)} style={{ marginTop: '20px' }}>
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.contactForm} noValidate>
              <div className={styles.contactFormHeader}>
                <h3>Send a Message</h3>
                <p>We read every message personally.</p>
              </div>

              {/* Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="cf-name">
                  Full Name <span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <span className="input-icon"><User size={16} /></span>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    className="form-input has-icon-left"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label" htmlFor="cf-email">
                  Email <span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <span className="input-icon"><Mail size={16} /></span>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    className="form-input has-icon-left"
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div className="form-group">
                <label className="form-label" htmlFor="cf-message">
                  Message <span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <span className="input-icon" style={{ top: '13px', alignItems: 'flex-start' }}>
                    <MessageSquare size={16} />
                  </span>
                  <textarea
                    id="cf-message"
                    name="message"
                    className="form-input has-icon-left"
                    placeholder="Tell us how we can help..."
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                    style={{ resize: 'vertical', minHeight: '120px' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`btn-primary ${styles.submitBtn}`}
                disabled={loading || !form.name || !form.email || !form.message}
                data-cursor-hover
              >
                {loading ? (
                  <>
                    <span className={styles.submitSpinner} />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
