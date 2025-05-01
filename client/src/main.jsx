import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Skeleton-2.0.4/css/normalize.css'
import './Skeleton-2.0.4/css/skeleton.css'
import { App } from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
