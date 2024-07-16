import React from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import { Card, Title, Paragraph, useTheme, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const WeatherCard = ({ weather, timezone }) => {
  const { temp, feels_like, humidity, wind_speed, wind_deg, wind_gust, sunrise, sunset, weather:[{description, icon}] } = weather;

  const temperatureCelsius = (temp - 273.15).toFixed(0);
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
    <View style={styles.container}>
      <Text style={styles.title}>Current Conditions</Text>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cityName}>{getCityName(timezone)}</Title>
            <Paragraph style={styles.temperature}>{temperatureCelsius}°C</Paragraph>
            <View style={styles.iconContainer}>
              <Image source={{uri:weatherIconUrl}} style={styles.icon}/>
              </View>
            
          <Paragraph style={styles.feelsLike}>Feels like: {feelsLikeCelsius}°C</Paragraph>
          <View style={styles.information}>
            <View style={styles.infoItem}>
              <Paragraph style={styles.infoText}>{description? description : 'No description available'}</Paragraph>
            </View>
            <View style={styles.infoItem}>
              <Paragraph style={styles.infoText}>Humidity: {humidity}%</Paragraph>
            </View>
            <View style={styles.infoItem}>
              <Paragraph style={styles.infoText}>Wind: {wind_speed}m/s {getWindDirection(wind_deg)}</Paragraph>
            </View>
            <View style={styles.infoItem}>
              <Paragraph style={styles.infoText}>Gust: {wind_gust? wind_gust:'N/A'}</Paragraph>
            </View>
            <View style={styles.infoItem}>
              <Paragraph style={styles.infoText}>Sunrise: {sunriseTime}</Paragraph>
            </View>
            <View style={styles.infoItem}>
              <Paragraph style={styles.infoText}>Sunset: {sunsetTime}</Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 16,
  },
  cityName: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 8,
  },
  temperature: {
    fontSize: 40,
    color: 'purple',
    height:50,
    paddingTop:30,
    textAlign:'center'
  },
  feelsLike: {
    textAlign: 'center',
    marginBottom: 16,
  },
  information: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoItem: {
    width: '48%',
    marginBottom: 8,
  },
  infoText: {
    textAlign: 'center',
  },
  icon:{
    width: 60,
    height:60,
    backgroundColor:'plum',
    opacity:0.7,
    borderRadius:100
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default WeatherCard;
