import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'kurdi.ch — Kurdî Fêr Bibe';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f97316 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '40px',
            padding: '60px 80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div style={{ fontSize: '100px' }}>🦋</div>
          <div
            style={{
              fontSize: '72px',
              fontWeight: 900,
              color: 'white',
              letterSpacing: '-2px',
            }}
          >
            kurdi.ch
          </div>
          <div
            style={{
              fontSize: '32px',
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 600,
            }}
          >
            Kurdî Fêr Bibe — Kurmanci lernen
          </div>
          <div
            style={{
              display: 'flex',
              gap: '20px',
              marginTop: '10px',
              fontSize: '40px',
            }}
          >
            <span>📚</span>
            <span>🎮</span>
            <span>⭐</span>
            <span>🔊</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
