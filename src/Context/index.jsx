import React, { useContext, createContext, useState, useCallback } from 'react';
import axios from 'axios';

const StateContext = createContext();

// Get API key from environment variables
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({
    temp: 0,
    humidity: 0,
    wind_speed: 0,
    conditions: '',
    iconString: ''
  });
  const [values, setValues] = useState([]);
  const [thisLocation, setThisLocation] = useState('');
  const [place, setPlace] = useState('');

  // Function to fetch weather by coordinates
  const fetchWeatherData = useCallback(async (coordinates) => {
    try {
      // Get current weather
      const currentResponse = await axios.get(
        `${BASE_URL}/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&appid=${API_KEY}`
      );

      // Get forecast
      const forecastResponse = await axios.get(
        `${BASE_URL}/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&appid=${API_KEY}`
      );

      setThisLocation(currentResponse.data.name);
      setValues(forecastResponse.data.list);
      
      setWeather({
        temp: currentResponse.data.main.temp,
        humidity: currentResponse.data.main.humidity,
        wind_speed: currentResponse.data.wind.speed,
        conditions: currentResponse.data.weather[0].main,
        iconString: currentResponse.data.weather[0].main
      });
    } catch (error) {
      console.error("Error fetching weather data:", error.response?.data || error.message);
    }
  }, []);

  // Function to fetch weather by city name
  const fetchWeatherByCity = useCallback(async (cityName) => {
    try {
      // Get coordinates for the city
      const geoResponse = await axios.get(
        `${GEO_URL}/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      );

      if (geoResponse.data.length === 0) {
        console.error("City not found");
        return;
      }

      const { lat, lon } = geoResponse.data[0];
      await fetchWeatherData({ latitude: lat, longitude: lon });
    } catch (error) {
      console.error("Error fetching city data:", error.response?.data || error.message);
    }
  }, [fetchWeatherData]);

  // Watch for place changes
  React.useEffect(() => {
    if (place !== '') {
      fetchWeatherByCity(place);
    }
  }, [place, fetchWeatherByCity]);

  return (
    <StateContext.Provider value={{
      weather,
      setWeather,
      values,
      setValues,
      thisLocation,
      setThisLocation,
      place,
      setPlace,
      fetchWeatherData
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);





















// import React, { useContext, createContext, useState, useCallback } from 'react';
// import axios from 'axios';

// const StateContext = createContext();

// // Add your OpenWeather API key here
// const API_KEY = 'https://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&appid=${import.meta.env.VITE_API_KEY}';
// const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// export const StateContextProvider = ({ children }) => {
//   const [weather, setWeather] = useState({
//     temp: 0,
//     humidity: 0,
//     wind_speed: 0,
//     conditions: '',
//     iconString: ''
//   });
//   const [values, setValues] = useState([]);
//   const [thisLocation, setThisLocation] = useState('');
//   const [place, setPlace] = useState('');

//   // Function to fetch weather by coordinates
//   const fetchWeatherData = useCallback(async (coordinates) => {
//     try {
//       // Get current weather
//       const currentResponse = await axios.get(
//         `${BASE_URL}/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&appid=${API_KEY}`
//       );

//       // Get forecast
//       const forecastResponse = await axios.get(
//         `${BASE_URL}/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&appid=${API_KEY}`
//       );

//       setThisLocation(currentResponse.data.name);
//       setValues(forecastResponse.data.list);
      
//       setWeather({
//         temp: currentResponse.data.main.temp,
//         humidity: currentResponse.data.main.humidity,
//         wind_speed: currentResponse.data.wind.speed,
//         conditions: currentResponse.data.weather[0].main,
//         iconString: currentResponse.data.weather[0].main
//       });
//     } catch (error) {
//       console.error("Error fetching weather data:", error);
//     }
//   }, []);

//   // Function to fetch weather by city name
//   const fetchWeatherByCity = useCallback(async (cityName) => {
//     try {
//       // Get coordinates for the city
//       const geoResponse = await axios.get(
//         `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
//       );

//       if (geoResponse.data.length === 0) {
//         console.error("City not found");
//         return;
//       }

//       const { lat, lon } = geoResponse.data[0];
//       await fetchWeatherData({ latitude: lat, longitude: lon });
//     } catch (error) {
//       console.error("Error fetching city data:", error);
//     }
//   }, [fetchWeatherData]);

//   // Watch for place changes
//   React.useEffect(() => {
//     if (place !== '') {
//       fetchWeatherByCity(place);
//     }
//   }, [place, fetchWeatherByCity]);

//   return (
//     <StateContext.Provider value={{
//       weather,
//       setWeather,
//       values,
//       setValues,
//       thisLocation,
//       setThisLocation,
//       place,
//       setPlace,
//       fetchWeatherData
//     }}>
//       {children}
//     </StateContext.Provider>
//   );
// };

// export const useStateContext = () => useContext(StateContext);






// import { useContext, createContext, useState, useEffect } from "react";
// import axios from 'axios';

// const StateContext = createContext();

// export const StateContextProvider = ({ children }) => {
//     const [weather, setWeather] = useState({});
//     const [values, setValues] = useState([]);
//     const [place, setPlace] = useState('city ses la');
//     const [thisLocation, setLocation] = useState('');

//     // fetch api
//     const fetchWeather = async () => {
//         const options = {
//             method: 'GET',
//             url: `https://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&appid=${import.meta.env.VITE_API_KEY}`,
//         };

//         try {
//             const response = await axios.request(options);
//             console.log(response.data);
//             const thisData = response.data;

            
//             setLocation(thisData.city.name);
//             setValues(thisData.list.slice(0, 6)); 

          
//             const currentWeather = thisData.list[0];
//             setWeather({
//                 temp: currentWeather.main.temp,
//                 wind_speed: currentWeather.wind.speed,
//                 humidity: currentWeather.main.humidity,
//                 conditions: currentWeather.weather[0].description,
//                 iconString: currentWeather.weather[0].icon,
//                 heatIndex: currentWeather.main.temp
//             });

//         } catch (e) {
//             console.error(e);
//             alert('This place does not exist, try a place on earth please');
//         }
//     };

//     useEffect(() => {
//         fetchWeather();
//     }, [place]);

//     return (
//         <StateContext.Provider value={{
//             weather,
//             setPlace,
//             values,
//             thisLocation,
//             place
//         }}>
//             {children}
//         </StateContext.Provider>
//     );
// };

// export const useStateContext = () => useContext(StateContext);
