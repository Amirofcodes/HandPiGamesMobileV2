import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.66:5001';

export const ALPHABET = ['A', 'B', 'C', 'D'];

export type GameResponse = {
  message: string;
  new_letter?: string;
  score?: number;
  predicted_gesture?: string;
  expected_letter?: string;
  final_score?: number;
};

export const gameApi = {
  startGame: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/game/start`);
      return response.data;
    } catch (error) {
      console.error('Start game error:', error);
      throw error;
    }
  },

  checkGesture: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/game/check`);
      return response.data;
    } catch (error) {
      console.error('Check gesture error:', error);
      throw error;
    }
  },

  endGame: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/game/end`);
      return response.data;
    } catch (error) {
      console.error('End game error:', error);
      throw error;
    }
  },
};