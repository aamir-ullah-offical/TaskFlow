import InfoPageLayout from '../../components/landing/InfoPageLayout';

const sections = [
  { title: '1. Information We Collect', content: 'We collect information you provide directly (name, email, task data), information from your use of the service (usage logs, device info), and data from integrations you connect (e.g. Google Calendar). We never sell your personal data.' },
  { title: '2. How We Use Your Information', content: 'Your data is used to provide and improve the Task Flow service, send product updates and notifications you opt into, generate AI insights within your account, and troubleshoot issues. We do not use your task data to train our models without explicit opt-in.' },
  { title: '3. Data Storage & Security', content: 'Data is stored on servers in the EU and USA (AWS). We use AES-256 encryption at rest and TLS 1.3 in transit. Security reviews and penetration tests are conducted quarterly.' },
  { title: '4. Sharing Your Information', content: 'We share data with service providers who help us operate (e.g. payment processors, hosting). We may share aggregate, anonymized statistics. We will never share your personally identifiable data with advertisers.' },
  { title: '5. Your Rights', content: 'You have the right to access, export, or delete your data at any time from Settings â†’ Account. EU residents have additional rights under GDPR, including the right to portability and the right to be forgotten. Contact privacy@taskflow.app to exercise these rights.' },
  { title: '6. Cookies', content: 'We use essential cookies for authentication and session management, and optional analytics cookies (with your consent) to understand how people use the product. See our Cookie Policy for details.' },
  { title: '7. Children\'s Privacy', content: 'Task Flow is not intended for children under 13. If you believe a child has provided us personal data, contact us immediately at privacy@taskflow.app.' },
  { title: '8. Changes to This Policy', content: 'When we make significant changes to this policy, we will notify all users by email at least 30 days in advance and update the "Last revised" date at the top of this page.' },
];

const PrivacyPage = () => (
  <InfoPageLayout
    badge="Legal"
    title="Privacy Policy"
    subtitle="Last revised: February 1, 2026. This policy explains what data we collect, how we use it, and your rights."
  >
    <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 36 }}>
      {sections.map(s => (
        <div key={s.title}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>{s.title}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{s.content}</p>
        </div>
      ))}

      <div style={{ padding: '20px', borderRadius: 12, background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
        Questions? Contact us at <a href="mailto:privacy@taskflow.app" style={{ color: 'var(--accent)' }}>privacy@taskflow.app</a> or write to Task Flow Inc., 123 Anywhere St, San Francisco, CA 94105.
      </div>
    </div>
  </InfoPageLayout>
);

export default PrivacyPage;

