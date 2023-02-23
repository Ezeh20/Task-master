import React from 'react'
import { useSelector } from 'react-redux'
import Home from './Pages/Home'

function App() {
  const currentTheme = useSelector((state) => state.theme.value)

  return (
    <div className={`${currentTheme}`}>
      <Home />
    </div>
  )
}

export default App
