import { Link } from 'react-router-dom'
import { route } from '@/routes'
import { useVehicles } from '@/hooks/useVehicles'
import { useNavigate } from 'react-router-dom';
import useVehicle from '../../hooks/useVehicle';
 
function VehiclesList() {
  const { vehicles, getVehicles } = useVehicles()
  const { destroyVehicle } = useVehicle()
 
  return (
    <div className="flex flex-col w-full mx-auto md:w-96">
 
      <h1 className="heading">My Vehicles</h1>
 
      <Link to={ route('vehicles.create') } className="btn btn-primary">
        Add Vehicle
      </Link>
 
      <div className="border-t h-[1px] my-6"></div>
 
      <div className="flex flex-col gap-2">
        { vehicles.length > 0 && vehicles.map(vehicle => {
          return (
            <div
              key={ vehicle.id }
              className="flex justify-between w-full p-2 bg-gray-100"
            >
              <div className="flex items-center w-full overflow-hidden">
                <div className="text-xl plate">
                  { vehicle.plate_number }
                </div>
                <div className="pl-2 font-normal text-gray-600 truncate grow">
                  { vehicle.description }
                </div>
              </div>
              <div className="flex gap-1">
                <Link
                  to={ route('vehicles.edit', { id: vehicle.id }) }
                  className="text-sm btn btn-secondary"
                >
                  Edit
                </Link>
                <button type="button" className="text-sm text-white bg-red-600 btn hover:bg-red-500"
                  onClick={ async () => { 
                    await destroyVehicle(vehicle)
                    // considering this functionality is in a multi-tenant module (vehicles) 
                    // and thus we wouldn't have two or more users managing the same type of resource they own at the same time, 
                    // my previous own approach of setting the vehicles without the deleted vehicle seems more appropriate than making an API call to refetch the vehicles.
                    await getVehicles()
                  }}
                >X</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
 
export default VehiclesList