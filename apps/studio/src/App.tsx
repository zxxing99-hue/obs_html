import { useMemo, useState } from 'react';
import { DevicePanel } from './components/DevicePanel';
import { ErrorBanner } from './components/ErrorBanner';
import { PreviewCanvas } from './components/PreviewCanvas';
import { ScenePanel } from './components/ScenePanel';
import { useAutosave } from './hooks/useAutosave';
import { useStudioStore } from './store/studioStore';
import type { AppError } from './types/studio';

export function App(): JSX.Element {
  const { project, restore } = useStudioStore();
  const [previewStream, setPreviewStream] = useState<MediaStream>();
  const [error, setError] = useState<AppError>();

  const autosaveInterval = useMemo(() => Number(import.meta.env.VITE_AUTOSAVE_INTERVAL_MS ?? 15000), []);

  useAutosave(project, autosaveInterval);

  return (
    <main className="layout">
      <header>
        <h1>{import.meta.env.VITE_APP_NAME ?? 'Live Production Studio'}</h1>
        <button onClick={restore}>Restore Session</button>
      </header>
      <ErrorBanner error={error} />
      <div className="grid">
        <DevicePanel
          onCameraStream={setPreviewStream}
          onMicrophoneStream={() => {
            // In v1 skeleton, microphone routing is prepared but not mixed into output yet.
          }}
          onDisplayStream={setPreviewStream}
          onError={setError}
        />
        <ScenePanel />
        <PreviewCanvas stream={previewStream} />
      </div>
    </main>
  );
}
