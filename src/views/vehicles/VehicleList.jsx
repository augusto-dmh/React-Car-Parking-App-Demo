import NamedLink from '@/components/NamedLink';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';

function VehiclesList() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex flex-col w-full mx-auto md:w-96">
                <h1 className="heading">My Vehicles</h1>

                <div className="flex flex-col gap-2 mb-4">
                    <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={() => navigate(route('vehicles.store'))}
                    >
                        Add Vehicle
                    </button>
                </div>

                <div className="border-t h-[1px] my-6"></div>
                <p>There will be vehicles list</p>
            </div>
        </div>
    );
}

export default VehiclesList