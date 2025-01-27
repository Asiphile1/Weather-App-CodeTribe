import React, { useEffect, useState } from 'react';
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';

const MiniCard = ({ day, time, temp, iconString }) => {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    if (iconString) {
      const lowerCaseIcon = iconString.toLowerCase();
      if (lowerCaseIcon.includes('cloud')) {
        setIcon(cloud);
      } else if (lowerCaseIcon.includes('rain')) {
        setIcon(rain);
      } else if (lowerCaseIcon.includes('clear')) {
        setIcon(sun);
      } else if (lowerCaseIcon.includes('thunder')) {
        setIcon(storm);
      } else if (lowerCaseIcon.includes('fog')) {
        setIcon(fog);
      } else if (lowerCaseIcon.includes('snow')) {
        setIcon(snow);
      } else if (lowerCaseIcon.includes('wind')) {
        setIcon(wind);
      }
    }
  }, [iconString]);

  return (
    <div className='glassCard w-[10rem] h-[10rem] p-4 flex flex-col'>
      <p className='text-center text-lg font-bold'>{day}</p>
      {time && <p className='text-center text-sm'>{time}</p>}
      <hr className='my-2' />
      <div className='w-full flex justify-center items-center flex-1'>
        <img src={icon} alt="forecast icon" className='w-[4rem] h-[4rem]' />
      </div>
      <p className='text-center font-bold'>{Math.round(temp)}°C</p>
    </div>
  );
};

export default MiniCard;














// import React, { useEffect, useState } from 'react';
// import sun from '../assets/icons/sun.png';
// import cloud from '../assets/icons/cloud.png';
// import fog from '../assets/icons/fog.png';
// import rain from '../assets/icons/rain.png';
// import snow from '../assets/icons/snow.png';
// import storm from '../assets/icons/storm.png';
// import wind from '../assets/icons/windy.png';

// const MiniCard = ({ timestamp, temp, iconString }) => {
//   const [icon, setIcon] = useState(null);
//   const [displayDate, setDisplayDate] = useState('');

//   useEffect(() => {
//     // Set weather icon
//     if (iconString) {
//       const lowerCaseIcon = iconString.toLowerCase();
//       if (lowerCaseIcon.includes('cloud')) {
//         setIcon(cloud);
//       } else if (lowerCaseIcon.includes('rain')) {
//         setIcon(rain);
//       } else if (lowerCaseIcon.includes('clear')) {
//         setIcon(sun);
//       } else if (lowerCaseIcon.includes('thunder')) {
//         setIcon(storm);
//       } else if (lowerCaseIcon.includes('fog')) {
//         setIcon(fog);
//       } else if (lowerCaseIcon.includes('snow')) {
//         setIcon(snow);
//       } else if (lowerCaseIcon.includes('wind')) {
//         setIcon(wind);
//       }
//     }

//     // Format the date
//     const forecastDate = new Date(timestamp * 1000);
//     const today = new Date();
    
//     // Reset hours to compare just the dates
//     today.setHours(0, 0, 0, 0);
//     const forecastDay = new Date(forecastDate);
//     forecastDay.setHours(0, 0, 0, 0);

//     // Calculate the difference in days
//     const diffDays = Math.round((forecastDay - today) / (1000 * 60 * 60 * 24));

//     // Set appropriate display text
//     switch (diffDays) {
//       case 0:
//         setDisplayDate('Today');
//         break;
//       case 1:
//         setDisplayDate('Tomorrow');
//         break;
//       default:
//         setDisplayDate(forecastDate.toLocaleDateString('en-US', { 
//           weekday: 'long',
//         }));
//     }
//   }, [iconString, timestamp]);

//   return (
//     <div className='glassCard w-[10rem] h-[10rem] p-4 flex flex-col'>
//       <p className='text-center text-lg font-bold'>{displayDate}</p>
//       <hr className='my-2' />
//       <div className='w-full flex justify-center items-center flex-1'>
//         <img src={icon} alt="forecast icon" className='w-[4rem] h-[4rem]' />
//       </div>
//       <p className='text-center font-bold'>{Math.round(temp)}°C</p>
//     </div>
//   );
// };

// export default MiniCard;

// // App.jsx (Replace the Daily Forecast section)
// // Inside your main component, replace the Daily Forecast div with this:

// {/* Daily Forecast */}
// <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
//   {values && values.length > 0 ? (
//     (() => {
//       const dailyForecasts = new Map();
      
//       // Group forecasts by day
//       values.forEach(forecast => {
//         const date = new Date(forecast.dt * 1000);
//         const dayKey = date.toDateString();
        
//         // Keep forecast closest to noon for each day
//         if (!dailyForecasts.has(dayKey)) {
//           dailyForecasts.set(dayKey, forecast);
//         } else {
//           const existingForecast = dailyForecasts.get(dayKey);
//           const existingHour = new Date(existingForecast.dt * 1000).getHours();
//           const currentHour = date.getHours();
          
//           // Compare which forecast is closer to noon (12)
//           if (Math.abs(12 - currentHour) < Math.abs(12 - existingHour)) {
//             dailyForecasts.set(dayKey, forecast);
//           }
//         }
//       });

//       // Convert Map to Array and sort by date
//       return Array.from(dailyForecasts.values())
//         .sort((a, b) => a.dt - b.dt)
//         .slice(0, 5) // Show next 5 days
//         .map(forecast => (
//           <MiniCard
//             key={forecast.dt}
//             timestamp={forecast.dt}
//             temp={forecast.main.temp}
//             iconString={forecast.weather[0].main}
//           />
//         ));
//     })()
//   ) : (
//     <p>Loading forecast data...</p>
//   )}
// </div>









// import React, { useEffect, useState } from 'react';
// import sun from '../assets/icons/sun.png';
// import cloud from '../assets/icons/cloud.png';
// import fog from '../assets/icons/fog.png';
// import rain from '../assets/icons/rain.png';
// import snow from '../assets/icons/snow.png';
// import storm from '../assets/icons/storm.png';
// import wind from '../assets/icons/windy.png';

// const MiniCard = ({ timestamp, temp, iconString }) => {
//   const [icon, setIcon] = useState(null);
//   const [displayDate, setDisplayDate] = useState('');

//   useEffect(() => {
//     // Set weather icon
//     if (iconString) {
//       const lowerCaseIcon = iconString.toLowerCase();
//       if (lowerCaseIcon.includes('cloud')) {
//         setIcon(cloud);
//       } else if (lowerCaseIcon.includes('rain')) {
//         setIcon(rain);
//       } else if (lowerCaseIcon.includes('clear')) {
//         setIcon(sun);
//       } else if (lowerCaseIcon.includes('thunder')) {
//         setIcon(storm);
//       } else if (lowerCaseIcon.includes('fog')) {
//         setIcon(fog);
//       } else if (lowerCaseIcon.includes('snow')) {
//         setIcon(snow);
//       } else if (lowerCaseIcon.includes('wind')) {
//         setIcon(wind);
//       }
//     }

//     // Format the date
//     const date = new Date(timestamp * 1000);
//     const today = new Date();
//     const tomorrow = new Date(today);
//     tomorrow.setDate(tomorrow.getDate() + 1);

//     if (date.toDateString() === today.toDateString()) {
//       setDisplayDate('Today');
//     } else if (date.toDateString() === tomorrow.toDateString()) {
//       setDisplayDate('Tomorrow');
//     } else {
//       setDisplayDate(date.toLocaleDateString('en-US', { weekday: 'long' }));
//     }
//   }, [iconString, timestamp]);

//   return (
//     <div className='glassCard w-[10rem] h-[10rem] p-4 flex flex-col'>
//       <p className='text-center text-lg font-bold'>{displayDate}</p>
//       <hr />
//       <div className='w-full flex justify-center items-center flex-1'>
//         <img src={icon} alt="forecast icon" className='w-[4rem] h-[4rem]' />
//       </div>
//       <p className='text-center font-bold'>{temp}°C</p>
//     </div>
//   );
// };

// export default MiniCard;










// /* eslint-disable react/prop-types */
// import React, { useEffect, useState } from 'react';
// import sun from '../assets/icons/sun.png';
// import cloud from '../assets/icons/cloud.png';
// import fog from '../assets/icons/fog.png';
// import rain from '../assets/icons/rain.png';
// import snow from '../assets/icons/snow.png';
// import storm from '../assets/icons/storm.png';
// import wind from '../assets/icons/windy.png';

// const MiniCard = ({ day, time, temp, iconString }) => {
//   const [icon, setIcon] = useState(null);

//   useEffect(() => {
//     if (iconString) {
//       const lowerCaseIcon = iconString.toLowerCase();
//       if (lowerCaseIcon.includes('cloud')) {
//         setIcon(cloud);
//       } else if (lowerCaseIcon.includes('rain')) {
//         setIcon(rain);
//       } else if (lowerCaseIcon.includes('clear')) {
//         setIcon(sun);
//       } else if (lowerCaseIcon.includes('thunder')) {
//         setIcon(storm);
//       } else if (lowerCaseIcon.includes('fog')) {
//         setIcon(fog);
//       } else if (lowerCaseIcon.includes('snow')) {
//         setIcon(snow);
//       } else if (lowerCaseIcon.includes('wind')) {
//         setIcon(wind);
//       }
//     }
//   }, [iconString]);

//   return (
//     <div className='glassCard w-[10rem] h-[10rem] p-4 flex flex-col'>
//       <p className='text-center text-lg font-bold'>{day}</p> {/* Display day of the week */}
//       <hr />
//       <div className='w-full flex justify-center items-center flex-1'>
//         <img src={icon} alt="forecast icon" className='w-[4rem] h-[4rem]' />
//       </div>
//       <p className='text-center font-bold'>{temp}&deg;C</p>
//     </div>
//   );
// };

// export default MiniCard;
