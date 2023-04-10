import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import'bootstrap/dist/js/bootstrap.bundle.min.js'
import'bootstrap/dist/css/bootstrap.min.css'
import "@fortawesome/fontawesome-free/css/all.min.css"
import './index.css'
import "jquery/dist/jquery.min.js"
import'spinkit/spinkit.min.css'
import GamesContext from './components/GamesContext/GamesContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <GamesContext>
    <App />
    </GamesContext>
    
  </React.StrictMode>,
)
