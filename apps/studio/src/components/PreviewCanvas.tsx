import { useEffect, useRef } from 'react';

interface PreviewCanvasProps {
  stream?: MediaStream;
}

export function PreviewCanvas({ stream }: PreviewCanvasProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current || !stream) return;
    videoRef.current.srcObject = stream;
    void videoRef.current.play().catch(() => {
      // playback may require user interaction in some browser policies.
    });
  }, [stream]);

  return (
    <section>
      <h2>Program Preview</h2>
      <video ref={videoRef} autoPlay muted playsInline className="preview" />
    </section>
  );
}
