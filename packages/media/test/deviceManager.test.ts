import { describe, expect, it, vi } from 'vitest';
import { DeviceManager } from '../src/deviceManager';

describe('DeviceManager', () => {
  it('maps enumerate devices', async () => {
    vi.stubGlobal('navigator', {
      mediaDevices: {
        enumerateDevices: vi.fn(async () => [
          { deviceId: 'id-1', kind: 'videoinput', label: 'Cam' },
          { deviceId: 'id-2', kind: 'audioinput', label: '' }
        ])
      }
    });

    const manager = new DeviceManager();
    const devices = await manager.enumerate();
    expect(devices[0]?.label).toBe('Cam');
    expect(devices[1]?.label).toContain('audioinput');
  });
});
