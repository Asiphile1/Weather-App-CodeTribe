import { useState, useEffect } from 'react';
import './App.css';
import search from './assets/icons/search.svg';
import { useStateContext } from './Context';
import { BackgroundLayout, WeatherCard, MiniCard } from './Components';

function App() {
  const [input, setInput] = useState('');
  const { weather, thisLocation, values, place, setPlace, fetchWeatherData } = useStateContext();
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dailyForecasts, setDailyForecasts] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });
        fetchWeatherData({ latitude, longitude });
        setLoading(false);
      },
      (error) => {
        console.error("Geolocation error: ", error);
        setLoading(false);
      },
      { enableHighAccuracy: false }
    );
  }, [fetchWeatherData]);

  // Process daily forecasts
  useEffect(() => {
    if (values && values.length > 0) {
      const processedForecasts = processForecasts(values);
      setDailyForecasts(processedForecasts);
    }
  }, [values]);

  const processForecasts = (forecastData) => {
    const dailyData = new Map();
    
    forecastData.forEach(forecast => {
      const date = new Date(forecast.dt * 1000);
      const dayKey = date.toDateString();
      
      if (!dailyData.has(dayKey)) {
        dailyData.set(dayKey, {
          day: date.toLocaleDateString('en-US', { weekday: 'long' }),
          temp: forecast.main.temp,
          iconString: forecast.weather[0].main,
          timestamp: forecast.dt
        });
      }
    });

    return Array.from(dailyData.values());
  };

  const submitCity = () => {
    if (input.trim() !== '') {
      setPlace(input);
      setInput('');
    }
  };

  return (
    <div className='w-full h-screen text-white px-8'>
      <nav className='w-full p-3 flex justify-between items-center'>
        <h1 className='font-bold tracking-wide text-3xl'>Weather App</h1>
        <div className='bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
          <img src={search} alt="search" className='w-[1.5rem] h-[1.5rem]' />
          <input
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                submitCity();
              }
            }}
            type="text"
            placeholder='Search city'
            className='focus:outline-none w-full text-[#212121] text-lg'
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </div>
      </nav>

      <BackgroundLayout />

      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
        {loading ? (
          <div className='text-center'>
            <p className='text-2xl'>Loading weather data...</p>
          </div>
        ) : (
          <>
            <WeatherCard
              place={thisLocation}
              windspeed={weather.wind_speed}
              humidity={weather.humidity}
              temperature={weather.temp}
              heatIndex={weather.heatIndex}
              iconString={weather.iconString}
              conditions={weather.conditions}
            />

            {/* Daily Forecast */}
            <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
              {dailyForecasts.slice(0, 7).map((forecast, index) => (
                <MiniCard
                  key={forecast.timestamp}
                  day={forecast.day}
                  temp={forecast.temp}
                  iconString={forecast.iconString}
                />
              ))}
            </div>

            {/* Hourly Forecast */}
            <div className='flex justify-center overflow-x-auto gap-4 w-full py-4'>
              {values?.slice(0, 24).map((hourData, index) => {
                const forecastTime = new Date(hourData.dt * 1000);
                const currentTime = new Date();
                
                if (forecastTime > currentTime) {
                  return (
                    <MiniCard
                      key={index}
                      time={forecastTime.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                      temp={hourData.main.temp}
                      iconString={hourData.weather[0].main}
                    />
                  );
                }
                return null;
              }).filter(Boolean)}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;











// import { useState, useEffect } from 'react';
// import './App.css';
// import search from './assets/icons/search.svg';
// import sun from './assets/icons/sun.png';
// import cloud from './assets/icons/cloud.png';
// import fog from './assets/icons/fog.png';
// import rain from './assets/icons/rain.png';
// import snow from './assets/icons/snow.png';
// import storm from './assets/icons/storm.png';
// import wind from './assets/icons/windy.png';
// import { useStateContext } from './Context';
// import { BackgroundLayout, WeatherCard, MiniCard } from './Components';

// function App() {
//   const [input, setInput] = useState('');
//   const { weather, thisLocation, values, place, setPlace, fetchWeatherData } = useStateContext();
//   const [coords, setCoords] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentDayIndex, setCurrentDayIndex] = useState(new Date().getDay());

//   // Array of days
//   const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//   // Get array of next 7 days starting from current day
//   const getNextSevenDays = () => {
//     const days = [];
//     let currentIndex = currentDayIndex;
    
//     for (let i = 0; i < 7; i++) {
//       days.push(daysOfWeek[currentIndex]);
//       currentIndex = (currentIndex + 1) % 7;
//     }
//     return days;
//   };

//   // Get weather icon
//   const getWeatherIcon = (iconString) => {
//     const lowerCaseIcon = iconString?.toLowerCase() || '';
//     if (lowerCaseIcon.includes('cloud')) return cloud;
//     if (lowerCaseIcon.includes('rain')) return rain;
//     if (lowerCaseIcon.includes('clear')) return sun;
//     if (lowerCaseIcon.includes('thunder')) return storm;
//     if (lowerCaseIcon.includes('fog')) return fog;
//     if (lowerCaseIcon.includes('snow')) return snow;
//     if (lowerCaseIcon.includes('wind')) return wind;
//     return sun;
//   };

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setCoords({ latitude, longitude });
//         fetchWeatherData({ latitude, longitude });
//         setLoading(false);
//       },
//       (error) => {
//         console.error("Geolocation error: ", error);
//         setLoading(false);
//       },
//       { enableHighAccuracy: false }
//     );
//   }, [fetchWeatherData]);

//   const submitCity = () => {
//     if (input.trim() !== '') {
//       setPlace(input);
//       setInput('');
//     }
//   };

//   return (
//     <div className='w-full h-screen text-white px-8'>
//       <nav className='w-full p-3 flex justify-between items-center'>
//         <h1 className='font-bold tracking-wide text-3xl'>Weather App</h1>
//         <div className='bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
//           <img src={search} alt="search" className='w-[1.5rem] h-[1.5rem]' />
//           <input
//             onKeyUp={(e) => {
//               if (e.key === 'Enter') {
//                 submitCity();
//               }
//             }}
//             type="text"
//             placeholder='Search city'
//             className='focus:outline-none w-full text-[#212121] text-lg'
//             value={input}
//             onChange={e => setInput(e.target.value)}
//           />
//         </div>
//       </nav>

//       <BackgroundLayout />

//       <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
//         {loading ? (
//           <div className='text-center'>
//             <p className='text-2xl'>Loading weather data...</p>
//           </div>
//         ) : (
//           <>
//             {/* Days of the Week Display */}
//             <div className='w-full mb-8'>
//               <h2 className='text-2xl font-bold mb-4'>7-Day Forecast</h2>
//               <div className='flex justify-between items-center gap-4 overflow-x-auto pb-4'>
//                 {getNextSevenDays().map((day, index) => (
//                   <div 
//                     key={index} 
//                     className={`flex-shrink-0 p-4 rounded-lg ${
//                       index === 0 ? 'bg-blue-500 bg-opacity-50' : 'bg-blue-300 bg-opacity-20'
//                     } min-w-[150px] text-center`}
//                   >
//                     <p className='font-bold'>{day}</p>
//                     {values && values[index] && (
//                       <>
//                         <img 
//                           src={getWeatherIcon(values[index]?.weather[0]?.main)} 
//                           alt="weather icon" 
//                           className='w-10 h-10 mx-auto my-2'
//                         />
//                         <p>{Math.round(values[index]?.main?.temp)}°C</p>
//                       </>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <WeatherCard
//               place={thisLocation}
//               windspeed={weather.wind_speed}
//               humidity={weather.humidity}
//               temperature={weather.temp}
//               heatIndex={weather.heatIndex}
//               iconString={weather.iconString}
//               conditions={weather.conditions}
//             />

//             {/* Hourly Forecast */}
//             <div className='flex justify-center overflow-x-auto gap-4 w-full py-4'>
//               {values?.slice(0, 24).map((hourData, index) => {
//                 const forecastTime = new Date(hourData.dt * 1000);
//                 const currentTime = new Date();
                
//                 if (forecastTime > currentTime) {
//                   return (
//                     <div key={index} className='glassCard w-[8rem] h-[8rem] p-2 flex flex-col'>
//                       <p className='text-center text-sm'>
//                         {forecastTime.toLocaleTimeString([], { 
//                           hour: '2-digit', 
//                           minute: '2-digit' 
//                         })}
//                       </p>
//                       <div className='w-full flex justify-center items-center flex-1'>
//                         <img 
//                           src={getWeatherIcon(hourData.weather[0].main)} 
//                           alt="forecast icon" 
//                           className='w-[3rem] h-[3rem]' 
//                         />
//                       </div>
//                       <p className='text-center font-bold text-sm'>
//                         {Math.round(hourData.main.temp)}°C
//                       </p>
//                     </div>
//                   );
//                 }
//                 return null;
//               }).filter(Boolean)}
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }

// export default App;














// import { useState, useEffect } from 'react';
// import './App.css';
// import search from './assets/icons/search.svg';
// import sun from './assets/icons/sun.png';
// import cloud from './assets/icons/cloud.png';
// import fog from './assets/icons/fog.png';
// import rain from './assets/icons/rain.png';
// import snow from './assets/icons/snow.png';
// import storm from './assets/icons/storm.png';
// import wind from './assets/icons/windy.png';
// import { useStateContext } from './Context';
// import { BackgroundLayout, WeatherCard, MiniCard } from './Components';

// function App() {
//   const [input, setInput] = useState('');
//   const { weather, thisLocation, values, place, setPlace, fetchWeatherData } = useStateContext();
//   const [coords, setCoords] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Helper function for weather icons
//   const getWeatherIcon = (iconString) => {
//     const lowerCaseIcon = iconString.toLowerCase();
//     if (lowerCaseIcon.includes('cloud')) return cloud;
//     if (lowerCaseIcon.includes('rain')) return rain;
//     if (lowerCaseIcon.includes('clear')) return sun;
//     if (lowerCaseIcon.includes('thunder')) return storm;
//     if (lowerCaseIcon.includes('fog')) return fog;
//     if (lowerCaseIcon.includes('snow')) return snow;
//     if (lowerCaseIcon.includes('wind')) return wind;
//     return sun; // default
//   };

//   // Get user's location on component mount
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setCoords({ latitude, longitude });
//         fetchWeatherData({ latitude, longitude });
//         setLoading(false);
//       },
//       (error) => {
//         console.error("Geolocation error: ", error);
//         setLoading(false);
//       },
//       { enableHighAccuracy: false }
//     );
//   }, [fetchWeatherData]);

//   // Handle city submission
//   const submitCity = () => {
//     if (input.trim() !== '') {
//       setPlace(input);
//       setInput('');
//     }
//   };

//   return (
//     <div className='w-full h-screen text-white px-8'>
//       {/* Navigation Bar */}
//       <nav className='w-full p-3 flex justify-between items-center'>
//         <h1 className='font-bold tracking-wide text-3xl'>Weather App</h1>
//         <div className='bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
//           <img src={search} alt="search" className='w-[1.5rem] h-[1.5rem]' />
//           <input
//             onKeyUp={(e) => {
//               if (e.key === 'Enter') {
//                 submitCity();
//               }
//             }}
//             type="text"
//             placeholder='Search city'
//             className='focus:outline-none w-full text-[#212121] text-lg'
//             value={input}
//             onChange={e => setInput(e.target.value)}
//           />
//         </div>
//       </nav>

//       <BackgroundLayout />

//       {/* Main Content */}
//       <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
//         {loading ? (
//           <div className='text-center'>
//             <p className='text-2xl'>Loading weather data...</p>
//           </div>
//         ) : (
//           <>
//             {/* Current Weather Card */}
//             <WeatherCard
//               place={thisLocation}
//               windspeed={weather.wind_speed}
//               humidity={weather.humidity}
//               temperature={weather.temp}
//               heatIndex={weather.heatIndex}
//               iconString={weather.iconString}
//               conditions={weather.conditions}
//             />

//             {/* Daily Forecast */}
//             <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
//               {values?.slice(0, 6).map(curr => {
//                 // Filter to show only one forecast per day at the same time
//                 const forecastDate = new Date(curr.dt * 1000);
//                 const currentHour = new Date().getHours();
//                 const forecastHour = forecastDate.getHours();
                
//                 // Only show forecasts for times close to the current hour
//                 if (Math.abs(forecastHour - currentHour) <= 3) {
//                   return (
//                     <MiniCard
//                       key={curr.dt}
//                       timestamp={curr.dt}
//                       temp={curr.main.temp}
//                       iconString={curr.weather[0].main}
//                     />
//                   );
//                 }
//                 return null;
//               }).filter(Boolean)}
//             </div>

//             {/* Hourly Forecast */}
//             <div className='flex justify-center overflow-x-auto gap-4 w-full py-4'>
//               {values?.slice(0, 24).map((hourData, index) => {
//                 const forecastTime = new Date(hourData.dt * 1000);
//                 const currentTime = new Date();
                
//                 // Only show future forecasts
//                 if (forecastTime > currentTime) {
//                   return (
//                     <div key={index} className='glassCard w-[8rem] h-[8rem] p-2 flex flex-col'>
//                       <p className='text-center text-sm'>
//                         {forecastTime.toLocaleTimeString([], { 
//                           hour: '2-digit', 
//                           minute: '2-digit' 
//                         })}
//                       </p>
//                       <div className='w-full flex justify-center items-center flex-1'>
//                         <img 
//                           src={getWeatherIcon(hourData.weather[0].main)} 
//                           alt="forecast icon" 
//                           className='w-[3rem] h-[3rem]' 
//                         />
//                       </div>
//                       <p className='text-center font-bold text-sm'>
//                         {hourData.main.temp}°C
//                       </p>
//                     </div>
//                   );
//                 }
//                 return null;
//               }).filter(Boolean)}
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }

// export default App;





















// import { useState, useEffect } from 'react';
// import './App.css';
// import search from './assets/icons/search.svg';
// import { useStateContext } from './Context';
// import { BackgroundLayout, WeatherCard, MiniCard } from './Components';

// function App() {
//   const [input, setInput] = useState('');
//   const { weather, thisLocation, values, place, setPlace, fetchWeatherData } = useStateContext();
//   const [coords, setCoords] = useState(null); // New state for storing geolocation coordinates
//   const [loading, setLoading] = useState(true); // New state for loading

//   // Function to request user location
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setCoords({ latitude, longitude });
//         fetchWeatherData({ latitude, longitude }); // Fetch weather data for the current location
//         setLoading(false); // Stop loading when data is fetched
//       },
//       (error) => {
//         console.error("Geolocation error: ", error);
//         setLoading(false); // Stop loading even if there is an error
//       },
//       { enableHighAccuracy: false }
//     );
//   }, [fetchWeatherData]);

//   const submitCity = () => {
//     setPlace(input);
//     setInput('');
//   };

//   const formatTime = (timestamp) => {
//     const date = new Date(timestamp * 1000);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   return (
//     <div className='w-full h-screen text-white px-8'>
//       <nav className='w-full p-3 flex justify-between items-center'>
//         <h1 className='font-bold tracking-wide text-3xl'>Weather App</h1>
//         <div className='bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
//           <img src={search} alt="search" className='w-[1.5rem] h-[1.5rem]' />
//           <input
//             onKeyUp={(e) => {
//               if (e.key === 'Enter') {
//                 submitCity();
//               }
//             }}
//             type="text"
//             placeholder='Search city'
//             className='focus:outline-none w-full text-[#212121] text-lg'
//             value={input}
//             onChange={e => setInput(e.target.value)}
//           />
//         </div>
//       </nav>
//       <BackgroundLayout />
//       <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
//         {/* {loading ? (
//           <p>Loading...</p> // Show a loading message while geolocation is fetched
//         ) : ( */}
//           <>
//             <WeatherCard
//               place={thisLocation}
//               windspeed={weather.wind_speed}
//               humidity={weather.humidity}
//               temperature={weather.temp}
//               heatIndex={weather.heatIndex}
//               iconString={weather.iconString}
//               conditions={weather.conditions}
//             />

//             <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
//               {values?.slice(0, 6).map(curr => (
//                 <MiniCard
//                   key={curr.dt}
//                   day={new Date(curr.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}
//                   time={formatTime(curr.dt)}
//                   temp={curr.main.temp}
//                   iconString={curr.weather[0].main}
//                 />
//               ))}
//             </div>

//             <div className='flex justify-center overflow gap-4 w-full py-4'>
//               {values?.slice(0, 24).map((hourData, index) => (
//                 <MiniCard
//                   key={index}
//                   time={formatTime(hourData.dt)}
//                   temp={hourData.main.temp}
//                   iconString={hourData.weather[0].main}
//                 />
//               ))}
//             </div>
//           </>
      
//       </main>
//     </div>
//   );
// }

// export default App;

































// import { useState } from 'react';
// import './App.css';
// import search from './assets/icons/search.svg';
// import { useStateContext } from './Context';
// import { BackgroundLayout, WeatherCard, MiniCard } from './Components';

// function App() {
//   const [input, setInput] = useState('');
//   const { weather, thisLocation, values, place, setPlace } = useStateContext();

//   const submitCity = () => {
//     setPlace(input);
//     setInput('');
//   };

//   const formatTime = (timestamp) => {
//     const date = new Date(timestamp * 1000);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   return (
//     <div className='w-full h-screen text-white px-8'>
//       <nav className='w-full p-3 flex justify-between items-center'>
//         <h1 className='font-bold tracking-wide text-3xl'>Weather App</h1>
//         <div className='bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
//           <img src={search} alt="search" className='w-[1.5rem] h-[1.5rem]' />
//           <input
//             onKeyUp={(e) => {
//               if (e.key === 'Enter') {
//                 submitCity();
//               }
//             }}
//             type="text"
//             placeholder='Search city'
//             className='focus:outline-none w-full text-[#212121] text-lg'
//             value={input}
//             onChange={e => setInput(e.target.value)}
//           />
//         </div>
//       </nav>
//       <BackgroundLayout />
//       <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
//         <WeatherCard
//           place={thisLocation}
//           windspeed={weather.wind_speed}
//           humidity={weather.humidity}
//           temperature={weather.temp}
//           heatIndex={weather.heatIndex}
//           iconString={weather.iconString}
//           conditions={weather.conditions}
//         />

//         <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
//           {values?.slice(0, 6).map(curr => (
//             <MiniCard
//               key={curr.dt}
//               day={new Date(curr.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}
//               time={formatTime(curr.dt)}
//               temp={curr.main.temp}
//               iconString={curr.weather[0].main}
//             />
//           ))}
//         </div>

//         {/* Hourly Updates Section */}
//         <div className='flex justify-center overflow gap-4 w-full py-4'>
//           {values?.slice(0, 24).map((hourData, index) => (
//             <MiniCard
//               key={index}
//               time={formatTime(hourData.dt)}
//               temp={hourData.main.temp}
//               iconString={hourData.weather[0].main}
//             />
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;



// {/* Hourly Updates Section */}
// <div className='flex overflow-x-scroll gap-4 w-full py-4'>
// {getCurrentHourData()?.map((hourData, index) => (
//   <MiniCard
//     key={index}
//     time={formatTime(hourData.dt)}
//     temp={hourData.main.temp}
//     iconString={hourData.weather[0].main}
//   />
// ))}
// </div>
// </main>
// </div>