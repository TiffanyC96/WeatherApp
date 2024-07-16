import React from 'react';
import { View, Image, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Text } from 'react-native-paper';

const DailyCardItem = ({ day }) => {
  const {
    dt,
    sunrise,
    sunset,
    summary,
    temp = {},
    feels_like = {},
    humidity,
    wind_speed,
    wind_deg,
    weather: weatherDetails = [],
    clouds,
    pop,
    uvi,
  } = day;

  const date = new Date(dt * 1000).toDateString();
  const maxTempCelsius = temp.max !== undefined ? (temp.max - 273.15).toFixed(1) : 'N/A';
  const minTempCelsius = temp.min !== undefined ? (temp.min - 273.15).toFixed(1) : 'N/A';
  const feelsLikeDayCelsius = feels_like.day !== undefined ? (feels_like.day - 273.15).toFixed(1) : 'N/A';
  const weatherIconUrl = weatherDetails.length ? `https://openweathermap.org/img/wn/${weatherDetails[0].icon}.png` : '';
  const description = weatherDetails.length ? weatherDetails[0].description : 'N/A';
  const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
  const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{date}</Title>
        <View style={styles.iconContainer}>
          {weatherIconUrl ? <Image source={{ uri: weatherIconUrl }} style={styles.icon} /> : null}
          <Paragraph>{description}</Paragraph>
        </View>
        <Paragraph>{summary}</Paragraph>
        <Paragraph>Max Temp: {maxTempCelsius}°C</Paragraph>
        <Paragraph>Min Temp: {minTempCelsius}°C</Paragraph>
        <Paragraph>Feels like: {feelsLikeDayCelsius}°C</Paragraph>
        <Paragraph>Humidity: {humidity}%</Paragraph>
        <Paragraph>Wind: {wind_speed} m/s at {wind_deg}°</Paragraph>
        <Paragraph>Clouds: {clouds}%</Paragraph>
        <Paragraph>Precipitation Probability: {pop * 100}%</Paragraph>
        <Paragraph>UV Index: {uvi}</Paragraph>
        <Paragraph>Sunrise: {sunriseTime}</Paragraph>
        <Paragraph>Sunset: {sunsetTime}</Paragraph>
      </Card.Content>
    </Card>
  );
};

const DailyCard = ({ daily }) => {
  if (!daily || daily.length === 0) {
    return (
      <View>
        <Text>No daily data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>7-Day Forecast</Text>
      <FlatList
        data={daily}
        renderItem={({ item }) => <DailyCardItem day={item} />}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  card: {
    margin: 10,
    elevation: 4,
    width: 200,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon:{
    width: 45,
    height:45,
    backgroundColor:'plum',
    opacity:0.7,
    borderRadius:100
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default DailyCard;
