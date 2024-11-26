# directoriestree.txt

```txt
.
├── App.tsx
├── Gemfile
├── Gemfile.lock
├── README.md
├── __tests__
│   └── App.test.tsx
├── babel.config.js
├── directoriestree.txt
├── index.js
├── jest.config.js
├── metro.config.js
├── react-native.config.js
├── src
│   ├── components
│   │   ├── Camera
│   │   │   ├── frameProcessor.ts
│   │   │   └── index.tsx
│   │   └── Game
│   │       └── index.tsx
│   ├── navigation
│   │   └── index.tsx
│   ├── screens
│   │   ├── GameScreen.tsx
│   │   └── HomeScreen.tsx
│   ├── services
│   │   └── api.ts
│   ├── types
│   │   └── index.ts
│   └── utils
└── yarn.lock


```



# __tests__/App.test.tsx

```tsx
/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});

```

# .eslintrc.js

```js
module.exports = {
  root: true,
  extends: '@react-native',
};

```

# .prettierrc.js

```js
module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: false,
  singleQuote: true,
  trailingComma: 'all',
};

```

# .watchmanconfig

```
{}

```

# app.json

```json
{
  "name": "HandPiGamesMobileV2",
  "displayName": "HandPiGamesMobileV2"
}
```

# App.tsx

```tsx
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
```

# babel.config.js

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    ['@babel/plugin-transform-flow-strip-types'],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    'react-native-reanimated/plugin'
  ],
};
```


# Gemfile

```
source 'https://rubygems.org'

# You may use http://rbenv.org/ or https://rvm.io/ to install and use this version
ruby ">= 2.6.10"

# Exclude problematic versions of cocoapods and activesupport that causes build failures.
gem 'cocoapods', '>= 1.13', '!= 1.15.0', '!= 1.15.1'
gem 'activesupport', '>= 6.1.7.5', '!= 7.1.0'
gem 'xcodeproj', '< 1.26.0'

```

# index.js

```js
// index.js
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

# ios/Config.xcconfig

```xcconfig
EXCLUDED_ARCHS[sdk=iphonesimulator*] = arm64
ONLY_ACTIVE_ARCH = YES
ENABLE_BITCODE = NO
USER_SCRIPT_SANDBOXING = NO
OTHER_LDFLAGS = $(inherited) -Wl,-ld_classic
```

# ios/Gemfile

```
source 'https://rubygems.org'

gem 'cocoapods', '~> 1.13'
gem 'activesupport', '>= 6.1.7.5', '< 7.1.0'
```

# jest.config.js

```js
module.exports = {
  preset: 'react-native',
};

```

# metro.config.js

```js
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

```

# package.json

```json
{
  "name": "handpigamesmobilev2",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "lint": "eslint .",
    "start": "react-native start",
    "test": "jest",
    "pods": "cd ios && pod install && cd .."
  },
  "dependencies": {
    "react": "18.3.0",
    "react-native": "0.76.0",
    "react-native-vision-camera": "3.9.0",
    "react-native-reanimated": "3.6.1"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@babel/preset-env": "^7.20.0",
    "@babel/runtime": "^7.20.0",
    "@babel/plugin-proposal-nullish-coalescing-operator": "^7.18.6",
    "@babel/plugin-proposal-optional-chaining": "^7.21.0",
    "@babel/plugin-transform-arrow-functions": "^7.23.3",
    "@babel/plugin-transform-shorthand-properties": "^7.23.3",
    "@babel/plugin-transform-template-literals": "^7.23.3",
    "@react-native/babel-preset": "^0.76.0",
    "@react-native/eslint-config": "^0.76.0",
    "@react-native/metro-config": "^0.76.0",
    "@react-native-community/cli": "^12.3.0",
    "@react-native-community/cli-platform-ios": "^12.3.0",
    "@react-native/typescript-config": "^0.76.0",
    "@types/react": "^18.2.6",
    "@types/react-test-renderer": "^18.0.0",
    "babel-jest": "^29.6.3",
    "eslint": "^8.19.0",
    "jest": "^29.6.3",
    "metro-react-native-babel-preset": "^0.76.0",
    "prettier": "2.8.8",
    "typescript": "5.0.4"
  }
}
```

# react-native.config.js

```js
module.exports = {
    dependencies: {
      'react-native-vision-camera': {
        platforms: {
          ios: null,
        },
      },
    },
  };
  
```

# README.md

```md
This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

\`\`\`bash
# using npm
npm start

# OR using Yarn
yarn start
\`\`\`

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

\`\`\`bash
# using npm
npm run android

# OR using Yarn
yarn android
\`\`\`

### For iOS

\`\`\`bash
# using npm
npm run ios

# OR using Yarn
yarn ios
\`\`\`

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

```

# src/components/Camera/frameProcessor.ts

```ts
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
```

# src/components/Camera/index.tsx

```tsx
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { gameApi, ALPHABET } from '../../services/api';
import type { GameResponse } from '../../types';
import { runOnJS } from 'react-native-reanimated';

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
  
  const cameraRef = useRef<Camera>(null);

  const onFrameProcessed = useCallback((frameData: any) => {
    console.log('Frame processed:', frameData);
  }, []);

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    try {
      const frameData = {
        width: frame.width,
        height: frame.height,
        format: frame.pixelFormat,
        timestamp: frame.timestamp,
      };
      runOnJS(onFrameProcessed)(frameData);
    } catch (error) {
      runOnJS(console.error)('Frame processing error:', error);
    }
  }, []);

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
      const response = await gameApi.checkGesture();
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
    let intervalId: NodeJS.Timeout | undefined;

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
      const response = await gameApi.startGame();
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
        ref={cameraRef}
        style={styles.camera}
        device={device}
        isActive={gameStarted}
        frameProcessor={frameProcessor}
      />
      
      <View style={styles.header}>
        <Text style={styles.scoreText}>Score: {score}/4</Text>
        <Text style={styles.letterText}>Current Letter: {ALPHABET[currentLetterIndex]}</Text>
      </View>

      <View style={styles.controlsContainer}>
        {!gameStarted ? (
          <TouchableOpacity 
            style={styles.button}
            onPress={startGame}
          >
            <Text style={styles.buttonText}>Start Game</Text>
          </TouchableOpacity>
        ) : (
          <>
            <Text style={styles.messageText}>{message}</Text>
            {detectedGesture && (
              <Text style={styles.gestureText}>
                Detected: {detectedGesture}
              </Text>
            )}
            <TouchableOpacity 
              style={styles.button}
              onPress={stopGame}
            >
              <Text style={styles.buttonText}>Stop Game</Text>
            </TouchableOpacity>
          </>
        )}
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
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    alignItems: 'center',
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
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    alignItems: 'center',
    paddingBottom: 40,
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
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CameraComponent;
```

# src/components/Game/index.tsx

```tsx
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
```

# src/navigation/index.tsx

```tsx

```

# src/screens/GameScreen.tsx

```tsx

```

# src/screens/HomeScreen.tsx

```tsx

```

# src/services/api.ts

```ts
import axios from 'axios';
import { Frame } from 'react-native-vision-camera';
import type { GameResponse, FrameData } from '../types';

const API_BASE_URL = 'http://192.168.1.66:5001';

export const ALPHABET = ['A', 'B', 'C', 'D'] as const;

export const gameApi = {
  startGame: async (): Promise<GameResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/game/start`);
      return response.data;
    } catch (error) {
      console.error('Start game error:', error);
      throw error;
    }
  },

  checkGesture: async (frame?: Frame): Promise<GameResponse> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/game/check`);
      return response.data;
    } catch (error) {
      console.error('Check gesture error:', error);
      throw error;
    }
  },

  endGame: async (): Promise<GameResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/game/end`);
      return response.data;
    } catch (error) {
      console.error('End game error:', error);
      throw error;
    }
  }
};
```

# src/types/index.ts

```ts
export type GameResponse = {
    message: string;
    new_letter?: string;
    score?: number;
    predicted_gesture?: string;
    expected_letter?: string;
    final_score?: number;
  };
  
  export type FrameData = {
    width: number;
    height: number;
    pixelFormat: string;
    bytesPerRow: number;
    data: string;
  };
  
```

# tsconfig.json

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "lib": ["es2017"],
    "allowJs": true,
    "jsx": "react-native",
    "noEmit": true,
    "isolatedModules": true,
    "strict": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "*": ["src/*"]
    }
  },
  "exclude": [
    "node_modules",
    "babel.config.js",
    "metro.config.js",
    "jest.config.js"
  ]
}
```

