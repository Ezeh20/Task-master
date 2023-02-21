import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { darkMode, lightMode } from './Redux/theme'

function App() {
  const { value } = useSelector((state) => state.theme)
  const dispatch = useDispatch()
  return (
    <>
      <h1>{value}</h1>
      <button onClick={() => dispatch(lightMode())}>light</button>
      <button onClick={() => dispatch(darkMode())}>dark</button>
    </>
  )
}

export default App
