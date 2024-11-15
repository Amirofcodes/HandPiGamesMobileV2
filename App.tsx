import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import CameraComponent from './src/components/Camera';

function App(): React.JSX.Element {
  const [isCameraActive, setIsCameraActive] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {!isCameraActive ? (
        <View style={styles.content}>
          <Text style={styles.title}>HandPi Games Mobile</Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => setIsCameraActive(true)}
          >
            <Text style={styles.buttonText}>Start Camera</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.cameraContainer}>
          <CameraComponent />
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setIsCameraActive(false)}
          >
            <Text style={styles.buttonText}>Close Camera</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#70DD4A',
    padding: 15,
    borderRadius: 25,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cameraContainer: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#70DD4A',
    padding: 15,
    borderRadius: 25,
    width: 200,
    alignItems: 'center',
  },
});

export default App;