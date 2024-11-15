import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import CameraComponent from '../Camera';

const API_BASE_URL = 'http://192.168.1.66:5001';
const ALPHABET = ['A', 'B', 'C', 'D'];

const Game: React.FC = () => {
  const [message, setMessage] = useState<string>('No game in progress');
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [detectedGesture, setDetectedGesture] = useState<string>('');

  useEffect(() => {
    startGame();
  }, []);

  const startGame = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/game/start`);
      setGameStarted(true);
      setCurrentLetterIndex(0);
      setScore(0);
      setGameCompleted(false);
      setMessage(`Game started! Show the letter: ${response.data.current_letter}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to start game. Please try again.');
    }
  };

  const handleFrame = (frameData: any) => {
    if (gameStarted && !gameCompleted) {
      const { message, new_letter, score: newScore, predicted_gesture } = frameData;
      
      setDetectedGesture(predicted_gesture);

      if (message === 'Correct!') {
        setScore(newScore);
        if (currentLetterIndex === ALPHABET.length - 1) {
          setGameCompleted(true);
          setMessage('Congratulations! You\'ve completed the game!');
        } else {
          setCurrentLetterIndex(prev => prev + 1);
          setMessage(`Correct! Now show the letter: ${new_letter}`);
        }
      } else if (message === 'Incorrect, try again') {
        setMessage(`Incorrect. Try again! Expected: ${ALPHABET[currentLetterIndex]}`);
      }
    }
  };

  const handleError = (error: string) => {
    Alert.alert('Error', error);
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.score}>Score: {score} / {ALPHABET.length}</Text>
        <Text style={styles.gesture}>Detected gesture: {detectedGesture}</Text>
      </View>
      <View style={styles.cameraContainer}>
        <CameraComponent 
          onFrame={handleFrame}
          onError={handleError}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  infoContainer: {
    padding: 20,
    alignItems: 'center',
  },
  message: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  score: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  gesture: {
    color: 'white',
    fontSize: 16,
  },
  cameraContainer: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 20,
    margin: 20,
  },
});

export default Game;