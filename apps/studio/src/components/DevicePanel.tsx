import { useEffect, useState } from 'react';
import { mediaService } from '../services/mediaService';
import type { AppError } from '../types/studio';

interface DevicePanelProps {
  onCameraStream: (stream: MediaStream) => void;
  onDisplayStream: (stream: MediaStream) => void;
  onMicrophoneStream: (stream: MediaStream) => void;
  onError: (error: AppError) => void;
}

export function DevicePanel({
  onCameraStream,
  onDisplayStream,
  onMicrophoneStream,
  onError
}: DevicePanelProps): JSX.Element {
  const [devices, setDevices] = useState<Awaited<ReturnType<typeof mediaService.enumerateDevices>>>([]);

  useEffect(() => {
    mediaService
      .enumerateDevices()
      .then(setDevices)
      .catch((error: unknown) => {
        onError({ title: 'Device enumeration failed', detail: String(error) });
      });
  }, [onError]);

  return (
    <aside>
      <h2>Devices</h2>
      <ul>
        {devices.map((device) => (
          <li key={device.id}>{device.label}</li>
        ))}
      </ul>
      <div className="button-row">
        <button
          onClick={async () => {
            try {
              onCameraStream(await mediaService.openCamera());
            } catch (error) {
              onError({ title: 'Camera permission denied', detail: String(error) });
            }
          }}
        >
          Connect Camera
        </button>
        <button
          onClick={async () => {
            try {
              onMicrophoneStream(await mediaService.openMicrophone());
            } catch (error) {
              onError({ title: 'Microphone permission denied', detail: String(error) });
            }
          }}
        >
          Connect Microphone
        </button>
        <button
          onClick={async () => {
            try {
              onDisplayStream(await mediaService.openDisplay());
            } catch (error) {
              onError({ title: 'Display capture denied', detail: String(error) });
            }
          }}
        >
          Capture Screen
        </button>
      </div>
    </aside>
  );
}
