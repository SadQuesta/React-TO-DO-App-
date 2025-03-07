import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


const DATA = JSON.parse(localStorage.getItem("tasks") || "[]");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App tasks ={DATA}/>
  </StrictMode>,
)
