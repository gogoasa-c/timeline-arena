import { useState, useCallback, memo } from 'react';
import { useIsDesktop } from './hooks/useIsDesktop';
import { useTweaks } from './hooks/useTweaks';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { StatusBar } from './components/StatusBar';
import { HomeScreen } from './screens/HomeScreen';
import { YearDetailScreen } from './screens/YearDetailScreen';
import { ComparisonScreen } from './screens/ComparisonScreen';
import { ArchiveScreen } from './screens/ArchiveScreen';
import { HotspotsScreen } from './screens/HotspotsScreen';
import { UploadFlow } from './screens/UploadFlow';
import type { Screen, Submission } from './types';

export default function App() {
  const isDesktop = useIsDesktop();
  const { tweaks } = useTweaks();

  const [screen, setScreen] = useState<Screen>('home');
  const [year, setYear] = useState(2024);
  const [showUpload, setShowUpload] = useState(false);
  const [userSubmissions, setUserSubmissions] = useState<Submission[]>([]);

  const navigate = useCallback((s: Screen) => setScreen(s), []);
  const handleYearDetail = useCallback(() => setScreen('yearDetail'), []);
  const handleUploadSuccess = useCallback(() => {
    setShowUpload(false);
    setScreen('archive');
  }, []);
  const handleAddSubmission = useCallback((s: Submission) => {
    setUserSubmissions((prev) => [s, ...prev]);
  }, []);

  const isTablet = !isDesktop && window.innerWidth >= 600;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: isTablet ? 'center' : undefined,
        justifyContent: isTablet ? 'center' : undefined,
        background: 'var(--bg)',
        position: 'relative',
      }}
    >
      {tweaks.grain && <div className="grain-overlay" aria-hidden="true" />}

      {/* Phone shell */}
      <div
        style={{
          width: isDesktop ? '100%' : isTablet ? '430px' : '100%',
          height: isDesktop ? '100%' : isTablet ? '860px' : '100%',
          borderRadius: isTablet ? 'var(--radius-phone)' : 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxShadow: isTablet ? '0 24px 80px rgba(0,0,0,0.8)' : 'none',
          border: isTablet ? '1px solid var(--border-strong)' : 'none',
          background: 'var(--bg)',
        }}
      >
        {!isDesktop && tweaks.showStatusBar && <StatusBar />}

        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {isDesktop && (
            <Sidebar
              screen={screen}
              year={year}
              onNavigate={navigate}
              onAddMemory={() => setShowUpload(true)}
            />
          )}

          <main style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            <ScreenRenderer
              screen={screen}
              year={year}
              setYear={setYear}
              onNavigate={navigate}
              onYearDetail={handleYearDetail}
              userSubmissions={userSubmissions}
            />
          </main>
        </div>

        {!isDesktop && (
          <BottomNav
            screen={screen}
            onNavigate={navigate}
            onUpload={() => setShowUpload(true)}
          />
        )}
      </div>

      {showUpload && (
        <UploadFlow
          year={year}
          onClose={() => setShowUpload(false)}
          onSuccess={handleUploadSuccess}
          onSubmit={handleAddSubmission}
        />
      )}
    </div>
  );
}

const ScreenRenderer = memo(function ScreenRenderer({
  screen,
  year,
  setYear,
  onNavigate,
  onYearDetail,
  userSubmissions,
}: {
  screen: Screen;
  year: number;
  setYear: (y: number) => void;
  onNavigate: (s: Screen) => void;
  onYearDetail: () => void;
  userSubmissions: Submission[];
}) {
  switch (screen) {
    case 'home':
      return (
        <HomeScreen
          year={year}
          setYear={setYear}
          onNavigate={onNavigate}
          onYearDetail={onYearDetail}
        />
      );
    case 'yearDetail':
      return (
        <YearDetailScreen
          year={year}
          onBack={() => onNavigate('home')}
          onNavigate={onNavigate}
          extraSubmissions={userSubmissions}
        />
      );
    case 'comparison':
      return <ComparisonScreen />;
    case 'archive':
      return <ArchiveScreen extraSubmissions={userSubmissions} />;
    case 'hotspots':
      return <HotspotsScreen year={year} />;
    default:
      return (
        <HomeScreen
          year={year}
          setYear={setYear}
          onNavigate={onNavigate}
          onYearDetail={onYearDetail}
        />
      );
  }
});
