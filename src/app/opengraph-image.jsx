import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'OpelSoft LLC';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '50px' }}>
          <div style={{
            display: 'flex',
            width: '120px',
            height: '120px',
            background: '#ffffff',
            borderRadius: '24px',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}>
            <svg width="90" height="90" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="0,0 200,0 100,100" fill="#7FBA00" />
              <polygon points="200,0 200,200 100,100" fill="#00A4EF" />
              <polygon points="200,200 0,200 100,100" fill="#FFB900" />
              <polygon points="0,200 0,0 100,100" fill="#F25022" />
              <circle cx="100" cy="100" r="66" fill="#ffffff" />
              <path d="M116 48 L74 106 L94 106 L84 152 L130 90 L106 90 Z" fill="#4F46E5" />
            </svg>
          </div>
          <div style={{ fontSize: '110px', fontWeight: 800, color: '#ffffff', letterSpacing: '-2px' }}>
            OpelSoft
          </div>
        </div>
        
        <div style={{ fontSize: '32px', fontWeight: 600, color: '#a1a1aa', letterSpacing: '8px', textTransform: 'uppercase', marginBottom: '24px' }}>
          OPELSOFT LLC
        </div>
        
        <div style={{ fontSize: '56px', fontWeight: 700, color: '#ffffff', textAlign: 'center', lineHeight: 1.2, maxWidth: '900px' }}>
          Drive Efficiency with AI-Powered Workforce Solutions
        </div>
        
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'linear-gradient(90deg, #1e50ff 0%, #8b5cf6 100%)' }}></div>
      </div>
    ),
    { ...size }
  );
}
