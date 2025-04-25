import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from "react-redux"
import {store} from './redux/store.js'
import './index.css'
import App from './App.jsx'
import AuthInitializer from './components/AuthInitializer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
  <AuthInitializer>
  <App />
  </AuthInitializer>
    </Provider>
  </StrictMode>,
)

