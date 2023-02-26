import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.scss'
import { UpdateUser } from './Redux/authListener'
import store from './Redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <UpdateUser>
          <App />
        </UpdateUser>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
