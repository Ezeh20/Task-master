/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import ThemeToggle from './theme'

const persistConfig = {
  key: 'root',
  storage,
}

const presisted = persistReducer(persistConfig, ThemeToggle)

const store = configureStore({
  reducer: {
    theme: presisted,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})

export const presistor = persistStore(store)
export default store
