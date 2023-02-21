import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { darkMode, lightMode, user } from './Redux/theme'

const demo = {
  id: 1,
  name: 'ezeh',
}

function App() {
  const { value } = useSelector((state) => state.theme)
  
  const dispatch = useDispatch()
  return (
    <div>
      <h1>{value.name}</h1>
      {value === 'light' ? (
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
