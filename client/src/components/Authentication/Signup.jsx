import React from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {

const navigate = useNavigate();

    function redirectUser(){
        navigate("/");
    }

  return (
    <div className='flex items-center justify-center min-h-screen w-full bg-blue-600'>
      <form className='sm:w-[30%] w-50 sm:h-110 sm:border-2 p-5 sm:p-10 text-center bg-white border-none rounded-3xl' action="">
        <h1 className='sm:text-4xl text-2xl sm:pb-5 pb-3'>SignUp</h1>
          <input type="text" name="name" id="" placeholder='name' className='border text-center rounded-2xl sm:p-4 p-2 block w-full sm:text-xl' />
          <br />
          <input type="text" name='email' placeholder='email' className='border text-center rounded-2xl sm:p-4 p-2 block w-full sm:text-xl '/>
          <br />
          <input type="text" name='password' placeholder='password'className='border text-center rounded-2xl sm:p-4 p-2 block w-full sm:text-xl '/>
          <br />
          <button onClick={redirectUser} className='w-fit sm:text-xl mb-2 p-2 rounded-xl bg-blue-600 shadow-lg ' type='submit'>SignUp</button>
      </form>
    </div>
  )
}

export default Signup
