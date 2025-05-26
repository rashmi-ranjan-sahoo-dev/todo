import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Middleauth = () => {
  const location = useLocation();
  const firstChar = location.state?.firstChar || ''; // fallback to empty if undefined

  const [bgColor,setBgColor] = useState('#000000');

  useEffect(() => {
    const getRandomColor = () =>{
        const letters = '0123456789ABCDEF'
       let color = "#";
        for(let i = 0 ; i< 6;i++){
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    setBgColor(getRandomColor())

    }
  ,[])

  return (
    <div >
      {firstChar && (
        <div 
        style={{ backgroundColor: bgColor}}
        className="w-12 h-12 rounded-full  text-white flex items-center justify-center text-xl mt-4">
          {firstChar}
        </div>
      )}
    </div>
  );
};

export default Middleauth;
