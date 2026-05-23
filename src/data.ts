import type { YearData, Submission, Era, HotspotSection } from './types';
import { photoConfig } from './photos.config';

export const YEARS: YearData[] = [
  {
    year: 1953,
    eraName: 'National Arena',
    eraSubtitle: 'Arena Națională',
    description:
      'The original stadium opens, becoming the heart of Romanian football. Tens of thousands gather for the inaugural match as the nation celebrates a new era of sport.',
    keyMoments: [
      'Inaugural match — Romania vs Hungary',
      'First national athletics championships held',
      'Capacity crowds for opening ceremonies',
    ],
  },
  {
    year: 1968,
    eraName: 'National Arena',
    eraSubtitle: 'Arena Națională',
    description:
      'A decade of transformation. The stadium hosts landmark European fixtures and becomes a cultural touchstone, with iconic matches defining a generation of fans.',
    keyMoments: [
      'Romania qualifies for European Championship',
      'Record attendance of 95,000 for Romania vs Czechoslovakia',
      'First major renovation of the South Stand',
    ],
  },
  {
    year: 1990,
    eraName: 'National Arena',
    eraSubtitle: 'Arena Națională',
    description:
      'Post-revolution Romania finds its footing. The stadium witnesses historic World Cup celebrations and becomes a symbol of national resilience.',
    keyMoments: [
      'Romania reaches World Cup quarter-finals',
      'Hagi era begins — the "Maradona of the Carpathians"',
      'Major structural upgrades approved',
    ],
  },
  {
    year: 2011,
    eraName: 'National Arena',
    eraSubtitle: 'Arena Națională',
    description:
      'A new era dawns with the complete reconstruction. The modern Arena Națională rises from the old ground, UEFA Category 4 certified and ready for the world stage.',
    keyMoments: [
      'New stadium opens — UEFA Category 4 certification',
      'UEFA Europa League Final hosted',
      'Capacity set at 55,000 seats',
    ],
  },
  {
    year: 2024,
    eraName: 'National Arena',
    eraSubtitle: 'Arena Națională',
    description:
      'Arena Națională continues to evolve as Romania\'s premier venue. Major concerts, international qualifiers, and a planned infrastructure expansion for the 2030s define the current chapter.',
    keyMoments: [
      'Coldplay — A Music of the Spheres Tour',
      'Romania qualifies for UEFA Euro 2024',
      'Roof upgrade and expansion feasibility announced',
    ],
  },
];

export const ERAS: Era[] = [
  {
    id: 'era-1953',
    label: '1953–1989',
    range: '1953–1989',
    description: 'The original stadium. Vast open terraces, passionate crowds, iconic Cold War-era matches.',
    years: [1953, 1960, 1968, 1975, 1980, 1985, 1989],
  },
  {
    id: 'era-1990',
    label: '1990–2007',
    range: '1990–2007',
    description: 'Post-revolution renewal. Hagi\'s golden generation, World Cup dreams, first modern renovations.',
    years: [1990, 1994, 1998, 2000, 2004, 2007],
  },
  {
    id: 'era-2011',
    label: '2011–now',
    range: '2011–now',
    description: 'The modern era. A rebuilt stadium, European finals, global acts, and a new generation of memories.',
    years: [2011, 2013, 2016, 2019, 2021, 2024],
  },
];

export const TIMELINE_YEARS = [
  1953, 1960, 1968, 1975, 1980, 1985, 1990, 1994, 1998, 2000, 2004, 2007,
  2011, 2013, 2016, 2019, 2021, 2024,
];

export const HOTSPOTS: HotspotSection[] = [
  {
    id: 'north-curve',
    name: 'North Curve',
    x: 50,
    y: 14,
    currentEra: '2011–now',
    description:
      'Fully seated modern section. Contemporary ultras culture with organized tifosi displays. 12,000 capacity with improved sightlines to both goals.',
    periods: [
      { label: '1953–1989', active: false },
      { label: '1990–2007', active: false },
      { label: '2011–now', active: true },
    ],
  },
  {
    id: 'south-curve',
    name: 'South Curve',
    x: 50,
    y: 86,
    currentEra: '2011–now',
    description:
      'The family and away section. Rebuilt 2011 with improved facilities and sightlines. Historic home of visiting supporter allocations.',
    periods: [
      { label: '1953–1989', active: false },
      { label: '1990–2007', active: false },
      { label: '2011–now', active: true },
    ],
  },
  {
    id: 'main-stand',
    name: 'Main Stand',
    x: 16,
    y: 50,
    currentEra: '2011–now',
    description:
      'The prestige tribune. VIP boxes, press facilities, and the tunnel entrance. Original 1953 orientation preserved in the rebuild.',
    periods: [
      { label: '1953–1989', active: true },
      { label: '1990–2007', active: true },
      { label: '2011–now', active: true },
    ],
  },
  {
    id: 'east-stand',
    name: 'East Stand',
    x: 84,
    y: 50,
    currentEra: '2011–now',
    description:
      'The largest single tier. 20,000 capacity. Rebuilt with a continuous roof and some of the best views in any stadium.',
    periods: [
      { label: '1953–1989', active: false },
      { label: '1990–2007', active: false },
      { label: '2011–now', active: true },
    ],
  },
  {
    id: 'the-pitch',
    name: 'The Pitch',
    x: 50,
    y: 50,
    currentEra: '2011–now',
    description:
      'Hybrid grass surface. Undersoil heating installed 2019. Dimensions: 105m × 68m, UEFA standard.',
    periods: [
      { label: '1953–1989', active: true },
      { label: '1990–2007', active: true },
      { label: '2011–now', active: true },
    ],
  },
  {
    id: 'main-gate',
    name: 'Main Gate',
    x: 18,
    y: 76,
    currentEra: '2011–now',
    description:
      'The ceremonial entrance. Site of fan gatherings before major matches. Redesigned 2011 with wider concourses.',
    periods: [
      { label: '1953–1989', active: true },
      { label: '1990–2007', active: true },
      { label: '2011–now', active: true },
    ],
  },
];

const RAW_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-1',
    year: 2024,
    title: 'Coldplay — Music of the Spheres',
    memory:
      'The light show interacted with the roof structure in a way no football match could ever replicate. We were part of the universe that night.',
    type: 'Concert',
    author: 'Teodora Luca',
    authorInitials: 'TL',
    likes: 312,
  },
  {
    id: 'sub-2',
    year: 2024,
    title: 'Romania vs Kosovo qualifier',
    memory:
      '8,000 fans in a 55,000-seat stadium. The hollow echo was eerie but the ultras made it feel alive regardless.',
    type: 'Match',
    author: 'Cosmin Petrea',
    authorInitials: 'CP',
    likes: 45,
  },
  {
    id: 'sub-3',
    year: 2020,
    title: 'EURO 2020 — Austria v Ukraine',
    memory:
      'Finally, a major tournament. The health protocols meant reduced capacity but the energy was still electric.',
    type: 'Tournament',
    author: 'Mircea Ionescu',
    authorInitials: 'MI',
    likes: 128,
  },
  {
    id: 'sub-4',
    year: 2020,
    title: 'France vs Switzerland, Last 16',
    memory:
      'Swiss won on penalties. Section K, close to the Swiss end. The silence after Mbappe missed was deafening.',
    type: 'Tournament',
    author: 'Ana Florea',
    authorInitials: 'AF',
    likes: 89,
  },
  {
    id: 'sub-5',
    year: 2013,
    title: 'Europa League Final',
    memory:
      'The first major European final here. The stadium proved it could hold its own on the biggest stage.',
    type: 'Event',
    author: 'Radu Constantin',
    authorInitials: 'RC',
    likes: 445,
  },
  {
    id: 'sub-6',
    year: 2011,
    title: 'Opening ceremony — first kick',
    memory:
      'I was there when they played the first ball. The whole place was shaking. A new stadium, a new Romania.',
    type: 'Opening',
    author: 'Gheorghe Vlad',
    authorInitials: 'GV',
    likes: 891,
  },
  {
    id: 'sub-7',
    year: 1990,
    title: 'World Cup send-off, 1990',
    memory:
      'We were given a heroes\' welcome when the team returned after the quarter-final. The whole of Bucharest was here.',
    type: 'Match',
    author: 'Ion Dragomir',
    authorInitials: 'ID',
    likes: 234,
  },
  {
    id: 'sub-8',
    year: 1951,
    title: 'Romania vs Czechoslovakia — 95,000',
    memory:
      'My father took me. We sat on the terraces. The noise was like nothing I had ever heard. I was eight years old.',
    type: 'Match',
    author: 'Vasile Popa',
    authorInitials: 'VP',
    likes: 1204,
  },
];

// Prepends Vite's base URL so paths work on GitHub Pages subpaths like /timeline-arena/
function withBase(path: string): string {
  return `${import.meta.env.BASE_URL}${path}`;
}

export const SUBMISSIONS: Submission[] = RAW_SUBMISSIONS.map((s) => ({
  ...s,
  photo: photoConfig.submissions[s.id]
    ? withBase(photoConfig.submissions[s.id])
    : s.photo,
}));

export function getEraPhoto(year: number): string | undefined {
  const path = photoConfig.eras[year as keyof typeof photoConfig.eras];
  return path ? withBase(path) : undefined;
}

export function getHotspotPhoto(hotspotId: string, period: string): string | undefined {
  const path = photoConfig.hotspots[hotspotId]?.[period];
  return path ? withBase(path) : undefined;
}

export function getEra(year: number): Era {
  if (year <= 1989) return ERAS[0];
  if (year <= 2007) return ERAS[1];
  return ERAS[2];
}

export function getYearData(year: number): YearData {
  return (
    YEARS.find((y) => y.year === year) ??
    YEARS.reduce((prev, curr) =>
      Math.abs(curr.year - year) < Math.abs(prev.year - year) ? curr : prev
    )
  );
}

export function getSubmissionsForYear(year: number): Submission[] {
  return SUBMISSIONS.filter((s) => s.year === year);
}

export const ALL_MEMORY_TYPES = [
  'All', 'Match', 'Event', 'Athletics', 'Opening', 'Tournament', 'Concert', 'Demolition',
] as const;
