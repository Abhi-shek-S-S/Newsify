import axios from 'axios';
import { useState } from 'react';

const WeatherButton = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // const cities = ["New York", "London", "Tokyo", "Sydney"];
const APIkey = "47e5135f857e07ca382e080b08d639eb"

    const fetchWeather = async () => {
        setLoading(true);
        setError("");
        try {
            const responses = await (
                axios.get(`https://api.openweathermap.org/data/3.0/onecall/overview?lon=-11.8092&lat=51.509865&appid=${APIkey}`)
            );
            const data = responses.map(res => ({
                city: res.data.name,
                temp: res.data.main.temp,
                condition: res.data.weather[0].description,
            }));
            setWeatherData(data);
        } catch {
            setError("Failed to fetch weather data.");
        }
        setLoading(false);
    };

    return (
        <div className="p-4 bg-gray-800 text-white rounded-md">
            <button
                onClick={fetchWeather}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
                Show Weather
            </button>
            {loading && <p className="mt-2">Loading...</p>}
            {error && <p className="mt-2 text-red-500">{error}</p>}
            <div className="mt-4">
                {weatherData.map((weather, index) => (
                    <div key={index} className="mb-2">
                        <h3 className="font-bold">{weather.city}</h3>
                        <p>Temp: {weather.temp}°C</p>
                        <p>Condition: {weather.condition}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherButton;