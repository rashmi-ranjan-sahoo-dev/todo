import React from 'react'
import Main from './Pagex/main'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signin from './components/Authentication/Signin'
import Signup from './components/Authentication/Signup'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}>
          <Route path='signup' element={<Signup />} />
          <Route path='signin' element={<Signin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
