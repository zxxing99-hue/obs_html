import { describe, expect, it } from 'vitest';
import { SceneService } from '../src/scene';

describe('SceneService', () => {
  it('creates default scene', () => {
    const state = SceneService.createInitialState();
    expect(state.scenes).toHaveLength(1);
    expect(state.activeSceneId).toBe(state.scenes[0]?.id);
  });

  it('adds source to scene', () => {
    const state = SceneService.createInitialState();
    const sceneId = state.scenes[0]!.id;
    const next = SceneService.addSource(state, sceneId, {
      kind: 'camera',
      name: 'Cam 1',
      visible: true,
      transform: { x: 0, y: 0, width: 640, height: 360, zIndex: 1 }
    });

    expect(next.scenes[0]?.sources).toHaveLength(1);
    expect(next.scenes[0]?.sources[0]?.kind).toBe('camera');
  });
});
