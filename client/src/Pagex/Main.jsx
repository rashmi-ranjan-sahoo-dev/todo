import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Logout from '../components/Authentication/logout'
import LoginName from '../components/Authentication/LoginName'

const Main = () => {

  const [isDarkMode,setIsDarkMode] = useState(false)
  const recevedData = (receve)=>{
    setIsDarkMode(receve)
  }

   useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div 
    className={isDarkMode ?"min-h-screen   dark:bg-gray-900  transition-all duration-300" : "min-h-screen   bg-white  transition-all duration-300"}>
      <Header sendDataToApp = {recevedData} />
       <Outlet/>
       <Logout />
       <LoginName/>
    </div>
  )
}

export default Main