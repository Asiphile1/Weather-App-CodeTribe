import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [values, setValues] = useState([]);
    const [place, setPlace] = useState('city ses la');
    const [thisLocation, setLocation] = useState('');

    // fetch api
    const fetchWeather = async () => {
        const options = {
            method: 'GET',
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&appid=${import.meta.env.VITE_API_KEY}`,
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            const thisData = response.data;

            
            setLocation(thisData.city.name);
            setValues(thisData.list.slice(0, 6)); 

          
            const currentWeather = thisData.list[0];
            setWeather({
                temp: currentWeather.main.temp,
                wind_speed: currentWeather.wind.speed,
                humidity: currentWeather.main.humidity,
                conditions: currentWeather.weather[0].description,
                iconString: currentWeather.weather[0].icon,
                heatIndex: currentWeather.main.temp
            });

        } catch (e) {
            console.error(e);
            alert('This place does not exist');
        }
    };

    useEffect(() => {
        fetchWeather();
    }, [place]);

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation,
            place
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
