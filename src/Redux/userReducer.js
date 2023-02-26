/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const User = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { updateUser } = User.actions
export default User.reducer
