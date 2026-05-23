import { useState, useEffect } from 'react';

const DESKTOP_BREAKPOINT = 768;

export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(
    () => window.innerWidth >= DESKTOP_BREAKPOINT
  );

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
    };
  }, []);

  return isDesktop;
}
