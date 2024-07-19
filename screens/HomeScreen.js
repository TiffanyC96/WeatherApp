import React from 'react';
import { ScrollView, View, ActivityIndicator, StyleSheet } from 'react-native';
import CurrentWeather from '../components/CurrentWeather';
import HourlyForecast from '../components/HourlyForecast';
import DailyCard from '../components/DailyForecast';
import SearchBar from '../components/Search';

const HomeScreen = ({ weatherData, updateWeatherData }) => {
  if (!weatherData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar updateWeatherData={updateWeatherData} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <CurrentWeather weather={weatherData.current} timezone={weatherData.timezone} />
        <HourlyForecast weather={weatherData.hourly} />
        <DailyCard daily={weatherData.daily} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    paddingBottom: 50,
  },
});

export default HomeScreen;
