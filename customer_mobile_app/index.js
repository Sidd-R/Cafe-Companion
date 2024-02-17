/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f6dbc6',
    accent: '#ac9c8b',
    background: '#fff9f3',
    text: '#262626',
    textC: '#ffffff',
    extra: '#fff3e6'
  },
};

const Main = () => {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => Main);
