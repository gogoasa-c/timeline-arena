import { memo, useState, useCallback, useEffect } from 'react';
import { HOTSPOTS, getHotspotPhoto } from '../data';
import { readParams, writeParams } from '../hooks/useUrlSync';
import { ShareButton } from '../components/ShareButton';
import type { HotspotSection } from '../types';

const ERA_FILTERS = ['1968', '1990', '2011', '2024'] as const;
type EraFilter = typeof ERA_FILTERS[number];

const ERA_TO_PERIOD: Record<EraFilter, string> = {
  '1968': '1953–1989',
  '1990': '1990–2007',
  '2011': '2011–now',
  '2024': '2011–now',
};

export const HotspotsScreen = memo(function HotspotsScreen({
  year,
}: {
  year: number;
}) {
  const initParams = readParams();
  const initEra = (ERA_FILTERS.includes(initParams.get('era') as EraFilter)
    ? initParams.get('era')
    : '2024') as EraFilter;
  const initHotspot =
    HOTSPOTS.find((h) => h.id === initParams.get('hotspot')) ?? HOTSPOTS[0];

  const [selected, setSelected] = useState<HotspotSection>(initHotspot);
  const [eraFilter, setEraFilter] = useState<EraFilter>(initEra);
  const [selectedPeriod, setSelectedPeriod] = useState<string>(ERA_TO_PERIOD[initEra]);

  useEffect(() => {
    writeParams({ screen: 'hotspots', hotspot: selected.id, era: eraFilter });
  }, [selected.id, eraFilter]);

  const handleEraFilter = useCallback((f: EraFilter) => {
    setEraFilter(f);
    setSelectedPeriod(ERA_TO_PERIOD[f]);
  }, []);

  const handleSelectHotspot = useCallback((h: HotspotSection) => {
    setSelected(h);
    // keep selectedPeriod as-is so the user's period choice persists across hotspot changes
  }, []);

  const photo = getHotspotPhoto(selected.id, selectedPeriod);

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
        padding: '16px 24px 12px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexShrink: 0,
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700 }}>
            Interactive Map
          </h2>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
            {year} · Arena Națională
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {ERA_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => handleEraFilter(f)}
              style={{
                padding: '5px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                border: `1px solid ${eraFilter === f ? 'var(--accent)' : 'var(--border)'}`,
                background: eraFilter === f ? 'var(--accent)' : 'transparent',
                color: eraFilter === f ? '#0a0908' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {f}
            </button>
          ))}
          <div style={{ width: '1px', height: '16px', background: 'var(--border)', margin: '0 2px' }} />
          <ShareButton />
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Stadium map */}
        <div style={{
          flex: '0 0 55%',
          position: 'relative',
          borderRight: '1px solid var(--border)',
          background: '#0c0b09',
        }}>
          <StadiumMap
            hotspots={HOTSPOTS}
            selected={selected}
            onSelect={handleSelectHotspot}
          />
        </div>

        {/* Detail panel */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Photo area */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '180px',
            flexShrink: 0,
            background: 'var(--bg-4)',
            overflow: 'hidden',
          }}>
            {photo ? (
              <img
                key={`${selected.id}-${selectedPeriod}`}
                src={photo}
                alt={`${selected.name} — ${selectedPeriod}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  animation: 'screenFadeIn 0.2s ease',
                }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}>
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" opacity="0.18">
                  <rect x="3" y="7" width="26" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="23" cy="10" r="1.5" fill="currentColor"/>
                </svg>
                <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                  No photo for this period
                </span>
              </div>
            )}

            {/* Gradient fade at bottom */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '40px',
              background: 'linear-gradient(to top, var(--bg-2), transparent)',
              pointerEvents: 'none',
            }} />
          </div>

          {/* Text content */}
          <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{
                fontSize: '10px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '6px',
              }}>
                {selectedPeriod}
              </div>
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '22px',
                fontWeight: 700,
                lineHeight: 1.1,
              }}>
                {selected.name}
              </h3>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>
              {selected.description}
            </p>

            {/* Period tabs — clickable, update selectedPeriod */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {selected.periods.map((p) => {
                const isSelected = selectedPeriod === p.label;
                return (
                  <button
                    key={p.label}
                    onClick={() => p.active && setSelectedPeriod(p.label)}
                    disabled={!p.active}
                    title={p.active ? `View ${p.label}` : `Not present in ${p.label}`}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      border: `1px solid ${
                        isSelected
                          ? 'var(--accent)'
                          : p.active
                          ? 'var(--border-strong)'
                          : 'var(--border)'
                      }`,
                      color: isSelected
                        ? 'var(--accent)'
                        : p.active
                        ? 'var(--text)'
                        : 'var(--text-dim)',
                      background: isSelected ? 'var(--accent-dim)' : p.active ? 'var(--bg-3)' : 'transparent',
                      cursor: p.active ? 'pointer' : 'default',
                      transition: 'all 0.15s',
                      fontWeight: isSelected ? 500 : 400,
                    }}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

function StadiumMap({
  hotspots,
  selected,
  onSelect,
}: {
  hotspots: HotspotSection[];
  selected: HotspotSection;
  onSelect: (h: HotspotSection) => void;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      style={{ width: '100%', height: '100%' }}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Outer rings */}
      <ellipse cx="50" cy="50" rx="46" ry="38" stroke="#d4a843" strokeWidth="0.3" strokeOpacity="0.3" fill="none"/>
      <ellipse cx="50" cy="50" rx="38" ry="30" stroke="#d4a843" strokeWidth="0.3" strokeOpacity="0.2" fill="none"/>
      <ellipse cx="50" cy="50" rx="28" ry="22" stroke="#d4a843" strokeWidth="0.25" strokeOpacity="0.25" fill="#0e0c0a"/>
      {/* Pitch */}
      <ellipse cx="50" cy="50" rx="20" ry="14" stroke="#ede8e0" strokeWidth="0.3" strokeOpacity="0.15" fill="#0a0f08"/>
      {/* Center circle */}
      <circle cx="50" cy="50" r="4" stroke="#ede8e0" strokeWidth="0.25" strokeOpacity="0.1" fill="none"/>
      {/* Center spot */}
      <circle cx="50" cy="50" r="0.6" fill="#ede8e0" fillOpacity="0.15"/>

      {/* Hotspot dots */}
      {hotspots.map((h) => {
        const isSelected = selected.id === h.id;
        return (
          <g key={h.id} onClick={() => onSelect(h)} style={{ cursor: 'pointer' }}>
            {isSelected && (
              <circle
                cx={h.x}
                cy={h.y}
                r="4.5"
                fill="none"
                stroke="#d4a843"
                strokeWidth="0.5"
                strokeOpacity="0.4"
              />
            )}
            <circle
              cx={h.x}
              cy={h.y}
              r={isSelected ? 2.8 : 2}
              fill={isSelected ? '#d4a843' : '#1a1814'}
              stroke={isSelected ? '#d4a843' : 'rgba(237,232,224,0.25)'}
              strokeWidth="0.5"
            />
            <circle
              cx={h.x}
              cy={h.y}
              r="0.7"
              fill={isSelected ? '#0a0908' : '#d4a843'}
              fillOpacity={isSelected ? 1 : 0.6}
            />
          </g>
        );
      })}

      {/* Labels */}
      {hotspots.filter(h => h.id !== 'the-pitch').map((h) => (
        <text
          key={`label-${h.id}`}
          x={h.x}
          y={h.y + (h.y < 50 ? -4 : 5.5)}
          textAnchor="middle"
          fontSize="3.2"
          fill="#ede8e0"
          fillOpacity="0.5"
          style={{ pointerEvents: 'none', fontFamily: 'DM Sans, sans-serif' }}
        >
          {h.name}
        </text>
      ))}
    </svg>
  );
}
