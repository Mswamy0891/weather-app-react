// WeatherScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { getWeatherForecast } from './WeatherService';

const WeatherScreen = () => {
    const [cityName, setCityName] = useState('');
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchWeather = async () => {
        setLoading(true);
        try {
            const data = await getWeatherForecast(cityName);
            setWeatherData(data);
        } catch (error) {
            alert('Error fetching weather data');
        }
        setLoading(false);
    };

    const renderWeatherItem = ({ item }) => (
        <View style={styles.weatherItem}>
            <Text style={styles.dateText}>{item.dt_txt.split(' ')[0]}</Text>
            <Text>Temperature: {item.main.temp_min}°C - {item.main.temp_max}°C</Text>
            <Text>Pressure: {item.main.pressure} hPa</Text>
            <Text>Humidity: {item.main.humidity}%</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Weather in your city</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter city name"
                value={cityName}
                onChangeText={setCityName}
            />
            <Button title="Search" onPress={fetchWeather} />

            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />

            <FlatList
                data={weatherData}
                renderItem={renderWeatherItem}
                keyExtractor={(item) => item.dt_txt}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 8,
        marginBottom: 16,
    },
    list: {
        paddingTop: 16,
    },
    weatherItem: {
        padding: 16,
        backgroundColor: '#f5f5f5',
        marginBottom: 16,
        borderRadius: 4,
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
});

export default WeatherScreen;
