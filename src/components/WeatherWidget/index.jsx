
import { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [locationName, setLocationName] = useState('Unknown Location');

    const fetchWeather = async (latitude, longitude) => {
        try {
            // Fetch weather data from Open-Meteo
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
            const weatherResponse = await axios.get(weatherUrl);
            const currentWeather = weatherResponse.data.current_weather;
            setWeather(currentWeather);

            // Fetch location name using Nominatim API (OpenStreetMap)
            const locationUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
            const locationResponse = await axios.get(locationUrl);
            setLocationName(locationResponse.data.address?.state || locationResponse.data.address?.city || 'Unknown Location');

            setLoading(false);
        } catch (err) {
            console.error(err)
            setError('Unable to fetch weather details.');
            setLoading(false);
        }
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeather(latitude, longitude);
                },
                (err) => {
                    console.error(err)
                    setError('Location access denied. Unable to fetch weather details.');
                    setLoading(false);
                }
            );
        } else {
            setError('Geolocation is not supported by your browser.');
            setLoading(false);
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    if (loading) return <div className='text-white'>Loading weather...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="bg-gray-900 text-white p-4 rounded-lg flex items-center space-x-4">
            <div className="sm:text-4xl text-2xl">🌤️</div>
            <div>
                <div className="sm:text-lg text-sm font-semibold">{locationName.toUpperCase()}</div>
                <div className="sm:text-2xl text-sm">{Math.round(weather?.temperature)}°C</div>
                <a
                    href="https://weather.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-sm"
                >
                    weather.com
                </a>
            </div>
        </div>
    );
};

export default WeatherWidget;



