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
    user: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { lightMode, darkMode, user } = Theme.actions
export default Theme.reducer
