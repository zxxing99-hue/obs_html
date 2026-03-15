export type SourceKind =
  | 'camera'
  | 'microphone'
  | 'display'
  | 'image'
  | 'video'
  | 'text';

export interface Transform {
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

export interface Source {
  id: string;
  name: string;
  kind: SourceKind;
  visible: boolean;
  transform: Transform;
  metadata?: Record<string, string>;
}

export interface Scene {
  id: string;
  name: string;
  sources: Source[];
}

export interface ProjectState {
  scenes: Scene[];
  activeSceneId?: string;
  updatedAt: string;
}

export class SceneService {
  static createInitialState(): ProjectState {
    const defaultScene: Scene = { id: crypto.randomUUID(), name: 'Scene 1', sources: [] };
    return {
      scenes: [defaultScene],
      activeSceneId: defaultScene.id,
      updatedAt: new Date().toISOString()
    };
  }

  static addScene(state: ProjectState, name: string): ProjectState {
    const newScene: Scene = { id: crypto.randomUUID(), name, sources: [] };
    return {
      ...state,
      scenes: [...state.scenes, newScene],
      activeSceneId: newScene.id,
      updatedAt: new Date().toISOString()
    };
  }

  static addSource(state: ProjectState, sceneId: string, source: Omit<Source, 'id'>): ProjectState {
    return {
      ...state,
      scenes: state.scenes.map((scene) =>
        scene.id === sceneId ? { ...scene, sources: [...scene.sources, { ...source, id: crypto.randomUUID() }] } : scene
      ),
      updatedAt: new Date().toISOString()
    };
  }

  static reorderSources(state: ProjectState, sceneId: string, sourceId: string, targetZ: number): ProjectState {
    return {
      ...state,
      scenes: state.scenes.map((scene) => {
        if (scene.id !== sceneId) return scene;
        return {
          ...scene,
          sources: scene.sources.map((source) =>
            source.id === sourceId
              ? { ...source, transform: { ...source.transform, zIndex: targetZ } }
              : source
          )
        };
      }),
      updatedAt: new Date().toISOString()
    };
  }
}
