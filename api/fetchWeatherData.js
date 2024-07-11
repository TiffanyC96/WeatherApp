import * as Location from 'expo-location';

export const fetchWeatherData = async () => {
  try {
    // Request foreground permissions for accessing location
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      throw new Error('Location permission not granted');
    }

    let location = await Location.getCurrentPositionAsync({});
    let { latitude, longitude } = location.coords;

    
    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=d9865f49c0c2460f4564894d107561d5`);
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
