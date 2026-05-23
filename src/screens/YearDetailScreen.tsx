import { memo, useMemo } from 'react';
import { StadiumRing } from '../components/StadiumRing';
import { getYearData, getSubmissionsForYear, getEraPhoto } from '../data';
import type { Screen, Submission } from '../types';

interface YearDetailProps {
  year: number;
  onBack: () => void;
  onNavigate: (s: Screen) => void;
  extraSubmissions?: Submission[];
}

export const YearDetailScreen = memo(function YearDetailScreen({
  year,
  onBack,
  onNavigate,
  extraSubmissions = [],
}: YearDetailProps) {
  const data = useMemo(() => getYearData(year), [year]);
  const eraPhoto = useMemo(() => getEraPhoto(year), [year]);
  const submissions = useMemo(
    () => [
      ...extraSubmissions.filter((s) => s.year === year),
      ...getSubmissionsForYear(year),
    ],
    [year, extraSubmissions]
  );

  return (
    <div
      className="screen-enter"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      {/* Left — stadium visual */}
      <div style={{
        flex: '0 0 40%',
        position: 'relative',
        borderRight: '1px solid var(--border)',
        overflow: 'hidden',
      }}>
        {eraPhoto ? (
          <img
            key={eraPhoto}
            src={eraPhoto}
            alt={`Arena Națională ${year}`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        ) : (
          <StadiumRing opacity={0.25} />
        )}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(10,9,8,0.92) 0%, rgba(10,9,8,0.4) 55%, rgba(10,9,8,0.15) 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          right: '20px',
        }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '4px' }}>
            National Arena · Arena Națională
          </div>
          <div style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px, 6vw, 60px)',
            fontWeight: 700,
            color: 'var(--text)',
            lineHeight: 0.9,
          }}>
            {year}
          </div>
        </div>
      </div>

      {/* Right — detail panel */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '28px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}>
        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            alignSelf: 'flex-start',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: 'var(--text-muted)',
            border: '1px solid var(--border)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-md)',
            background: 'transparent',
            transition: 'border-color 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
          ← Back
        </button>

        {/* Historical Summary */}
        <section>
          <div style={{
            fontSize: '10px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '10px',
          }}>
            Historical Summary
          </div>
          <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text)' }}>
            {data.description}
          </p>
        </section>

        {/* Key Moments */}
        <section>
          <div style={{
            fontSize: '10px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '12px',
          }}>
            Key Moments
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.keyMoments.map((m, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  marginTop: '6px',
                  flexShrink: 0,
                }} />
                <span style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.5 }}>{m}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Community Memories */}
        {submissions.length > 0 && (
          <section>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
            }}>
              <div style={{
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}>
                Community Memories
              </div>
              <button
                onClick={() => onNavigate('archive')}
                style={{
                  fontSize: '11px',
                  color: 'var(--accent)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                View all →
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {submissions.slice(0, 4).map((sub) => (
                <div
                  key={sub.id}
                  style={{
                    background: 'var(--bg-3)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div style={{
                    fontSize: '10px',
                    color: 'var(--accent)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>
                    {sub.year} · {sub.type}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text)', lineHeight: 1.3 }}>
                    {sub.title}
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {sub.memory.slice(0, 80)}…
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
});
