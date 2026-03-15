import { useState } from 'react';
import { useStudioStore } from '../store/studioStore';

export function ScenePanel(): JSX.Element {
  const { project, addScene, addSource } = useStudioStore();
  const [sceneName, setSceneName] = useState('');

  return (
    <section>
      <h2>Scenes</h2>
      <ul>
        {project.scenes.map((scene) => (
          <li key={scene.id}>
            <strong>{scene.name}</strong> ({scene.sources.length} sources)
          </li>
        ))}
      </ul>
      <div className="button-row">
        <input
          value={sceneName}
          onChange={(event) => setSceneName(event.target.value)}
          placeholder="New scene name"
        />
        <button
          onClick={() => {
            if (!sceneName.trim()) return;
            addScene(sceneName.trim());
            setSceneName('');
          }}
        >
          Add Scene
        </button>
      </div>
      <div className="button-row">
        <button onClick={() => addSource('camera', 'Camera Source')}>Add Camera Source</button>
        <button onClick={() => addSource('display', 'Display Source')}>Add Display Source</button>
      </div>
    </section>
  );
}
