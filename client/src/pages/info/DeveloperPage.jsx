import { useState } from 'react';
import { Github, Linkedin, MessageCircle, Code2, Database, Globe, Server, Cloud, Network, Terminal, Wrench, Shield, Smartphone, Layers, Cpu, Radio, GitBranch, Box, Lock, Monitor } from 'lucide-react';
import LandingLayout from '../../components/landing/LandingLayout';
import profile from '../../assets/profile.png';
import useScrollReveal from '../../hooks/useScrollReveal';

/* ─── Data ────────────────────────────────────────── */

const EXPERIENCE = [
  {
    role: "Web Developer",
    company: "IT Artificer",
    type: "Full-time",
    period: "Nov 2025 – Present",
    desc: [
      "Delivered responsive and scalable MERN stack web applications with end-to-end functionality.",
      "Built modern front-end interfaces using React.js with a focus on reusability and performance.",
      "Engineered backend services using Node.js and Express.js with RESTful APIs.",
      "Designed MongoDB schemas and handled efficient CRUD operations.",
      "Implemented JWT-based authentication and protected application routes.",
      "Mentored interns and students on professional web development practices."
    ],
    highlight: true
  },
  {
    role: "Project Assistant",
    company: "Khyber Pakhtunkhwa Government Servants Housing Foundation",
    type: "Full-time",
    period: "Jul 2025 – Oct 2025",
    desc: [
      "Supported digital workflow automation and internal system modernization initiatives.",
      "Maintained data integrity, documentation, and web-based operational records."
    ]
  },
  {
    role: "Web Developer Intern",
    company: "Abasyn University",
    type: "Internship",
    period: "Dec 2024 – Feb 2025",
    desc: [
      "Developed web-based applications using modern frontend and backend technologies.",
      "Implemented modular UI components and optimized REST API integrations."
    ]
  }
];

const SKILLS_DATA = [
    { category: 'Frontend', icon: Code2, color: '#3b82f6', items: ['React.js', 'Redux/Context API', 'HTML5 & CSS3', 'Tailwind/CSS Modules', 'JavaScript (ES6+)', 'TypeScript', 'Responsive Design', 'Material UI', 'Framer Motion'] },
    { category: 'Backend', icon: Server, color: '#10b981', items: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT Authentication', 'Middleware Design', 'Microservices Architecture', 'Server-Side Rendering', 'Socket.io', 'GraphQL'] },
    { category: 'Database', icon: Database, color: '#f59e0b', items: ['MongoDB', 'Mongoose ODM', 'Schema Design', 'Aggregation Pipelines', 'Data Indexing', 'PostgreSQL Basics', 'Redis Caching'] },
    { category: 'Scripting', icon: Terminal, color: '#ef4444', items: ['Python', 'Shell Scripting', 'Automation Bots', 'Data Scraping', 'File Manipulation', 'CRON Jobs', 'Bash'] },
    { category: 'Cloud', icon: Cloud, color: '#8b5cf6', items: ['AWS Basics', 'Vercel Deployment', 'Netlify', 'Cloudinary', 'Docker Basics', 'CI/CD Pipelines', 'Environment Management'] },
    { category: 'Networking', icon: Network, color: '#ec4899', items: ['TCP/IP Model', 'HTTP/HTTPS Protocols', 'DNS Management', 'Load Balancing', 'WebSockets', 'Firewall Basics', 'SSH'] },
    { category: 'Tools', icon: Wrench, color: '#6366f1', items: ['Git & GitHub', 'Postman/Insomnia', 'VS Code', 'Figma (UI Review)', 'Jira/Trello', 'Webpack/Vite', 'ESLint/Prettier'] },
];

/* ─── Components ──────────────────────────────────── */

const SectionTitle = ({ children }) => (
  <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: 32, textAlign: 'center' }}>
    {children}
  </h2>
);

const ContactBtn = ({ icon: Icon, label, href, color, primary }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    data-cursor-hover
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '12px 24px', borderRadius: 12,
      background: primary ? color : 'var(--bg-secondary)',
      border: primary ? 'none' : `1px solid var(--border)`,
      color: primary ? '#fff' : 'var(--text-primary)',
      fontSize: 14, fontWeight: 600,
      textDecoration: 'none', transition: 'all 0.2s',
      boxShadow: primary ? `0 4px 14px ${color}50` : 'none'
    }}
    onMouseEnter={e => {
        if(!primary) {
             e.currentTarget.style.borderColor = color;
             e.currentTarget.style.color = color;
        }
        e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={e => {
        if(!primary) {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.color = 'var(--text-primary)';
        }
        e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    <Icon size={18} /> {label}
  </a>
);

const ExperienceCard = ({ role, company, type, period, desc, highlight, delay }) => {
  const ref = useScrollReveal({ threshold: 0.1, delay });
  return (
    <div ref={ref} style={{ padding: '32px', borderRadius: 20, background: highlight ? 'var(--bg-card)' : 'transparent', border: highlight ? '1px solid var(--accent)' : '1px solid var(--border)', position: 'relative', boxShadow: highlight ? '0 10px 40px -10px rgba(0,0,0,0.1)' : 'none' }}>
      {highlight && <div style={{ position: 'absolute', top: -12, right: 32, background: 'var(--accent)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 50, letterSpacing: 0.5 }}>CURRENT</div>}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{role}</h3>
          <div style={{ fontSize: 15, color: 'var(--accent)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
            {company}
          </div>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
          <div style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{period}</div>
          <div style={{ padding: '2px 8px', borderRadius: 6, background: 'var(--bg-primary)', border: '1px solid var(--border)', fontSize: 11 }}>{type}</div>
        </div>
      </div>
      <ul style={{ paddingLeft: 18, margin: 0 }}>
        {desc.map((d, i) => (
          <li key={i} style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 8, lineHeight: 1.7 }}>{d}</li>
        ))}
      </ul>
    </div>
  );
};

/* ─── Main Page ───────────────────────────────────── */
const DeveloperPage = () => {
    const heroRef = useScrollReveal({ threshold: 0.1 });
    const summaryRef = useScrollReveal({ threshold: 0.1, delay: 0.1 });
    const skillsRef = useScrollReveal({ threshold: 0.1 });
    const certRef = useScrollReveal({ threshold: 0.1 });

    const [activeTab, setActiveTab] = useState('All');

    const filteredSkills = activeTab === 'All' 
        ? SKILLS_DATA 
        : SKILLS_DATA.filter(s => s.category === activeTab);

    return (
        <LandingLayout>
            <div style={{ fontFamily: 'var(--font-sans)', paddingBottom: 100 }}>

                {/* 1️⃣ Hero Section */}
                <section ref={heroRef} style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px 60px', textAlign: 'center' }}>
                    
                    {/* Profile Image */}
                    <div style={{ width: 150, height: 150, borderRadius: '50%', border: '4px solid var(--bg-card)', boxShadow: '0 0 0 2px var(--border), 0 20px 40px -10px rgba(0,0,0,0.1)', margin: '0 auto 28px', overflow: 'hidden', background: '#f0f0f0' }}>
                         <img 
                            src={profile} 
                            alt="Aamir Ullah" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    <h1 style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12, letterSpacing: '-1.5px' }}>
                        Aamir Ullah
                    </h1>
                    <div style={{ fontSize: 20, color: 'var(--accent)', fontWeight: 600, marginBottom: 24, letterSpacing: '-0.5px' }}>
                        Full-Stack Web Developer
                    </div>
                    
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
                        <ContactBtn icon={Github} label="GitHub" href="https://github.com/aamir-ullah-offical" color="#333" />
                        <ContactBtn icon={Linkedin} label="LinkedIn" href="https://www.linkedin.com/in/aamirullahofficial/" color="#0077b5" />
                        <ContactBtn icon={MessageCircle} label="WhatsApp" href="https://wa.me/923113259050" color="#25D366" primary />
                    </div>

                    <div ref={summaryRef} style={{ padding: '32px', borderRadius: 24, background: 'var(--bg-secondary)', border: '1px solid var(--border)', textAlign: 'left', maxWidth: 800, margin: '0 auto' }}>
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ width: 6, height: 24, background: 'var(--accent)', borderRadius: 4 }} />
                            Professional Summary
                        </h3>
                        <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 0 }}>
                            Results-driven Computer Systems Engineer and Full-Stack Developer with deep expertise in the MERN stack (MongoDB, Express, React, Node.js). Passionate about architecting scalable web solutions and optimizing backend performance. Proven ability to translate complex requirements into clean, maintainable code. Committed to continuous learning and implementing modern web standards to deliver exceptional user experiences.
                        </p>
                    </div>
                </section>

                {/* 2️⃣ Skills Section (Toggle Filter) */}
                <section ref={skillsRef} style={{ maxWidth: 1000, margin: '0 auto 80px', padding: '0 24px' }}>
                    <SectionTitle>Technical Expertise</SectionTitle>
                    
                    {/* Filter Tabs */}
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
                        {['All', 'Frontend', 'Backend', 'Database', 'Scripting', 'Cloud', 'Networking', 'Tools'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                data-cursor-hover
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: 50,
                                    border: activeTab === tab ? '1px solid var(--accent)' : '1px solid var(--border)',
                                    background: activeTab === tab ? 'var(--accent)' : 'transparent',
                                    color: activeTab === tab ? '#fff' : 'var(--text-secondary)',
                                    fontSize: 14,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    outline: 'none'
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Skill Grid */}
                    <div key={activeTab} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
                        {filteredSkills.map((skill, idx) => {
                            const Icon = skill.icon;
                            // Staggered delay for "load with scroll" feel
                            const delayStr = `${idx * 100}ms`;
                            
                            return (
                                <div 
                                    key={skill.category} 
                                    className="skill-card-hover"
                                    style={{ 
                                        padding: '24px', 
                                        borderRadius: 20, 
                                        background: 'var(--bg-secondary)', 
                                        border: '1px solid var(--border)', 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        gap: 16, 
                                        animation: `fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards`,
                                        opacity: 0, // start hidden for animation
                                        animationDelay: delayStr,
                                        transform: 'translateY(20px)', // start offset
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                                        e.currentTarget.style.borderColor = skill.color;
                                        e.currentTarget.style.boxShadow = `0 10px 30px -10px ${skill.color}30`;
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                        e.currentTarget.style.borderColor = 'var(--border)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: skill.color }}>
                                            <Icon size={22} />
                                        </div>
                                        <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }}>{skill.category}</h3>
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                        {skill.items.map(item => (
                                            <span key={item} style={{ fontSize: 13, padding: '6px 14px', borderRadius: 8, background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontWeight: 500 }}>
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 3️⃣ Experience Section */}
                 <section style={{ maxWidth: 800, margin: '0 auto 80px', padding: '0 24px' }}>
                    <SectionTitle>Professional Experience</SectionTitle>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                        {EXPERIENCE.map((exp, idx) => (
                            <ExperienceCard key={idx} {...exp} delay={idx * 0.15} />
                        ))}
                    </div>
                </section>

                 {/* 4️⃣ Certifications */}
                 <section ref={certRef} style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
                    <SectionTitle>Certifications</SectionTitle>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                        <div style={{ padding: '20px', borderRadius: 16, background: 'var(--bg-secondary)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 16, transition: 'transform 0.3s ease' }} 
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#1877F215', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1877F2', fontWeight: 800, fontSize: 20 }}>M</div>
                            <div>
                                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>Meta Front-End Developer</div>
                                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Meta</div>
                            </div>
                        </div>
                        <div style={{ padding: '20px', borderRadius: 16, background: 'var(--bg-secondary)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 16, transition: 'transform 0.3s ease' }}
                             onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                             onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#052FAD15', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#052FAD', fontWeight: 800, fontSize: 20 }}>I</div>
                            <div>
                                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>Backend Development</div>
                                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>IBM</div>
                            </div>
                        </div>
                        <div style={{ padding: '20px', borderRadius: 16, background: 'var(--bg-secondary)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 16, transition: 'transform 0.3s ease' }}
                             onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                             onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#ff3e0015', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff3e00', fontWeight: 800, fontSize: 20 }}>B</div>
                            <div>
                                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>API Integration</div>
                                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Board Infinity</div>
                            </div>
                        </div>
                        <div style={{ padding: '20px', borderRadius: 16, background: 'var(--bg-secondary)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 16, transition: 'transform 0.3s ease' }}
                             onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                             onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#10b98115', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', fontWeight: 800, fontSize: 20 }}>C</div>
                            <div>
                                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>Cloud Computing & Networking</div>
                                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Corvit Peshawar</div>
                            </div>
                        </div>
                    </div>
                </section>

                <style>{`
                    @keyframes fadeInUp {
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}</style>

            </div>
        </LandingLayout>
    );
};

export default DeveloperPage;
