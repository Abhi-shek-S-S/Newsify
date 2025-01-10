// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const WeatherWidget = () => {
//     const [weather, setWeather] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const fetchWeather = async () => {
//         try {
//             const API_KEY = 'd28f5a05cf414494b3651931250801'; // Replace with your API key
//             const location = 'Mangalore'; // Replace with dynamic location if needed
//             // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
//             const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`
//             const response = await axios.get(url);
//             console.log(response, 'weateeee')
//             setWeather(response.data);
//             setLoading(false);
//         } catch (err) {
//             setError('Unable to fetch weather details.');
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchWeather();
//     }, []);

//     if (loading) return <div>Loading weather...</div>;
//     if (error) return <div>{error}</div>;

//     return (
//         <div className="bg-gray-900 text-white p-4 rounded-lg flex items-center space-x-4">
//             <div className="text-4xl">🌤️</div>
//             <div>
//                 <div className="text-lg font-semibold">{weather?.location?.region}</div>
//                 <div className="text-2xl">{Math.round(weather?.current?.temp_c)}°C</div>
//                 <a
//                     href="https://weather.com"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-400 text-sm"
//                 >
//                     weather.com
//                 </a>
//             </div>
//         </div>
//     );
// };

// export default WeatherWidget;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWeather = async (latitude, longitude) => {
        try {
            const API_KEY = 'YOUR_API_KEY'; // Replace with your weather API key
            const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/mangalore?unitGroup=metric&key=BNYSCWWQYK5UWCL66EKEFMKV7&contentType=json`
            const response = await axios.get(url);
            console.log(response, 'reeee')
            setWeather(response.data);
            setLoading(false);
        } catch (err) {
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

    if (loading) return <div>Loading weather...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="bg-gray-900 text-white p-4 rounded-lg flex items-center space-x-4">
            <div className="text-4xl">🌤️</div>
            <div>
                <div className="text-lg font-semibold">{weather?.address.toUpperCase()}</div>
                <div className="text-2xl">{Math.round(weather?.currentConditions?.temp)}°C</div>
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

