import React from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './userAuth/Login'

function App() {
  const currentTheme = useSelector((state) => state.theme.value)

  return (
    <div className={`${currentTheme}`}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
