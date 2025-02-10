import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import App from '@/App'
import Home from '@/views/Home'
import Register from '@/views/auth/Register'
import Login from '@/views/auth/Login'
import VehiclesList from '@/views/vehicles/VehicleList'
import '@/assets/main.css'
import { route } from '@/routes'
import ActiveParkings from '@/views/parkings/ActiveParkings'

window.axios = axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.withCredentials = true
window.axios.defaults.baseURL = 'http://car-parking-api.test/api/v1'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={ route('home') } element={<App />}>
          <Route index element={<Home />} />
          <Route path={ route('register') } element={<Register />} />
          <Route path={ route('login') } element={<Login/>} />
          <Route path={ route('vehicles.index')} element={<VehiclesList />} />
          <Route path={ route('parkings.active')} element={<ActiveParkings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
