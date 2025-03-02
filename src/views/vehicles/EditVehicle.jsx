import { useNavigate, useParams } from 'react-router-dom';
import { route } from '@/routes'
import useVehicle from "@/hooks/useVehicle";
import ValidationError from '@/components/ValidationError';
import IconSpinner from '@/components/IconSpinner';

function EditVehicle() {
    const params = useParams()
    const { vehicle, updateVehicle } = useVehicle(params.id)
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()

        await updateVehicle(vehicle.data)
    }

    return (
        <form onSubmit={ handleSubmit } noValidate>
            <div className="flex flex-col w-full mx-auto md:w-96">
                <h1 className="heading">Edit Vehicle</h1>

                {vehicle.successMessage && (
                    <div className="mb-4 alert alert-success" role="alert">
                        {vehicle.successMessage}
                    </div>
                )}

                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="plate_number" className="required">License Plate</label>
                    <input
                        id="plate_number"
                        name="plate_number"
                        type="text"
                        value={ vehicle.data.plate_number ?? '' }
                        onChange={ event => vehicle.setData({ ...vehicle.data, plate_number: event.target.value }) }
                        className="form-input plate"
                        disabled={ vehicle.loading }
                    />
                    <ValidationError errors={ vehicle.errors } field="plate_number" />
                </div>
                
                <div className="border-t h-[1px] my-6"></div>

                <div className="flex flex-row gap-2">
                    <button
                        type="submit"
                        className="w-full btn btn-primary"
                        disabled={ vehicle.loading }
                    >
                        { vehicle.loading && <IconSpinner /> }
                        Update Vehicle
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        disabled={ vehicle.loading }
                        onClick={ () => navigate(route('vehicles.index')) }
                    >
                        <span>Cancel</span>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default EditVehicle;