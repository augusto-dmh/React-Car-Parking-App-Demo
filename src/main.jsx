import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import App from '@/App'
import Home from '@/views/Home'
import Register from '@/views/auth/Register'
import Login from '@/views/auth/Login'
import VehiclesList from '@/views/vehicles/VehiclesList'
import CreateVehicle from '@/views/vehicles/CreateVehicle'
import EditVehicle from '@/views/vehicles/EditVehicle'
import '@/assets/main.css'
import { route } from '@/routes'
import ActiveParkings from '@/views/parkings/ActiveParkings'
import ParkingHistory from '@/views/parkings/ParkingHistory'
import ParkingDetails from '@/views/parkings/ParkingDetails'
import OrderParking from '@/views/parkings/OrderParking'
import EditProfile from '@/views/profile/EditProfile'
import ChangePassword from '@/views/profile/ChangePassword'

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
          <Route path={ route('vehicles.create')} element={<CreateVehicle />} />
          <Route path={ route('vehicles.edit')} element={<EditVehicle />} />
          <Route path={ route('parkings.active')} element={<ActiveParkings />} />
          <Route path={ route('parkings.history')} element={<ParkingHistory />} />
          <Route path={ route('parkings.show')} element={<ParkingDetails />} />
          <Route path={ route('parkings.create')} element={<OrderParking />} />
          <Route path={ route('profile.edit') } element={<EditProfile />} />
          <Route path={ route('profile.change-password') } element={<ChangePassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
