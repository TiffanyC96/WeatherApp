import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import MapView, { UrlTile } from 'react-native-maps';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';


const WeatherMap = () => {
    const [tileType, setTileType] = useState('temp_new');    

    const navigation = useNavigation();

    useEffect(() => {
        
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Maps</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setTileType(value)}
                        items={[
                            { label: 'Temperature', value: 'temp_new' },
                            { label: 'Precipitation', value: 'precipitation_new' },
                            { label: 'Clouds', value: 'clouds_new' },
                            { label: 'Wind', value: 'wind_new' },
                        ]}
                        style={pickerSelectStyles}
                    />
                </View>
            ),
        });
    }, [navigation, tileType]);

    const tileUrl = `http://tile.openweathermap.org/map/${tileType}/{z}/{x}/{y}.png?appid=d9865f49c0c2460f4564894d107561d5`;
    console.log(tileUrl)
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 30,
                    longitude: -20,
                    latitudeDelta: 10,
                    longitudeDelta: 10,
                }}
            >
                <UrlTile
                    key={tileType}
                    urlTemplate={tileUrl}
                    maximumZ={10}
                    maximumAge={1000}
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    legendContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    legendTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    legendColor: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    legendText: {
        fontSize: 12,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 10,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
    },
});

export default WeatherMap;
