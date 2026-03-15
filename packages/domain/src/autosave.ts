import type { ProjectState } from './scene';

export interface StorageLike {
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
}

export class AutosaveService {
  constructor(
    private readonly storage: StorageLike,
    private readonly key: string
  ) {}

  save(state: ProjectState): void {
    this.storage.setItem(this.key, JSON.stringify(state));
  }

  load(): ProjectState | null {
    const raw = this.storage.getItem(this.key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as ProjectState;
    } catch {
      return null;
    }
  }
}
