import { useState, useRef, useEffect } from "react";
import useVehicle from "@/hooks/useVehicle";
import ValidationError from '@/components/ValidationError';
import IconSpinner from '@/components/IconSpinner';

function VehicleStore() {
    const [vehicleData, setVehicleData] = useState({});
    const { useAddVehicle: {errors, loading, successMessage, addVehicle} } = useVehicle();
    const abortControllerRef = useRef(null);

    useEffect(() => {
        abortControllerRef.current = new AbortController();
        return () => abortControllerRef.current.abort();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        const { current: { signal } } = abortControllerRef;

        await addVehicle(vehicleData, signal);

        setVehicleData({});
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-full mx-auto md:w-96">
                <h1 className="heading">Add Vehicle</h1>

                {successMessage && (
                    <div className="mb-4 alert alert-success" role="alert">
                        {successMessage}
                    </div>
                )}

                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="plate_number" className="required">Plate Number</label>
                    <input
                        id="plate_number"
                        name="plate_number"
                        type="text"
                        value={vehicleData?.plate_number || ''}
                        onChange={(event) => setVehicleData({ ...vehicleData, plate_number: event.target.value })}
                        className="form-input"
                        disabled={loading}
                    />
                    <ValidationError errors={errors} field="plate_number" />
                </div>

                <div className="border-t h-[1px] my-6"></div>

                <div className="flex flex-row gap-2 mb-4">
                    <button type="submit" className="flex-1 btn btn-primary" disabled={loading}>
                        {loading && <IconSpinner />}
                        Save Vehicle
                    </button>
                    <button type="button" className="btn btn-secondary flex-2"
                        onClick={() => abortControllerRef.current.abort()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
}

export default VehicleStore;