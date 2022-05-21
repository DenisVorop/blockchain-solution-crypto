import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import { setupStore } from './redux/store'

import './styles/index.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)

const store = setupStore()

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
