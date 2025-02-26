import { Link } from 'react-router-dom'
import { route } from '@/routes'
 
function ActiveParkings() {
  return (
    <div className="flex flex-col w-full mx-auto md:w-96">
 
      <h1 className="heading">Active Parkings</h1>
 
      <Link to={ route('parkings.create') } className="btn btn-primary">
        Order Parking
      </Link>
 
      <div className="border-t h-[1px] my-6"></div>
 
      <div>
        There will be active parkings list
      </div>
    </div>
  )
}
 
export default ActiveParkings