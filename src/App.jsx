import { Outlet } from 'react-router-dom'
import NamedLink from '@/components/NamedLink'
import { useAuth } from '@/hooks/useAuth'
 
function App() {
  // isLoggedIn is not a global state - isn't shared between components, so changing it in 'useAuth' from 'Login' wouldn't trigger a re-render here
  const { isLoggedIn, logout } = useAuth()

  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) logout(true)
      return Promise.reject(error)
    },
  )

  function leftGuestLinks() {
    return <>
      <NamedLink name="home">
        Home
      </NamedLink>
    </>
  }
 
  function leftAuthLinks() {
    return <>
      <NamedLink name="parkings.active">
        Parkings
      </NamedLink>
      <NamedLink name="vehicles.index">
        Vehicles
      </NamedLink>
    </>
  }
 
  function rightGuestLinks() {
    return <>
      <NamedLink name="login">
        Login
      </NamedLink>
      <NamedLink name="register">
        Register
      </NamedLink>
    </>
  }
 
  function rightAuthLinks() {
    return <>
      <NamedLink name="profile.edit">
        Edit Profile
      </NamedLink>
      <button onClick={ logout } type="button" className="text-blue-600">
        Logout
      </button>
    </>
  }

  return (
    <div className="App">
      <header className="py-6 bg-gray-100 shadow">
        <div className="container px-4 mx-auto md:px-2">
          <nav className="flex justify-between gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold">
                <div
                  className="inline-flex items-center justify-center w-6 h-6 mr-1 text-center text-white bg-blue-600 rounded"
                >
                  P
                </div>
                myParking
              </h2>
              { isLoggedIn ? leftAuthLinks() : leftGuestLinks() }
            </div>
            <div className="flex items-center gap-4">
              { isLoggedIn ? rightAuthLinks() : rightGuestLinks() }
            </div>
          </nav>
        </div>
      </header>
      <div className="container px-4 pt-8 mx-auto md:px-2 md:pt-16">
        <Outlet />
      </div>
    </div>
  )
}
 
export default App