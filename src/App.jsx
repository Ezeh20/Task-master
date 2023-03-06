import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Login from './userAuth/Login'
import SignUp from './userAuth/Sign-up'
import PageNot from './Pages/404'
import { UpdateUserContext } from './Redux/authListener'

function App() {
  const { logged } = useContext(UpdateUserContext)
  const currentTheme = useSelector((state) => state.theme.value)

  return (
    <div className={`${currentTheme}`}>
      {logged ? (
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<PageNot />} />
        </Routes>
      ) : (
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="profile" element={<Login />} />
          <Route path="*" element={<PageNot />} />
        </Routes>
      )}
    </div>
  )
}

export default App
