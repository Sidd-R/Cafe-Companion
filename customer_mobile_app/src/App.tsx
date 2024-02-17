/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import HomeScreen from './pages/HomeScreen';
import ShopScreen from './pages/ShopScreen';
import AppNavigation from './pages/AppNavigation';
import SearchScreen from './pages/SearchScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle]}>{title}</Text>
      <Text style={[styles.sectionDescription]}>{children}</Text>
    </View>
  );
}

export type AuthStackParamList = {
  HOME: undefined;
  SHOP: undefined;
  SEARCH: undefined;
  APP: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function App(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: '#fff9f3',
    flex: 1,
  };

  return (
    <>
      <SafeAreaView style={backgroundStyle}>
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
          <AuthStack.Screen name="HOME" component={HomeScreen} />
          <AuthStack.Screen name="APP" component={AppNavigation} />
          <AuthStack.Screen name="SHOP" component={ShopScreen} />
          <AuthStack.Screen name="SEARCH" component={SearchScreen} />
        </AuthStack.Navigator>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
