import * as Location from 'expo-location';

export const getCurrentLocation = async()=>{
    let {status} = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted'){
        throw new Error('Location permission is not granted');
    }
    let location = await Location.getCurrentPositionAsync({});
    console.log(location.coords)
    return location.coords;
};