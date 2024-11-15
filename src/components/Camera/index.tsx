import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Camera, CameraDevice, useCameraDevices } from 'react-native-vision-camera';
import { gameApi, ALPHABET, GameResponse } from '../../services/api';

const CameraComponent = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('Press Start to begin');
  const [detectedGesture, setDetectedGesture] = useState('');
  const devices = useCameraDevices();

  const device = devices.find(d => d.position === 'front') || 
                devices.find(d => d.position === 'back');

  useEffect(() => {
    const getPermission = async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      setHasPermission(cameraPermission === 'granted');
    };
    getPermission();
  }, []);

  const checkGesture = useCallback(async () => {
    if (!gameStarted) return;

    try {
      const response: GameResponse = await gameApi.checkGesture();
      console.log('Gesture check response:', response);

      setDetectedGesture(response.predicted_gesture || '');

      if (response.message === 'Correct!') {
        setScore(response.score || 0);
        if (currentLetterIndex >= ALPHABET.length - 1) {
          await gameApi.endGame();
          setGameStarted(false);
          setMessage(`Congratulations! Final score: ${response.score}/${ALPHABET.length}`);
        } else {
          setCurrentLetterIndex(prev => prev + 1);
          setMessage(`Correct! Show the letter: ${ALPHABET[currentLetterIndex + 1]}`);
        }
      } else if (response.message === 'Incorrect, try again') {
        setMessage(`Try again! Expected: ${response.expected_letter}, Detected: ${response.predicted_gesture}`);
      }
    } catch (err) {
      console.error('Gesture check error:', err);
      setMessage('Error checking gesture');
    }
  }, [gameStarted, currentLetterIndex]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (gameStarted) {
      intervalId = setInterval(checkGesture, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [gameStarted, checkGesture]);

  const startGame = async () => {
    try {
      await gameApi.startGame();
      setGameStarted(true);
      setCurrentLetterIndex(0);
      setScore(0);
      setMessage(`Show the letter: ${ALPHABET[0]}`);
    } catch (err) {
      console.error('Start game error:', err);
      setMessage('Failed to start game');
    }
  };

  const stopGame = async () => {
    try {
      await gameApi.endGame();
      setGameStarted(false);
      setMessage('Game stopped');
    } catch (err) {
      console.error('Stop game error:', err);
      setMessage('Error stopping game');
    }
  };

  if (!hasPermission || !device) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No camera access</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={gameStarted}
        photo={false}
        video={false}
      />
      <View style={styles.gameInfo}>
        <Text style={styles.scoreText}>
          Score: {score}/{ALPHABET.length}
        </Text>
        <Text style={styles.letterText}>
          Current Letter: {ALPHABET[currentLetterIndex]}
        </Text>
      </View>
      <View style={styles.overlay}>
        <Text style={styles.messageText}>{message}</Text>
        {detectedGesture && (
          <Text style={styles.gestureText}>
            Detected: {detectedGesture}
          </Text>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={gameStarted ? stopGame : startGame}
        >
          <Text style={styles.buttonText}>
            {gameStarted ? 'Stop Game' : 'Start Game'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  camera: {
    flex: 1,
  },
  gameInfo: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
  },
  scoreText: {
    color: '#70DD4A',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  letterText: {
    color: 'white',
    fontSize: 16,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  messageText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  gestureText: {
    color: '#70DD4A',
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#70DD4A',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CameraComponent;