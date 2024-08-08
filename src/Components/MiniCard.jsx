/* eslint-disable react/prop-types */
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
      <p className='text-center text-lg font-bold'>{day}</p> {/* Display day of the week */}
      <hr />
      <div className='w-full flex justify-center items-center flex-1'>
        <img src={icon} alt="forecast icon" className='w-[4rem] h-[4rem]' />
      </div>
      <p className='text-center font-bold'>{temp}&deg;C</p>
    </div>
  );
};

export default MiniCard;
