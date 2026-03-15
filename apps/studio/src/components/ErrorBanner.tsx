import type { AppError } from '../types/studio';

interface ErrorBannerProps {
  error?: AppError;
}

export function ErrorBanner({ error }: ErrorBannerProps): JSX.Element | null {
  if (!error) return null;

  return (
    <section className="error-banner" role="alert" aria-live="assertive">
      <h3>{error.title}</h3>
      <p>{error.detail}</p>
    </section>
  );
}
