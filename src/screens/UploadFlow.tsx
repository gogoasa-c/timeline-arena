import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { MemoryType, Submission } from '../types';

const MEMORY_TYPES: MemoryType[] = ['Match', 'Event', 'Athletics', 'Concert', 'Opening', 'Demolition', 'Other'];

type Step = 'photo' | 'form' | 'success';

interface UploadFlowProps {
  year: number;
  onClose: () => void;
  onSuccess: () => void;
  onSubmit: (submission: Submission) => void;
}

function UploadModal({ year, onClose, onSuccess, onSubmit }: UploadFlowProps) {
  const [step, setStep] = useState<Step>('photo');
  const [photo, setPhoto] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [memory, setMemory] = useState('');
  const [type, setType] = useState<MemoryType>('Match');
  const [memYear, setMemYear] = useState(String(year));
  const fileRef = useRef<HTMLInputElement>(null);

  const progress = step === 'photo' ? 33 : step === 'form' ? 66 : 100;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    onSubmit({
      id: `user-${Date.now()}`,
      year: parseInt(memYear) || year,
      title,
      memory,
      type,
      author: 'You',
      authorInitials: 'YO',
      likes: 0,
      photo: photo ?? undefined,
    });
    setStep('success');
  };

  return (
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
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div style={{
        background: 'var(--bg-2)',
        borderTop: '1px solid var(--border)',
        borderRadius: '20px 20px 0 0',
        padding: '24px',
        maxHeight: '85vh',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}>
        {/* Handle + Header */}
        <div>
          <div style={{
            width: '36px',
            height: '4px',
            background: 'var(--border-strong)',
            borderRadius: '2px',
            margin: '0 auto 20px',
          }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px' }}>
              {step === 'success' ? 'Memory Submitted' : 'Share a Memory'}
            </h3>
            <button
              onClick={onClose}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'var(--bg-3)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                color: 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Progress bar */}
        {step !== 'success' && (
          <div style={{ display: 'flex', gap: '4px' }}>
            {([33, 66, 100] as const).map((p) => (
              <div
                key={p}
                style={{
                  flex: 1,
                  height: '2px',
                  borderRadius: '1px',
                  background: progress >= p ? 'var(--accent)' : 'var(--border)',
                  transition: 'background 0.3s',
                }}
              />
            ))}
          </div>
        )}

        {/* Steps */}
        {step === 'photo' && (
          <PhotoStep
            photo={photo}
            fileRef={fileRef}
            onFileChange={handleFile}
            onContinue={() => setStep('form')}
          />
        )}

        {step === 'form' && (
          <FormStep
            memYear={memYear}
            setMemYear={setMemYear}
            title={title}
            setTitle={setTitle}
            memory={memory}
            setMemory={setMemory}
            type={type}
            setType={setType}
            onBack={() => setStep('photo')}
            onSubmit={handleSubmit}
          />
        )}

        {step === 'success' && (
          <SuccessStep year={parseInt(memYear) || year} onDone={onSuccess} />
        )}
      </div>
    </div>
  );
}

function PhotoStep({
  photo,
  fileRef,
  onFileChange,
  onContinue,
}: {
  photo: string | null;
  fileRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContinue: () => void;
}) {
  return (
    <>
      <input ref={fileRef} type="file" accept="image/*" onChange={onFileChange} style={{ display: 'none' }} />

      {/* Drop zone */}
      <button
        onClick={() => fileRef.current?.click()}
        style={{
          width: '100%',
          minHeight: '220px',
          border: '1px dashed var(--accent-border)',
          borderRadius: 'var(--radius-md)',
          background: photo ? 'transparent' : 'rgba(212,168,67,0.03)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer',
          overflow: 'hidden',
          padding: 0,
          transition: 'background 0.15s',
        }}
        onMouseEnter={(e) => !photo && (e.currentTarget.style.background = 'rgba(212,168,67,0.07)')}
        onMouseLeave={(e) => !photo && (e.currentTarget.style.background = 'rgba(212,168,67,0.03)')}
      >
        {photo ? (
          <img src={photo} alt="Preview" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
        ) : (
          <>
            <span style={{ fontSize: '24px', color: 'var(--text-muted)' }}>+</span>
            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Tap to select a photo</span>
            <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>From your camera roll or family album</span>
          </>
        )}
      </button>

      <PrimaryButton onClick={onContinue}>Continue →</PrimaryButton>
      <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-dim)', marginTop: '-8px' }}>
        No photo? You can still add a written memory
      </div>
    </>
  );
}

function FormStep({
  memYear, setMemYear,
  title, setTitle,
  memory, setMemory,
  type, setType,
  onBack, onSubmit,
}: {
  memYear: string; setMemYear: (v: string) => void;
  title: string; setTitle: (v: string) => void;
  memory: string; setMemory: (v: string) => void;
  type: MemoryType; setType: (v: MemoryType) => void;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border)',
    background: 'var(--bg-3)',
    color: 'var(--text)',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.15s',
  };

  return (
    <>
      <FieldGroup label="YEAR">
        <input
          type="number"
          value={memYear}
          onChange={(e) => setMemYear(e.target.value)}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = 'var(--accent-border)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
        />
      </FieldGroup>

      <FieldGroup label="TITLE">
        <input
          type="text"
          placeholder="e.g. My first derby match, 1968"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = 'var(--accent-border)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
        />
      </FieldGroup>

      <FieldGroup label="YOUR MEMORY">
        <textarea
          placeholder="Share what you remember — the atmosphere, who you were with, what made it special…"
          value={memory}
          onChange={(e) => setMemory(e.target.value)}
          rows={4}
          style={{
            ...inputStyle,
            resize: 'vertical',
            minHeight: '100px',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--accent-border)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
        />
      </FieldGroup>

      <FieldGroup label="TYPE">
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {MEMORY_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              style={{
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                border: `1px solid ${type === t ? 'var(--accent)' : 'var(--border)'}`,
                background: type === t ? 'var(--accent)' : 'transparent',
                color: type === t ? '#0a0908' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </FieldGroup>

      <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
        <button
          onClick={onBack}
          style={{
            flex: 1,
            padding: '13px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            background: 'transparent',
            color: 'var(--text-muted)',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'border-color 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
          ← Back
        </button>
        <button
          onClick={onSubmit}
          disabled={!title.trim()}
          style={{
            flex: 2,
            padding: '13px',
            borderRadius: 'var(--radius-lg)',
            border: 'none',
            background: title.trim() ? 'var(--accent)' : 'var(--bg-4)',
            color: title.trim() ? '#0a0908' : 'var(--text-dim)',
            fontSize: '14px',
            fontWeight: 500,
            cursor: title.trim() ? 'pointer' : 'not-allowed',
            transition: 'all 0.15s',
          }}
        >
          Review →
        </button>
      </div>
    </>
  );
}

function SuccessStep({ year, onDone }: { year: number; onDone: () => void }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      padding: '24px 0',
      textAlign: 'center',
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'var(--bg-3)',
        border: '1px solid var(--accent-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 12L10 17L19 8" stroke="#d4a843" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div>
        <h4 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '22px',
          fontWeight: 700,
          marginBottom: '8px',
        }}>
          Memory submitted
        </h4>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Your contribution has been added to the {year} archive.<br />
          Thank you for preserving this moment.
        </p>
      </div>
      <PrimaryButton onClick={onDone} style={{ width: '100%', marginTop: '8px' }}>
        Back to Timeline
      </PrimaryButton>
    </div>
  );
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{
        fontSize: '10px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  style,
}: {
  children: React.ReactNode;
  onClick: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '14px',
        borderRadius: 'var(--radius-lg)',
        border: 'none',
        background: 'var(--accent)',
        color: '#0a0908',
        fontSize: '14px',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'opacity 0.15s',
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
    >
      {children}
    </button>
  );
}

export function UploadFlow(props: UploadFlowProps) {
  return createPortal(<UploadModal {...props} />, document.body);
}
