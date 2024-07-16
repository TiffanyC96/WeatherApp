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
    const { dt, temp, feels_like, pressure, humidity, weather: [{ description, icon }] } = item;

    const temperatureCelsius = (temp - 273.15).toFixed(1);
    const feelsLikeCelsius = (feels_like - 273.15).toFixed(1);

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
        <Card style={styles.card}>
          <Card.Content><Title style={styles.dateTitle}>{formattedDate}</Title>
          <View style={styles.iconContainer}>
            <Image
              source={{ uri: `http://openweathermap.org/img/wn/${icon}.png` }}
              style={styles.icon}
            />
            </View>
            <Title style={styles.title}>{formattedTime}</Title>
            <View>
              <Title>Temperature: {temperatureCelsius}°C</Title>
              <Paragraph>Feels Like: {feelsLikeCelsius}°C</Paragraph>
              <Paragraph>Pressure: {pressure} hPa</Paragraph>
              <Paragraph>Humidity: {humidity}%</Paragraph>
              <Paragraph>Weather: {description}</Paragraph>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Hourly Weather</Text>
      <FlatList
        data={weather}
        renderItem={renderItem}
        keyExtractor={item => item.dt.toString()}
        horizontal={true}
        contentContainerStyle={styles.listContent}
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
    height: 425,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
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

export default HourlyForecast;
