import { describe, expect, it } from 'vitest';
import { AutosaveService } from '../src/autosave';
import { SceneService } from '../src/scene';

describe('AutosaveService', () => {
  it('saves and loads project state', () => {
    const memory = new Map<string, string>();
    const service = new AutosaveService(
      {
        setItem(key, value) {
          memory.set(key, value);
        },
        getItem(key) {
          return memory.get(key) ?? null;
        }
      },
      'project'
    );

    const state = SceneService.createInitialState();
    service.save(state);

    expect(service.load()?.activeSceneId).toBe(state.activeSceneId);
  });
});
