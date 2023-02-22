/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 'light',
}

export const Theme = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    lightMode: (state) => {
      state.value = 'light'
    },
    darkMode: (state) => {
      state.value = 'dark'
    },
  },
})

export const { lightMode, darkMode, user } = Theme.actions
export default Theme.reducer
