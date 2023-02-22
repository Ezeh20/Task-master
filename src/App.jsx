import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { darkMode, lightMode } from './Redux/themeReducer'

function App() {
  const currentTheme = useSelector((state) => state.theme.value)

  const dispatch = useDispatch()
  return (
    <div>
      <h1>{currentTheme}</h1>
      {currentTheme === 'light' ? (
        <button type="button" onClick={() => dispatch(darkMode())}>
          dark
        </button>
      ) : (
        <button type="button" onClick={() => dispatch(lightMode())}>
          light
        </button>
      )}
    </div>
  )
}

export default App
