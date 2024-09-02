// services/weatherService.js
import axios from 'axios';

const API_KEY = '1635890035cbba097fd5c26c8ea672a1';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const getWeatherForecast = async (cityName) => {
    try {
        const response = await axios.get(`${BASE_URL}`, {
            params: {
                q: cityName,
                units: 'metric',
                appid: API_KEY
            }
        });

        // Filter to get the first record for each day
        const filteredData = [];
        const dates = new Set();

        response.data.list.forEach((item) => {
            const date = item.dt_txt.split(' ')[0];
            if (!dates.has(date)) {
                dates.add(date);
                filteredData.push(item);
            }
        });

        return filteredData;

    } catch (error) {
        console.error(error);
        throw error;
    }
};
