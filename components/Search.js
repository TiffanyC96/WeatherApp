import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';

const SearchBar = ({ onLocationSelected }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);

    const searchLocations = async (query) => {
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=d9865f49c0c2460f4564894d107561d5`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
        if (query.length > 2) {
            searchLocations(query);
        } else {
            setResults([]);
        }
    };

    const handleLocationPress = (location) => {
        setSearchQuery(location.name);
        setResults([]);
        onLocationSelected(location);
    };

    return (
        <View>
            <Searchbar
                placeholder="Search for a location"
                value={searchQuery}
                onChangeText={handleSearchChange}
                style={styles.searchbar}
            />
            {results.length > 0 && (
                <FlatList
                    data={results}
                    keyExtractor={(item) => `${item.lat}-${item.lon}`}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleLocationPress(item)}>
                            <Text style={styles.resultItem}>{item.name}, {item.country}</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.resultsList}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    searchbar: {
        marginBottom: 10,
    },
    resultsList: {
        maxHeight: 200,
    },
    resultItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});

export default SearchBar;
