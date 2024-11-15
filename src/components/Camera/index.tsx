import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { Camera, CameraDevice, useCameraDevices, CameraPosition } from 'react-native-vision-camera';

const CameraComponent = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const devices = useCameraDevices();

  // Properly type the devices object and handle device selection
  const findDevice = (position: CameraPosition): CameraDevice | undefined => {
    return Array.isArray(devices) 
      ? devices.find(d => d.position === position)
      : devices[position];
  };

  const device = findDevice('front') || findDevice('back');

  useEffect(() => {
    const getPermission = async () => {
      try {
        console.log('Requesting camera permission...');
        const cameraPermission = await Camera.requestCameraPermission();
        console.log('Camera permission result:', cameraPermission);
        setHasPermission(cameraPermission === 'granted');
      } catch (err) {
        console.error('Permission error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };
    getPermission();
  }, []);

  useEffect(() => {
    console.log('Available devices:', devices);
  }, [devices]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  // Handle cases when no devices are found or when running on simulator
  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {Platform.OS === 'ios' 
            ? 'Camera not available. Please test on a physical device.'
            : 'No camera devices found'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        video={false}
        audio={false}
      />
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>Camera Active</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 16,
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
  },
  overlayText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default CameraComponent;