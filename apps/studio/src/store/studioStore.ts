import { AutosaveService, SceneService, type ProjectState, type SourceKind } from '@studio/domain';
import { create } from 'zustand';

interface StudioStore {
  project: ProjectState;
  addScene: (name: string) => void;
  addSource: (kind: SourceKind, name: string) => void;
  restore: () => void;
}

const autosave = new AutosaveService(window.localStorage, 'studio.project');

export const useStudioStore = create<StudioStore>((set, get) => ({
  project: SceneService.createInitialState(),
  addScene: (name) => {
    set((state) => ({ project: SceneService.addScene(state.project, name) }));
    autosave.save(get().project);
  },
  addSource: (kind, name) => {
    const sceneId = get().project.activeSceneId;
    if (!sceneId) return;

    set((state) => ({
      project: SceneService.addSource(state.project, sceneId, {
        kind,
        name,
        visible: true,
        transform: { x: 40, y: 40, width: 320, height: 180, zIndex: 1 }
      })
    }));
    autosave.save(get().project);
  },
  restore: () => {
    const restored = autosave.load();
    if (restored) {
      set({ project: restored });
    }
  }
}));
