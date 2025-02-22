import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import useParking from "@/hooks/useParking";
import ValidationError from '@/components/ValidationError';
import IconSpinner from '@/components/IconSpinner';

function OrderParking() {
    const { 
        parkingOptions: { 
            toSelect: { vehicles, zones }, 
            selected: { selectedOptions, setSelectedOptions },
        },
        createParking,
        loading,
        errors,
        successMessage,
    } = useParking();
    
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        await createParking(selectedOptions);
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col w-full mx-auto md:w-96">
                <h1 className="heading">Order Parking</h1>

                {successMessage && (
                    <div className="mb-4 alert alert-success" role="alert">
                        {successMessage}
                    </div>
                )}

                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="vehicle-select" className="required">Vehicle</label>
                    <select
                        id="vehicle-select"
                        onChange={event =>
                            setSelectedOptions(previousValue => ({
                                ...previousValue,
                                vehicle_id: event.target.value
                            }))
                        }
                        className="form-input"
                        disabled={loading}
                    >
                        <option value="">Select a vehicle</option>
                        { vehicles?.length && vehicles.map(vehicle => (
                            <option key={vehicle.id} value={vehicle.id}>
                                {vehicle.plate_number}
                            </option>
                        )) }
                    </select>
                    <ValidationError errors={errors} field="vehicle_id" />
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="zone-select" className="required">Zone</label>
                    <select
                        id="zone-select"
                        onChange={event =>
                            setSelectedOptions(previousValue => ({
                                ...previousValue,
                                zone_id: event.target.value
                            }))
                        }
                        className="form-input"
                        disabled={loading}
                    >
                        <option value="">Select a zone</option>
                        { zones?.length && zones.map(zone => (
                            <option key={zone.id} value={zone.id}>
                                {zone.name} ({(zone.price_per_hour / 100).toFixed(2)} $/h)
                            </option>
                        )) }
                    </select>
                    <ValidationError errors={errors} field="zone_id" />
                </div>

                <div className="border-t h-[1px] my-6"></div>

                <div className="flex flex-row gap-2">
                    <button
                        type="submit"
                        className="w-full btn btn-primary"
                        disabled={loading}
                    >
                        {loading && <IconSpinner />}
                        Save Parking
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        disabled={loading}
                        onClick={() => navigate(route('vehicles.index'))}
                    >
                        <span>Cancel</span>
                    </button>
                </div>
            </div>
        </form>
    );
}

export default OrderParking;