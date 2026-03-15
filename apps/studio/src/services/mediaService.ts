import { DeviceManager } from '@studio/media';

const manager = new DeviceManager();

export const mediaService = {
  enumerateDevices: () => manager.enumerate(),
  openCamera: (deviceId?: string) => manager.getCamera(deviceId),
  openMicrophone: (deviceId?: string) => manager.getMicrophone(deviceId),
  openDisplay: () => manager.getDisplay()
};
