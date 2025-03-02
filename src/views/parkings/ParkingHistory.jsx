import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { route } from '@/routes'
 
function ParkingHistory() {
  const [parkings, setParkings] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    getParkingHistory({ signal: controller.signal })
    return () => controller.abort()
  })

  async function getParkingHistory({ signal } = {}) {
    return axios.get('parkings/history', { signal })
      .then(response => setParkings(response.data.data))
      .catch(() => {})
  }
  
  return (
    <div className="flex flex-col w-full mx-auto md:w-96">
 
      <h1 className="heading">Parking History</h1>
 
      <Link to={ route('parkings.create') } className="btn btn-primary">
        Order Parking
      </Link>
 
      <div className="border-t h-[1px] my-6"></div>
 
      <div className="flex flex-col gap-1">
        { parkings.length > 0 && parkings.map((parking) => {
          return <div
            key={ parking.id }
            className="flex flex-col gap-1 p-2 border"
          >
            <div className="text-2xl plate">
              { parking.vehicle.plate_number }
            </div>
            <div className="p-2 bg-gray-100">
              { parking.zone.name }{' '}
              ({ (parking.zone.price_per_hour / 100).toFixed(2) } &euro;/h)
            </div>
            <div>
              <div className="font-bold uppercase">from</div>
              <span className="font-mono">{ parking.start_time }</span>
            </div>
            <div>
              <div className="font-bold uppercase">to</div>
              <span className="font-mono">{ parking.stop_time }</span>
            </div>
            <div className="flex ml-auto items-top">
              <span className="text-2xl font-bold">
                { (parking.total_price / 100).toFixed(2) }
              </span>
              <span className="pt-0.5">&nbsp;&euro;</span>
            </div>
            <Link
              className="w-full ml-auto uppercase btn btn-secondary"
              to={ route('parkings.show', { id: parking.id }) }
            >
              view details
            </Link>
          </div>
        })}
      </div>
    </div>
  )
}
 
export default ParkingHistory