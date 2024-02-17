import {
  View,
  Text,
  Dimensions,
  Alert,
  Pressable,
  Linking,
  Platform,
} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ShopScreen from './ShopScreen';
import RecordsScreen from './SearchScreen';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../App';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {BottomNavigation} from 'react-native-paper';
import StatusBar from '../components/StatusBar';
import SearchScreen from './SearchScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CommonActions} from '@react-navigation/native';

export type AppBottomNavigationParamList = {
  HOME: {authnav: NativeStackNavigationProp<AuthStackParamList, 'APP'>};
  SHOP: undefined;
  SEARCH: undefined;
};

type Props = NativeStackScreenProps<AuthStackParamList, 'APP'>;

const Tab = createBottomTabNavigator<AppBottomNavigationParamList>();

const AppNavigation = ({navigation}: Props) => {
  const [update, setUpdate] = React.useState(false);
  const [checkUpdate, setCheckUpdate] = React.useState(true);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          tabBarStyle: {height: 71, paddingBottom: 13},
          // tabBarActiveTintColor: '#313BE4',
        }}
        tabBar={({navigation, state, descriptors, insets}) => (
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({route, preventDefault}) => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.dispatch({
                  ...CommonActions.navigate(route.name, route.params),
                  target: state.key,
                });
              }
            }}
            renderIcon={({route, focused, color}) => {
              const {options} = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({focused, color, size: 24});
              }

              return null;
            }}
            getLabelText={({route}) => {
              const {options} = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;

              return label;
            }}
          />
        )}>
        <Tab.Screen
          name="HOME"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => {
              return <Icon name="home" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="SHOP"
          component={ShopScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({color, size}) => {
              return <Icon name="cog" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="SEARCH"
          component={SearchScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({color, size}) => {
              return <Icon name="cog" size={size} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};
export default AppNavigation;
