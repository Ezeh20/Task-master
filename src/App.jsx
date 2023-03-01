import React from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Login from './userAuth/Login'
import SignUp from './userAuth/Sign-up'
import PageNot from './Pages/404'

function App() {
  const currentUser = useSelector((state) => state.user.value)
  const currentTheme = useSelector((state) => state.theme.value)

  return (
    <div className={`${currentTheme}`}>
      {currentUser ? (
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
