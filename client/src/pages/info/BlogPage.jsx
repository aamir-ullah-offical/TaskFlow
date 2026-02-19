import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import InfoPageLayout from '../../components/landing/InfoPageLayout';

const posts = [
  { slug: 'ai-productivity-coach', category: 'Product', date: 'Feb 14, 2026', readTime: '6 min', color: '#8b5cf6', title: 'Introducing AI Coach v2: Your Personalized Productivity Analyst', excerpt: 'We completely rebuilt the AI coach from the ground up. Here\'s what changed, what\'s new, and what we learned building it.' },
  { slug: 'deep-work-science', category: 'Productivity', date: 'Feb 7, 2026', readTime: '8 min', color: '#3b82f6', title: 'The Science of Deep Work (And How Task Flow Helps You Get There)', excerpt: 'Cal Newport\'s framework meets modern tooling. We explored the neuroscience behind focused work and designed Task Flow around it.' },
  { slug: 'habit-streaks', category: 'Tips', date: 'Jan 30, 2026', readTime: '4 min', color: '#10b981', title: '5 Habit Templates That Actually Stick', excerpt: 'After analyzing 2M+ habits tracked in Task Flow, here are the five templates that lead to the highest long-term completion rate.' },
  { slug: 'team-async', category: 'Teams', date: 'Jan 23, 2026', readTime: '5 min', color: '#f59e0b', title: 'How Async-First Teams Stay Aligned Without Endless Meetings', excerpt: 'Our playbook for running a 14-person remote team across 6 time zones â€” and the Task Flow workflows behind it.' },
  { slug: 'dark-mode-design', category: 'Design', date: 'Jan 16, 2026', readTime: '7 min', color: '#ec4899', title: 'The Psychology of Dark Mode: Why It Feels Better at Night', excerpt: 'We dug into the research on dark vs light interfaces and redesigned Task Flow\'s theme system from scratch.' },
  { slug: 'year-in-review-2025', category: 'Company', date: 'Jan 2, 2026', readTime: '10 min', color: '#06b6d4', title: '2025 Year in Review: From 0 to 12,000 Users', excerpt: 'How Task Flow went from a side project to a product trusted by thousands â€” the lessons, pivots, and highlights.' },
];

const BlogPage = () => (
  <InfoPageLayout
    badge="Blog"
    title="Thoughts on productivity, design & team work"
    subtitle="Insights from the Task Flow team and the community we've built."
  >
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
      {posts.map((post) => (
        <article
          key={post.slug}
          style={{ borderRadius: 20, background: 'var(--bg-card)', border: '1px solid var(--border)', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.25s ease, box-shadow 0.25s ease' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-glow)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
        >
          {/* Color band */}
          <div style={{ height: 4, background: `linear-gradient(to right, ${post.color}, ${post.color}88)` }} />

          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
            {/* Meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: post.color, background: `${post.color}15`, padding: '3px 10px', borderRadius: 50 }}>{post.category}</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} /> {post.readTime} read</span>
            </div>

            <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', lineHeight: 1.4, flex: 1 }}>{post.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{post.excerpt}</p>

            {/* Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{post.date}</span>
              <button style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 600, color: post.color, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                Read more <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>

    {/* Newsletter */}
    <div style={{ marginTop: 72, padding: '48px 32px', borderRadius: 20, background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(59,130,246,0.05))', border: '1px solid rgba(139,92,246,0.15)', textAlign: 'center' }}>
      <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>Get articles in your inbox</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>One email per week. No spam, ever.</p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
        <input type="email" placeholder="you@example.com" className="form-input" style={{ maxWidth: 280, flex: 1 }} />
        <button className="btn-primary" style={{ padding: '11px 22px', borderRadius: 11, fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>Subscribe</button>
      </div>
    </div>
  </InfoPageLayout>
);

export default BlogPage;

