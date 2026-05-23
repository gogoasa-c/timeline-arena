import { useState } from 'react';

interface ShareButtonProps {
  style?: React.CSSProperties;
  variant?: 'default' | 'action';
}

export function ShareButton({ style, variant = 'default' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const isAction = variant === 'action';

  return (
    <button
      onClick={handleShare}
      title="Copy link to this view"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: isAction ? '6px' : '5px',
        fontSize: isAction ? '12px' : '11px',
        padding: isAction ? '8px 14px' : '5px 11px',
        borderRadius: 'var(--radius-md)',
        border: `1px solid ${copied ? 'var(--accent)' : isAction ? 'var(--accent-border)' : 'var(--border)'}`,
        background: copied
          ? 'var(--accent)'
          : isAction
          ? 'var(--accent-dim)'
          : 'transparent',
        color: copied ? (isAction ? '#0a0908' : 'var(--accent)') : isAction ? 'var(--accent)' : 'var(--text-muted)',
        cursor: 'pointer',
        transition: 'all 0.15s',
        flexShrink: 0,
        backdropFilter: isAction ? 'blur(4px)' : undefined,
        letterSpacing: isAction ? '0.01em' : undefined,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (copied) return;
        e.currentTarget.style.borderColor = 'var(--accent)';
        e.currentTarget.style.background = isAction ? 'rgba(212,168,67,0.15)' : 'var(--accent-dim)';
        e.currentTarget.style.color = 'var(--accent)';
      }}
      onMouseLeave={(e) => {
        if (copied) return;
        e.currentTarget.style.borderColor = isAction ? 'var(--accent-border)' : 'var(--border)';
        e.currentTarget.style.background = isAction ? 'var(--accent-dim)' : 'transparent';
        e.currentTarget.style.color = isAction ? 'var(--accent)' : 'var(--text-muted)';
      }}
    >
      {copied ? (
        <>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {isAction ? 'Link copied!' : 'Copied'}
        </>
      ) : (
        <>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M5 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M8 1h3m0 0v3m0-3L6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Share
        </>
      )}
    </button>
  );
}
