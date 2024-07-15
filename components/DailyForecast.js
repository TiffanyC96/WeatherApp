import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { Card, Title, Paragraph, Text } from 'react-native-paper';
import { StyleSheet, ScrollView } from 'react-native';

const DailyCard = ({ daily }) => {

  return (
    <ScrollView
    horizontal={true}>
      <Text>7-Day Forecast</Text>
      {daily.map((day, index) => {
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
          <Card key={index}>
            <Card.Content>
              <Title>{date}</Title>
              <View>
                {weatherIconUrl ? <Image source={{ uri: weatherIconUrl }} /> : null}
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
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  card: {
    margin: 10,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

export default DailyCard;
