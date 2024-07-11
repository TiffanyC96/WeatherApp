import * as Location from 'expo-location';

const fetchMap = async (op, z, x, y, apiKey) => {
  let mapUrl = `https://tile.openweathermap.org/map/${op}/${z}/${x}/${y}.png?appid=${apiKey}`;
  
  try {
    const response = await fetch(mapUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.url;
  } catch (error) {
    console.error('Error fetching the map:', error);
    return null;
  }
};

export default fetchMap;
