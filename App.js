import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import ForecastScreen from './screens/MapScreen';
import SettingsScreen from './screens/SettingsScreen';

import { fetchWeatherData } from './api/fetchWeatherData';
import { getCurrentLocation } from './services/getCurrentLocation';

const Tab = createBottomTabNavigator();

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const data = await fetchWeatherData();
              setWeatherData(data);
              setLoading(false);
          } catch (error) {
              console.error('Error fetching data:', error);
              setLoading(false);
              setError('Error fetching data');
          }
      };

      fetchData();
  }, []);

  return (
      <NavigationContainer>
          <Tab.Navigator initialRouteName="Home">
              <Tab.Screen name="Home" options={{ tabBarLabel: 'Home' }}>
                  {(props) => <HomeScreen {...props} weatherData={weatherData} />}
              </Tab.Screen>
              <Tab.Screen name="Maps" component={ForecastScreen}/>
              <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
      </NavigationContainer>
  );
}