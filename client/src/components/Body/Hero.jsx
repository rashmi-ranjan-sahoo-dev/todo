import React from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TaskBoard from './TaskBoard';

const Hero = () => {

     const today = new Date();
  const weekday = today.toLocaleDateString('en-US', {weekday: 'long'});
  const date = today.getDate();
  const month = today.toLocaleDateString('en-US', { month: 'long'})
  const year = today.getFullYear();


  return ( 
      // parent div
    <div className=' bg-amber-100 grid sm:grid-cols-3 grid-cols-1 ml-15 mr-15'>
      {/* child one */}
      <div className=" col-span-1 flex flex-col items-center justify-center ">
              <div className='p-5 text-4xl italic '>
                <p className='italic text-cyan-700 text-3xl '>{weekday}</p>
                {date},{month} {year}
              </div>
              <Calendar
                className="m-4 hidden sm:block bg-white p-4 rounded-xl shadow-md border border-gray-200 "
              />
                 <div className='m-4 w-[200px] md:w-[400px] flex items-center justify-around'>
                {/* active todos */}
                <div className='md:text-xl text-sm text-center md:h-25 md:w-35 w-24 bg-[#F0D1A8] p-2 rounded-xl' >
                    <p>COMPLETED TASKS</p>
                    <p>4</p>
                </div>
                <div className='text-center md:text-xl text-sm md:h-25 md:w-35 w-25 bg-[#C4A49F] p-2 rounded-xl'>
                    <p>PENDING TASKS</p>
                    <p>5</p>
                </div>
            </div>
            </div>
            {/* child two */}
            <div className='col-span-2'>
                 <TaskBoard/>
            </div>
    </div>
  )
}

export default Hero
