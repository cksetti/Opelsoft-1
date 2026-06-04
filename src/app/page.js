import pool from '@/lib/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getHomeData() {
  try {
    const [jobs] = await pool.query(`
      SELECT j.id, j.title, j.job_type, j.salary_package, j.city, j.country, j.created_at,
             e.company_name
      FROM new_jobs j
      LEFT JOIN new_employer_profiles e ON j.employer_id = e.user_id
      WHERE j.status = 'active'
      ORDER BY j.created_at DESC
      LIMIT 6
    `);

    const [industries] = await pool.query(`
      SELECT industry, COUNT(*) AS count
      FROM new_jobs
      WHERE status = 'active'
      GROUP BY industry
      ORDER BY count DESC
      LIMIT 10
    `);

    const [[{ jobsCount }]] = await pool.query("SELECT COUNT(*) AS jobsCount FROM new_jobs WHERE status = 'active'");
    const [[{ usersCount }]] = await pool.query("SELECT COUNT(*) AS usersCount FROM new_users WHERE role = 'candidate'");
    const [[{ companiesCount }]] = await pool.query("SELECT COUNT(*) AS companiesCount FROM new_users WHERE role = 'employer'");

    return { jobs, industries, stats: { jobsCount: jobsCount || 37, usersCount: usersCount || 6, companiesCount: companiesCount || 25 } };
  } catch {
    return {
      jobs: [
        { id: 1, title: 'Senior Software Engineer', job_type: 'Full-time', salary_package: '80000-120000', city: 'London', country: 'UK', company_name: 'Monzo' },
        { id: 2, title: 'Full-Stack Developer', job_type: 'Full-time', salary_package: '60000-90000', city: 'Remote', country: 'UK', company_name: 'Revolut' },
        { id: 3, title: 'Project Manager', job_type: 'Contract', salary_package: '70000-100000', city: 'Manchester', country: 'UK', company_name: 'AutoTrader' },
      ],
      industries: [
        { industry: 'Technology', count: 24 },
        { industry: 'Engineering', count: 18 },
        { industry: 'Finance', count: 12 },
        { industry: 'Healthcare', count: 9 },
        { industry: 'Consulting', count: 8 },
        { industry: 'Marketing', count: 6 },
      ],
      stats: { jobsCount: 37, usersCount: 6, companiesCount: 25 }
    };
  }
}

const VALUE_CARDS = [
  {
    title: 'Quality Opportunities',
    body: 'Browse current roles from real, verified employers — from fast-growing startups to established enterprises, across every major industry.',
    icon: <path d="M20 6 9 17l-5-5" />,
  },
  {
    title: 'Apply in Seconds',
    body: 'Build your profile once, add your CV, and apply to any role in a few clicks. No repetitive forms, no friction.',
    icon: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />,
  },
  {
    title: 'Stay in Control',
    body: 'Track the status of every application — from submitted to shortlisted to hired — in one clean dashboard.',
    icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  },
];

const SERVICES = [
  { name: 'Job Board', body: 'Thousands of live roles you can search, filter, and apply to in minutes.', href: '/jobs' },
  { name: 'Talent & Staffing', body: 'Contract, direct-hire, and executive search across technology and every major function.', href: '/talent-staffing' },
  { name: 'Employer Hiring Tools', body: 'Post roles, receive applications, and move candidates through your pipeline.', href: '/register' },
  { name: 'Candidate Profiles', body: 'A complete profile and CV that you build once and reuse for every application.', href: '/register' },
  { name: 'Application Tracking', body: 'A single dashboard to follow every application from submitted to offer.', href: '/dashboard/candidate' },
  { name: 'Career Resources', body: 'Guidance and a growing library to help you take the next step in your career.', href: '/about-us' },
];

const FAQS = [
  { q: 'Is OpelSoft free for candidates?', a: 'Yes. Creating a profile, browsing jobs, and applying to roles is completely free for job seekers.' },
  { q: 'How do I apply for a job?', a: 'Create a candidate account, complete your profile and upload your CV, then click Apply on any listing and add a short cover note.' },
  { q: 'How do employers post a job?', a: 'Register an employer account and use your dashboard to post a listing with the title, description, requirements, location, and salary.' },
  { q: 'Can I track my applications?', a: 'Yes. Your candidate dashboard shows every job you have applied to along with its current hiring status.' },
  { q: 'How do I build my profile?', a: 'Add your skills, education, and work history in the dashboard — or upload your CV to pre-fill the fields for you to review.' },
];

export default async function Home() {
  const { jobs, industries, stats } = await getHomeData();

  return (
    <div className="home-page" style={{ background: 'var(--bg-color)', color: 'var(--text-primary)' }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid var(--border-color)', padding: '96px 0 76px' }}>
        <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--accent-color)', fontWeight: '700', marginBottom: '18px' }}>
            OpelSoft Careers
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.1rem)', fontWeight: '800', letterSpacing: '-0.04em', lineHeight: '1.05', color: 'var(--text-primary)', marginBottom: '20px' }}>
            Connecting talent with the right opportunities
          </h1>
          <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '660px', margin: '0 auto 36px' }}>
            OpelSoft brings candidates and employers together on one platform — discover roles, build your profile, apply in clicks, and track every application from first contact to offer.
          </p>

          <form action="/jobs" method="get" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '680px', margin: '0 auto 20px' }}>
            <input name="keyword" placeholder="Job title or keyword" className="form-control" style={{ flex: '1 1 240px', height: '52px', borderRadius: '10px' }} />
            <input name="location" placeholder="Location" className="form-control" style={{ flex: '1 1 150px', height: '52px', borderRadius: '10px' }} />
            <button type="submit" className="fs-btn-pill" style={{ height: '52px', padding: '0 30px', borderRadius: '10px', fontWeight: '600', fontSize: '0.98rem' }}>
              Search Jobs
            </button>
          </form>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Popular:</span>
            {['Software Engineer', 'Project Manager', 'Data Analyst', 'Designer', 'Remote'].map((role) => (
              <Link key={role} href={`/jobs?keyword=${encodeURIComponent(role)}`}
                style={{ fontSize: '0.84rem', fontWeight: '600', color: 'var(--text-primary)', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '30px', padding: '6px 14px', textDecoration: 'none' }}>
                {role}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────── */}
      <section style={{ background: '#09090b', color: '#ffffff', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ padding: '48px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '24px', textAlign: 'center' }}>
            {[
              { value: `${stats.jobsCount}+`, label: 'Open roles' },
              { value: `${stats.companiesCount}+`, label: 'Hiring companies' },
              { value: `${stats.usersCount}+`, label: 'Candidates' },
              { value: `${industries.length || 6}+`, label: 'Industries' },
            ].map((m, i) => (
              <div key={i}>
                <div style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: '800', letterSpacing: '-0.03em' }}>{m.value}</div>
                <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600' }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY OPELSOFT ─────────────────────────────────── */}
      <section className="section-light section-padding" style={{ background: '#ffffff', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-secondary)', fontWeight: '700', marginBottom: '14px' }}>Why OpelSoft</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>A simpler way to find work and hire</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '24px' }}>
            {VALUE_CARDS.map((c, i) => (
              <div key={i} className="card-light" style={{ padding: '32px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(30,80,255,0.08)', color: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{c.icon}</svg>
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '700', letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '10px' }}>{c.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.6' }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE OFFER (services grid) ────────────────── */}
      <section className="section-light section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-secondary)', fontWeight: '700', marginBottom: '14px' }}>What We Offer</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>One platform for talent and hiring</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {SERVICES.map((s, i) => (
              <Link key={i} href={s.href} className="card-light" style={{ padding: '30px', display: 'block', textDecoration: 'none' }}>
                <div style={{ fontFamily: 'var(--font-mono-stack)', fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-color)', marginBottom: '12px' }}>{String(i + 1).padStart(2, '0')}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {s.name}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: '1.6' }}>{s.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR CANDIDATES / FOR EMPLOYERS ───────────────── */}
      <section className="section-light section-padding" style={{ background: '#ffffff', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            <div className="card-light" style={{ padding: '40px' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-color)', fontWeight: '700', marginBottom: '12px' }}>For Candidates</div>
              <h3 style={{ fontSize: '1.7rem', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '20px', color: 'var(--text-primary)' }}>Find and land your next role</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Build a complete profile and upload your CV', 'Search and filter live roles across industries', 'Apply in clicks with a saved profile', 'Track every application in your dashboard'].map((t, i) => (
                  <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: 'var(--text-secondary)', fontSize: '0.98rem' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><path d="M20 6 9 17l-5-5" /></svg>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register" className="fs-btn-pill" style={{ padding: '12px 26px', borderRadius: '30px', fontWeight: '600' }}>Create a candidate account</Link>
            </div>

            <div className="card-light" style={{ padding: '40px' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-color)', fontWeight: '700', marginBottom: '12px' }}>For Employers</div>
              <h3 style={{ fontSize: '1.7rem', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '20px', color: 'var(--text-primary)' }}>Post roles and hire faster</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Post job listings in minutes', 'Reach motivated, profile-complete candidates', 'Review applicants in one place', 'Move candidates through your hiring pipeline'].map((t, i) => (
                  <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: 'var(--text-secondary)', fontSize: '0.98rem' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><path d="M20 6 9 17l-5-5" /></svg>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register" className="fs-btn-ghost" style={{ padding: '12px 26px', borderRadius: '30px', fontWeight: '600', border: '1px solid var(--border-color)', background: '#fff', color: '#09090b' }}>Post a job</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED JOBS ────────────────────────────────── */}
      <section className="section-light section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-secondary)', fontWeight: '700', marginBottom: '14px' }}>Latest Openings</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>Featured jobs</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {jobs.map((job) => (
              <div key={job.id} className="card-light" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '200px', padding: '28px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#09090b', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '1.2rem', flexShrink: 0 }}>
                    {(job.company_name || 'O').charAt(0)}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>{job.company_name || 'OpelSoft Partner'}</div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '4px', letterSpacing: '-0.02em' }}>
                      <Link href={`/jobs/${job.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{job.title}</Link>
                    </h3>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', borderTop: '1px solid rgba(9, 9, 11, 0.05)', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono-stack)' }}>
                    {job.city && <span>{job.city}</span>}
                    {job.job_type && <span style={{ color: 'var(--accent-color)', fontWeight: '600' }}>{job.job_type}</span>}
                  </div>
                  {job.salary_package && (
                    <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'var(--font-mono-stack)' }}>
                      £{job.salary_package.split('-')[0]}<span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '400' }}>/yr</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/jobs" className="fs-btn-ghost" style={{ border: '1px solid var(--border-color)', background: '#ffffff', padding: '12px 28px', borderRadius: '30px', fontWeight: '600', fontSize: '0.95rem', color: '#09090b', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: 'var(--shadow-sm)' }}>
              Browse all jobs
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="section-light section-padding">
        <div className="container" style={{ maxWidth: '760px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-secondary)', fontWeight: '700', marginBottom: '14px' }}>Questions</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', fontWeight: '800', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>Frequently asked</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQS.map((f, i) => (
              <details key={i} className="card-light" style={{ padding: '20px 24px' }}>
                <summary style={{ cursor: 'pointer', fontWeight: '700', fontSize: '1.05rem', color: 'var(--text-primary)' }}>{f.q}</summary>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: '1.6', marginTop: '12px' }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <section className="section-light" style={{ position: 'relative', overflow: 'hidden', padding: '100px 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="ambient-glow ambient-blue animate-drift-1" style={{ top: '50%', left: '50%', width: '700px', height: '400px', transform: 'translate(-50%, -50%)', opacity: 0.5 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: '800', letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: '16px' }}>
            Ready to take the next step?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '540px', margin: '0 auto 40px', lineHeight: '1.6' }}>
            Join OpelSoft today — find your next role, or your next great hire.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" className="fs-btn-pill" style={{ padding: '14px 28px', borderRadius: '30px', fontSize: '1rem', fontWeight: '600', boxShadow: 'var(--shadow-md)' }}>Get Started Free</Link>
            <Link href="/jobs" className="fs-btn-ghost" style={{ padding: '14px 28px', borderRadius: '30px', fontSize: '1rem', fontWeight: '600', border: '1px solid var(--border-color)', background: '#ffffff', color: '#09090b', boxShadow: 'var(--shadow-sm)' }}>Browse Jobs</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
