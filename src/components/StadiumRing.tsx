/** SVG stadium concentric rings — decorative background element */
export function StadiumRing({ opacity = 0.15 }: { opacity?: number }) {
  return (
    <svg
      viewBox="0 0 800 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, opacity }}
      preserveAspectRatio="xMidYMid slice"
    >
      <ellipse cx="580" cy="250" rx="340" ry="220" stroke="#d4a843" strokeWidth="0.8" strokeOpacity="0.5"/>
      <ellipse cx="580" cy="250" rx="280" ry="175" stroke="#d4a843" strokeWidth="0.6" strokeOpacity="0.4"/>
      <ellipse cx="580" cy="250" rx="210" ry="130" stroke="#d4a843" strokeWidth="0.5" strokeOpacity="0.35"/>
      <ellipse cx="580" cy="250" rx="140" ry="85" stroke="#d4a843" strokeWidth="0.5" strokeOpacity="0.3"/>
      <ellipse cx="580" cy="250" rx="70" ry="42" stroke="#d4a843" strokeWidth="0.4" strokeOpacity="0.25"/>
      {/* Pitch center */}
      <ellipse cx="580" cy="250" rx="22" ry="14" stroke="#d4a843" strokeWidth="0.4" strokeOpacity="0.3"/>
      <circle cx="580" cy="250" r="3" fill="#d4a843" fillOpacity="0.2"/>
    </svg>
  );
}
