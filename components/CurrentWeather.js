import React from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import { Card, Title, Paragraph, useTheme, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const WeatherCard = ({ weather, timezone }) => {

  const { description, icon, temp, feels_like, humidity, wind_speed, wind_deg, wind_gust, sunrise, sunset } = weather;

  const temperatureCelsius = (temp - 273.15).toFixed(1);
  const feelsLikeCelsius = (feels_like - 273.15).toFixed(1);
  const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
  const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
  const weatherIconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

  function getWindDirection(deg) {
    if ((deg >= 337.5 && deg <= 360) || (deg >= 0 && deg <= 22.5)) {
      return "N";
    } else if (deg > 22.5 && deg <= 67.5) {
      return "NNE";
    } else if (deg > 67.5 && deg <= 112.5) {
      return "NE";
    } else if (deg > 112.5 && deg <= 157.5) {
      return "ENE";
    } else if (deg > 157.5 && deg <= 202.5) {
      return "E";
    } else if (deg > 202.5 && deg <= 247.5) {
      return "ESE";
    } else if (deg > 247.5 && deg <= 292.5) {
      return "SE";
    } else if (deg > 292.5 && deg <= 337.5) {
      return "SSE";
    } else {
      return "Unknown";
    }
  }

  const getCityName = (timezone) => {
    if (!timezone) return '';
    const parts = timezone.split('/');
    return parts.length > 1 ? parts[1] : '';
  }

  return (
    <View>
      <Text>Current Conditions</Text>
      <Card>
        <Card.Content>
          <Title>{getCityName(timezone)}</Title>
          <Card>
            <Paragraph>{temperatureCelsius}°C</Paragraph>
          </Card>
          <Paragraph>Feels like: {feelsLikeCelsius}°C</Paragraph>
          <Paragraph>{description}</Paragraph>
          <Paragraph>Humidity: {humidity}%</Paragraph>
          <Paragraph>Wind: {wind_speed}m/s {getWindDirection(wind_deg)}</Paragraph>
          <Paragraph>Gust: {wind_gust}</Paragraph>
          <Paragraph>Sunrise: {sunriseTime}</Paragraph>
          <Paragraph>Sunset: {sunsetTime}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

export default WeatherCard;
