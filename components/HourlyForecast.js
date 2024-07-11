import React from 'react';
import { View, Image, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Text } from 'react-native-paper';

const HourlyForecast = ({ weather }) => {
  if (!weather || weather.length === 0) {
    return (
      <View>
        <Text>No hourly data available</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    const { dt, temp, feels_like, pressure, humidity, weather: weatherInfo } = item;
    const weatherDesc = weatherInfo[0].description;
    const weatherIcon = weatherInfo[0].icon;

    const temperatureCelsius = (temp - 273.15).toFixed(1);

    const date = new Date(dt * 1000);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedTime = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;

    // Get today's date without time
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if the date is today
    const isToday = date.toDateString() === today.toDateString();
    const formattedDate = date.toDateString();

    return (
      <View>
        <Card>
          <Card.Content>
            {!isToday && <Title>{formattedDate}</Title>}
            <Title>{formattedTime}</Title>
            <Title>Temperature: {temperatureCelsius}°C</Title>
            <Paragraph>Feels Like: {feels_like}K</Paragraph>
            <Paragraph>Pressure: {pressure} hPa</Paragraph>
            <Paragraph>Humidity: {humidity}%</Paragraph>
            <Paragraph>Weather: {weatherDesc}</Paragraph>
            <Image
              source={{ uri: `http://openweathermap.org/img/wn/${weatherIcon}@2x.png` }}
            />
          </Card.Content>
        </Card>
      </View>
    );
  };

  return (
    <View>
      <Text>Hourly Weather</Text>
      <FlatList
        data={weather}
        renderItem={renderItem}
        keyExtractor={item => item.dt.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 10,
    width: 200,
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HourlyForecast;
