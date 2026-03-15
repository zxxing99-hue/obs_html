export interface DeviceSummary {
  id: string;
  kind: MediaDeviceKind;
  label: string;
}

export class DeviceManager {
  async enumerate(): Promise<DeviceSummary[]> {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.map((device) => ({
      id: device.deviceId,
      kind: device.kind,
      label: device.label || `${device.kind}-${device.deviceId.slice(0, 6)}`
    }));
  }

  async getCamera(deviceId?: string): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia({
      video: deviceId ? { deviceId: { exact: deviceId } } : true,
      audio: false
    });
  }

  async getMicrophone(deviceId?: string): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia({
      audio: deviceId ? { deviceId: { exact: deviceId } } : true,
      video: false
    });
  }

  async getDisplay(): Promise<MediaStream> {
    return navigator.mediaDevices.getDisplayMedia({
      video: {
        frameRate: { ideal: 30, max: 30 },
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      },
      audio: true
    });
  }
}
