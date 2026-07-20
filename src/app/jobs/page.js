import Script from 'next/script';
import JobIntakeForm from '@/components/JobIntakeForm';
import Decor from '@/components/ui/Decor';
import Reveal from '@/components/ui/Reveal';

export const metadata = {
  title: 'Find Jobs',
  description: 'Share your details and our team will match you with the right opportunities, with a response within 1 working day.',
  alternates: {
    canonical: '/jobs',
  },
  openGraph: {
    title: 'Find Jobs | OpelSoft',
    description: 'Share your details and our team will match you with the right opportunities.',
    url: '/jobs',
  }
};

const BENEFITS = [
  { tint: '#4F46E5', title: 'Roles matched to you', body: 'We align live openings to your skills, experience, and goals.', icon: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></> },
  { tint: '#7C3AED', title: 'Fortune 500 clients', body: 'Access opportunities with leading enterprises across the US.', icon: <><path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" /></> },
  { tint: '#0EA5E9', title: 'A real recruiter', body: 'Personal guidance from submission all the way to offer.', icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /></> },
  { tint: '#10B981', title: 'A fast response', body: 'Our team reviews and contacts you within 1 working day.', icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></> },
];

export default function JobsPage() {
  return (
    <div style={{ background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
      <section className="op-mesh" style={{ position: 'relative', borderBottom: '1px solid var(--border-color)', padding: '72px 0 80px', overflow: 'hidden' }}>
        <Decor variant="a" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '52px', alignItems: 'start' }}>

            {/* LEFT - value + benefits */}
            <Reveal>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--op-indigo)', fontWeight: '700', marginBottom: '16px' }}>For Candidates</div>
              <h1 style={{ fontSize: 'clamp(2.2rem, 4.6vw, 3.4rem)', fontWeight: '800', letterSpacing: '-0.04em', lineHeight: '1.06', marginBottom: '18px' }}>
                Find your next role with <span className="op-grad-text">OpelSoft</span>
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.12rem', lineHeight: '1.6', maxWidth: '520px', marginBottom: '32px' }}>
                Share a few details and our recruiters will match you with the right opportunities, then get in touch within 1 working day.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '520px' }}>
                {BENEFITS.map((b) => (
                  <div key={b.title} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                    <span className="op-icon" style={{ flexShrink: 0, width: '46px', height: '46px', borderRadius: '13px', background: `${b.tint}16` }}>
                      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={b.tint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{b.icon}</svg>
                    </span>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '1.02rem', letterSpacing: '-0.01em' }}>{b.title}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', marginTop: '2px' }}>{b.body}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '28px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', background: '#fff', border: '1px solid var(--border-color)', borderRadius: '30px', padding: '8px 16px', boxShadow: 'var(--shadow-sm)' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--op-indigo)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                All work authorizations welcome, OPT, CPT, H-1B, Green Card &amp; U.S. Citizen
              </div>
            </Reveal>

            {/* RIGHT - live job listings */}
            <Reveal delay={2}>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '20px' }}>
                Open positions
              </h2>
              {/*
                Widget mount. data-site is intentionally set on both this container
                and the widget Script: the widget renders with the current build today
                and upgrades to in-place rendering here once its container support ships.
              */}
              <div data-staffingos-jobs data-site="opelsoft"></div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* Lead capture - for candidates without a matching role */}
      <section style={{ padding: '72px 0 80px' }}>
        <div className="container">
          <Reveal>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '8px', textAlign: 'center' }}>
              Don&apos;t see a role that fits? Send us your details.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6', textAlign: 'center', maxWidth: '560px', margin: '0 auto 32px' }}>
              Share a few details and our recruiters will reach out within 1 working day.
            </p>
            <div style={{ maxWidth: '560px', margin: '0 auto' }}>
              <JobIntakeForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/*
        Load the listings widget once, on this route only. data-site matches the
        mount container above; see the note there on why it appears in both places.
      */}
      <Script
        src={`${process.env.NEXT_PUBLIC_STAFFINGOS_ORIGIN}/widget.js`}
        data-site="opelsoft"
        strategy="afterInteractive"
      />
    </div>
  );
}
