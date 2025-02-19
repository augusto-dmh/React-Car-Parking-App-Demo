import NamedLink from '@/components/NamedLink';
import { Link } from 'react-router-dom';
import { route } from '@/routes';

function VehiclesList() {
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
                <p>There will be vehicles list</p>  
            </div>
        </div>
    );
}

export default VehiclesList