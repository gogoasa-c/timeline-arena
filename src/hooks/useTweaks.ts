import { useState } from 'react';
import type { Tweaks } from '../types';

const DEFAULTS: Tweaks = {
  showStatusBar: true,
  grain: false,
  theme: 'dark',
  accent: '#d4a843',
};

export function useTweaks() {
  const [tweaks, setTweaks] = useState<Tweaks>(DEFAULTS);

  const updateTweak = <K extends keyof Tweaks>(key: K, value: Tweaks[K]) => {
    setTweaks((prev) => {
      const next = { ...prev, [key]: value };
      try {
        window.parent.postMessage({ type: 'tweaks', payload: next }, '*');
      } catch {
        // cross-origin ignore
      }
      return next;
    });
  };

  return { tweaks, updateTweak };
}
