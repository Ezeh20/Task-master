import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Profile from '../Pages/Profile'
import Awards from './Awards/Awards'
import CompletedTask from './Completed-Tasks/Completed-task'

function UserRoute() {
  return (
    <Routes>
      <Route index element={<Profile />} />
      <Route path="completed" element={<CompletedTask />} />
      <Route path="awards" element={<Awards />} />
    </Routes>
  )
}

export default UserRoute
