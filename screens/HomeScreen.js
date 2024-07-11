import React from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import CurrentWeather from '../components/CurrentWeather';
import HourlyForecast from '../components/HourlyForecast';
import DailyCard from '../components/DailyForecast';

const HomeScreen = ({ weatherData }) => {
  if (!weatherData) {
    return (
      // Render loading indicator while weatherData is null or undefined
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView>
      <CurrentWeather weather={weatherData.current} timezone={weatherData.timezone} />
      <HourlyForecast weather={weatherData.hourly} />
      <DailyCard daily={weatherData.daily} />

    </ScrollView>
  );
};

export default HomeScreen;
