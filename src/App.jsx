import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './userAuth/Login'
import SignUp from './userAuth/Sign-up'
import PageNot from './Pages/404'
import { UpdateUserContext } from './Redux/authListener'
import UserRoute from './Routes/User-Route'

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
          <Route path="user/*" element={<UserRoute />} />
          <Route path="*" element={<PageNot />} />
        </Routes>
      ) : (
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="user" element={<Login />} />
          <Route path="*" element={<PageNot />} />
        </Routes>
      )}
    </div>
  )
}

export default App
