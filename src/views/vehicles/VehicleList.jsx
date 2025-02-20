import NamedLink from '@/components/NamedLink';
import { Link } from 'react-router-dom';
import { route } from '@/routes';
import useVehicle from '@/hooks/useVehicle';
import IconSpinner from '@/components/IconSpinner';
import VehicleItems from '@/components/VehicleItems';

function VehiclesList() {
    const { vehicle: { data, loading } } = useVehicle();

    return (
        <div>
            <div className="flex flex-col w-full mx-auto md:w-96">
                <h1 className="heading">My Vehicles</h1>

                <div className="flex flex-col gap-2 mb-4">
                    <Link to={ route('vehicles.create') } className="btn btn-primary">
                        Add Vehicle
                    </Link>
                </div>

                <div className="border-t h-[1px] my-6"></div>

                { console.log('access_token: ' + localStorage.getItem('access_token')) }

                { loading 
                    ? <IconSpinner />
                    : <VehicleItems vehicles={ data } />
                }  
            </div>

        </div>
    );
}

export default VehiclesList