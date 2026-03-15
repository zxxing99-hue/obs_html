import { useEffect } from 'react';
import { AutosaveService, type ProjectState } from '@studio/domain';

const key = 'studio.project';

export function useAutosave(project: ProjectState, intervalMs: number): void {
  useEffect(() => {
    const service = new AutosaveService(window.localStorage, key);
    const timer = window.setInterval(() => {
      service.save(project);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [project, intervalMs]);
}
