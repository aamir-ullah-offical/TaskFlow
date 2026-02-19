import InfoPageLayout from '../../components/landing/InfoPageLayout';

const sections = [
  { title: '1. Acceptance of Terms', content: 'By accessing or using Task Flow, you agree to be bound by these Terms of Service and our Privacy Policy. If you disagree with any part, you may not use the service.' },
  { title: '2. Your Account', content: 'You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You must be at least 13 years old to use Task Flow.' },
  { title: '3. Acceptable Use', content: 'You agree not to use Task Flow to violate any laws, infringe intellectual property rights, distribute spam or malware, attempt to gain unauthorized access to our systems, or resell the service without written permission.' },
  { title: '4. Intellectual Property', content: 'Task Flow and its original content, features, and functionality are owned by Task Flow Inc. and are protected by copyright, trademark, and other laws. Your content remains yours â€” you grant us a limited license to provide the service.' },
  { title: '5. Payments & Billing', content: 'Paid subscriptions are billed in advance on a monthly or annual basis. All fees are non-refundable except where required by law. We reserve the right to change pricing with 30 days\' notice.' },
  { title: '6. Termination', content: 'We may suspend or terminate your account if you violate these Terms. You may cancel your account at any time from Settings â†’ Account. On termination, your right to use the service ceases immediately.' },
  { title: '7. Disclaimer of Warranties', content: 'Task Flow is provided "as is" and "as available" without warranties of any kind, whether express or implied, including fitness for a particular purpose or non-infringement.' },
  { title: '8. Limitation of Liability', content: 'To the fullest extent permitted by law, Task Flow Inc. shall not be liable for indirect, incidental, or consequential damages arising from your use of the service.' },
  { title: '9. Governing Law', content: 'These Terms shall be governed by the laws of the State of California without regard to conflict of law provisions. Disputes will be resolved through binding arbitration in San Francisco, CA.' },
  { title: '10. Changes to Terms', content: 'We reserve the right to modify these Terms at any time. We will provide 30 days\' notice of material changes. Continued use after changes constitutes acceptance.' },
];

const TermsPage = () => (
  <InfoPageLayout
    badge="Legal"
    title="Terms of Service"
    subtitle="Last revised: February 1, 2026. Please read these terms carefully before using Task Flow."
  >
    <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 32 }}>
      {sections.map(s => (
        <div key={s.title}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{s.title}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{s.content}</p>
        </div>
      ))}
      <div style={{ padding: '18px 20px', borderRadius: 12, background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
        Questions about these Terms? Email <a href="mailto:legal@taskflow.app" style={{ color: 'var(--accent)' }}>legal@taskflow.app</a>
      </div>
    </div>
  </InfoPageLayout>
);

export default TermsPage;

