/**
 * Photo config for demo purposes.
 *
 * HOW TO USE:
 * 1. Drop image files into /publicphotos/ (they'll be served at photos/<filename>)
 * 2. Add a mapping here and the app picks it up automatically.
 *
 * Sections:
 *   submissions  — submission ID → photo path
 *   eras         — era year (number) → photo path  (used in Compare screen)
 *   hotspots     — hotspot ID → period label → photo path  (used in Map screen)
 */
export const photoConfig = {
  submissions: {
    'sub-1': 'photos/coldplay-2024.jpg',
    'sub-2': 'photos/romania-kosovo-2024.jpg',
    'sub-3': 'photos/euro2020-austria-ukraine.jpg',
    'sub-4': 'photos/france-switzerland-2021.jpg',
    'sub-5': 'photos/europa-league-final-2013.jpg',
    'sub-6': 'photos/opening-ceremony-2011.jpg',
    'sub-7': 'photos/worldcup-sendoff-1990.jpg',
    'sub-8': 'photos/romania-czechoslovakia-1951.jpg',
  } as Record<string, string>,

  eras: {
    1953: 'photos/era-1968.jpg',
    1968: 'photos/era-1968.jpg',
    1990: 'photos/era-1990.jpg',
    2011: 'photos/era-2011.jpg',
    2024: 'photos/era-2024.jpg',
  } as Record<number, string>,

  // Map: hotspot-id → period-label → photo path
  // Period labels match the values in HOTSPOTS[n].periods[n].label
  hotspots: {
    'north-curve': {
      '1953–1989': 'photos/map/north-curve-1953.jpg',
      '1990–2007': 'photos/map/north-curve-1990.jpg',
      '2011–now':  'photos/map/north-curve-2011.jpg',
    },
    'south-curve': {
      '1953–1989': 'photos/map/south-curve-1953.jpg',
      '1990–2007': 'photos/map/south-curve-1990.jpg',
      '2011–now':  'photos/map/south-curve-2011.jpg',
    },
    'main-stand': {
      '1953–1989': 'photos/map/main-stand-1953.jpg',
      '1990–2007': 'photos/map/main-stand-1990.jpg',
      '2011–now':  'photos/map/main-stand-2011.jpg',
    },
    'east-stand': {
      '1953–1989': 'photos/map/east-stand-1953.jpg',
      '1990–2007': 'photos/map/east-stand-1990.jpg',
      '2011–now':  'photos/map/east-stand-2011.jpg',
    },
    'the-pitch': {
      '1953–1989': 'photos/map/pitch-1953.jpg',
      '1990–2007': 'photos/map/pitch-1990.jpg',
      '2011–now':  'photos/map/pitch-2011.jpg',
    },
    'main-gate': {
      '1953–1989': 'photos/map/main-gate-1953.jpg',
      '1990–2007': 'photos/map/main-gate-1990.jpg',
      '2011–now':  'photos/map/main-gate-2011.jpg',
    },
  } as Record<string, Record<string, string>>,
};
