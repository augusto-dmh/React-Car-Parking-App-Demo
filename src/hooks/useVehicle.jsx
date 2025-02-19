import { useState } from "react";
import axios from 'axios';

function useVehicle() {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    async function addVehicle(vehicleData, signal) {
        setLoading(true);
        setErrors({});
        setSuccessMessage('');

        axios.post('vehicles', vehicleData, { signal })
            .then(() => setSuccessMessage('Vehicle added successfully'))
            .catch((error) => {
                if (error.response?.status === 422) {
                    setErrors(error.response.data.errors);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return { useAddVehicle: {errors, loading, successMessage, addVehicle} };
}

export default useVehicle;