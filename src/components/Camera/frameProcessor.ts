import { Frame } from 'react-native-vision-camera';

export const frameProcessor = (frame: Frame) => {
  'worklet';
  try {
    return {
      width: frame.width,
      height: frame.height,
      format: frame.pixelFormat,
      orientation: frame.orientation,
      timestamp: frame.timestamp,
    };
  } catch (error) {
    console.error('Frame processing error:', error);
    return null;
  }
};