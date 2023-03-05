/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const todos = createSlice({
  name: 'task',
  initialState,
  reducers: {
    getTodos: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { getTodos } = todos.actions
export default todos.reducer
