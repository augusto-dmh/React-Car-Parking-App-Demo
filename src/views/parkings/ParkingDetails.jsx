import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { route } from '@/routes'

function ParkingDetails() {
    const { id } = useParams()
    const [parking, setParking] = useState(null)

    useEffect(() => {
        const controller = new AbortController()
        getParking(id, { signal: controller.signal })

        return () => controller.abort()
    }, [id])

    async function getParking(id, { signal } = {}) {
        return axios.get(`parkings/${id}`, { signal })
            .then((response) => setParking(response.data.data))
            .catch((error) => console.error(error))
    }

    return (parking &&
        <div className="flex flex-col w-full mx-auto md:w-96">
        
          <h1 className="heading">Parking order details</h1>
        
          <div className="p-2 font-mono border">
            <div className="mb-4 font-bold uppercase">
              parking order #{ parking.id }
            </div>
        
            <div className="font-bold uppercase">license plate</div>
            <div className="text-2xl plate">
              { parking.vehicle.plate_number }
            </div>
        
            <div className="font-bold uppercase">description</div>
            <div>{ parking.vehicle.description }</div>
        
            <div className="font-bold uppercase">zone</div>
            <div>{ parking.zone.name }</div>
        
            <div className="font-bold uppercase">price</div>
            <div>
              { (parking.zone.price_per_hour / 100).toFixed(2) }{' '}
              &euro; per hour
            </div>
        
            <div className="font-bold uppercase">from</div>
            <div>{ parking.start_time }</div>
        
            <div className="font-bold uppercase">to</div>
            <div>{ parking.stop_time }</div>
        
            <div className="font-bold uppercase">total</div>
            <div className="text-xl">
              { (parking.total_price / 100).toFixed(2) } &euro;
            </div>
          </div>
        
          <div className="border-t h-[1px] my-6"></div>
        
          <Link
            to={ route('parkings.history') }
            className="uppercase btn btn-secondary"
          >
            return
          </Link>
        </div>
    )
}

export default ParkingDetails;