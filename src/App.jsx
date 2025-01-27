import { Outlet, NavLink } from 'react-router-dom'
 
function App() {
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
              <NavLink end to="/" className={({isActive}) => {
                return isActive ? 'text-blue-600 underline' : 'text-blue-600'
              }}>Home</NavLink>
            </div>
            <div className="flex items-center gap-4">
              <NavLink end to="/register" className={({isActive}) => {
                return isActive ? 'text-blue-600 underline' : 'text-blue-600'
              }}>Register</NavLink>
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