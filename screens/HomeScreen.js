import React,{useState} from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import CurrentWeather from '../components/CurrentWeather';
import HourlyForecast from '../components/HourlyForecast';
import DailyCard from '../components/DailyForecast';
import SearchBar from '../components/Search';

const HomeScreen = ({ weatherData }) => {
  const [location, setLocation] = useState(null);

  if (!weatherData) {
    return (
      // Render loading indicator while weatherData is null or undefined
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <SearchBar/>
      <ScrollView>
      <CurrentWeather weather={weatherData.current} timezone={weatherData.timezone} />
      <HourlyForecast weather={weatherData.hourly} />
      <DailyCard daily={weatherData.daily} />
      </ScrollView>

    </View>
  );
};

export default HomeScreen;
