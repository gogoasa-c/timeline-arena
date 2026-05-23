import { memo, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { SUBMISSIONS, ALL_MEMORY_TYPES } from '../data';
import type { Submission, MemoryType } from '../types';

type FilterType = typeof ALL_MEMORY_TYPES[number];

export const ArchiveScreen = memo(function ArchiveScreen({
  extraSubmissions = [],
}: {
  extraSubmissions?: Submission[];
}) {
  const [filter, setFilter] = useState<FilterType>('All');
  const [selectedPost, setSelectedPost] = useState<Submission | null>(null);

  const allSubmissions = useMemo(
    () => [...extraSubmissions, ...SUBMISSIONS],
    [extraSubmissions]
  );

  const filtered = useMemo(() => {
    if (filter === 'All') return allSubmissions;
    return allSubmissions.filter((s) => s.type === (filter as MemoryType));
  }, [filter, allSubmissions]);

  const byYear = useMemo(() => {
    const map = new Map<number, Submission[]>();
    filtered.forEach((s) => {
      const arr = map.get(s.year) ?? [];
      arr.push(s);
      map.set(s.year, arr);
    });
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [filtered]);

  return (
    <div
      className="screen-enter"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '24px 28px 0',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '28px',
          fontWeight: 700,
        }}>
          Community Archive
        </h2>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', paddingTop: '6px' }}>
          {filtered.length} {filtered.length === 1 ? 'memory' : 'memories'}
        </span>
      </div>

      {/* Filter pills */}
      <div style={{
        padding: '16px 28px',
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        flexShrink: 0,
        borderBottom: '1px solid var(--border)',
      }}>
        {ALL_MEMORY_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            style={{
              padding: '5px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              border: `1px solid ${filter === t ? 'var(--accent)' : 'var(--border)'}`,
              background: filter === t ? 'var(--accent)' : 'transparent',
              color: filter === t ? '#0a0908' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.15s',
              fontWeight: filter === t ? 500 : 400,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '0 28px 100px' }}>
        {byYear.length === 0 ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
            color: 'var(--text-muted)',
            fontSize: '13px',
          }}>
            No memories found for this filter.
          </div>
        ) : (
          byYear.map(([yr, subs]) => (
            <YearGroup key={yr} year={yr} submissions={subs} onSelect={setSelectedPost} />
          ))
        )}
      </div>

      {selectedPost && (
        <PostDetailModal submission={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
});

function YearGroup({ year, submissions, onSelect }: { year: number; submissions: Submission[]; onSelect: (s: Submission) => void }) {
  return (
    <section style={{ marginTop: '32px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '16px',
      }}>
        <h3 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '26px',
          fontWeight: 700,
        }}>
          {year}
        </h3>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{submissions.length}</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '12px',
      }}>
        {submissions.map((sub) => (
          <MemoryCard key={sub.id} submission={sub} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

function MemoryCard({ submission: s, onSelect }: { submission: Submission; onSelect: (s: Submission) => void }) {
  return (
    <div
      onClick={() => onSelect(s)}
      style={{
        background: 'var(--bg-3)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.15s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      {/* Photo placeholder */}
      {s.photo ? (
        <img src={s.photo} alt={s.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
      ) : (
        <div style={{
          width: '100%',
          height: '160px',
          background: 'var(--bg-4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" opacity="0.2">
            <rect x="3" y="7" width="26" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="23" cy="10" r="1.5" fill="currentColor"/>
          </svg>
        </div>
      )}

      <div style={{ padding: '14px' }}>
        <div style={{
          fontSize: '10px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '6px',
        }}>
          {s.year} · {s.type}
        </div>
        <h4 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '15px',
          fontWeight: 400,
          lineHeight: 1.3,
          marginBottom: '6px',
        }}>
          {s.title}
        </h4>
        <p style={{
          fontSize: '12px',
          color: 'var(--text-muted)',
          lineHeight: 1.55,
          marginBottom: '12px',
        }}>
          {s.memory.slice(0, 100)}…
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: 600,
              color: '#0a0908',
            }}>
              {s.authorInitials}
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{s.author}</span>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>♥ {s.likes}</span>
        </div>
      </div>
    </div>
  );
}

function PostDetailModal({ submission: s, onClose }: { submission: Submission; onClose: () => void }) {
  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)',
        animation: 'screenFadeIn 0.2s ease',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: 'var(--bg-2)',
        borderTop: '1px solid var(--border)',
        borderRadius: '20px 20px 0 0',
        maxHeight: '90vh',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Handle */}
        <div style={{ padding: '16px 24px 0', flexShrink: 0 }}>
          <div style={{
            width: '36px',
            height: '4px',
            background: 'var(--border-strong)',
            borderRadius: '2px',
            margin: '0 auto',
          }} />
        </div>

        {/* Close button */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '12px',
              right: '16px',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'var(--bg-3)',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Image */}
        {s.photo ? (
          <img
            src={s.photo}
            alt={s.title}
            style={{ width: '100%', height: '220px', objectFit: 'cover', flexShrink: 0, marginTop: '16px' }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '220px',
            background: 'var(--bg-4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: '16px',
          }}>
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none" opacity="0.2">
              <rect x="3" y="7" width="26" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="23" cy="10" r="1.5" fill="currentColor"/>
            </svg>
          </div>
        )}

        {/* Content */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{
            fontSize: '10px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
          }}>
            {s.year} · {s.type}
          </div>

          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '22px',
            fontWeight: 400,
            lineHeight: 1.3,
            margin: 0,
          }}>
            {s.title}
          </h3>

          <p style={{
            fontSize: '14px',
            color: 'var(--text-muted)',
            lineHeight: 1.65,
            margin: 0,
          }}>
            {s.memory}
          </p>

          <div style={{ height: '1px', background: 'var(--border)', margin: '4px 0' }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 600,
                color: '#0a0908',
              }}>
                {s.authorInitials}
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{s.author}</span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>♥ {s.likes}</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
