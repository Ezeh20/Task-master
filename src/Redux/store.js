/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import ThemeToggle from './themeReducer'
import currentUser from './userReducer'

const persistConfig = {
  key: 'root',
  storage,
}

const presisted = persistReducer(persistConfig, ThemeToggle)

const store = configureStore({
  reducer: {
    theme: presisted,
    user: currentUser,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})

export const presistor = persistStore(store)
export default store
