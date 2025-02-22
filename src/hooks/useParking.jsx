import { useVehicles } from "@/hooks/useVehicles";
import { useState, useEffect } from 'react';

function useParking() {
    const { vehicles } = useVehicles();
    const [zones, setZones] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const abortController = new AbortController();
        const { signal } = abortController;

        getZones(signal);

        return () => abortController.abort();
    }, []);

    async function getZones(signal) {
        return axios.get('zones', { signal })
            .then((response) => setZones(response.data.data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    async function createParking(selectedOptions) {
        setErrors({});
        setSuccessMessage('');
        setLoading(true);

        return axios.post('parkings/start', selectedOptions)
            .then(() => setSuccessMessage('Parking started successfully.'))
            .catch((error) => {
                if (error.response.status === 422) {
                    setErrors(
                        previousErrors => {
                            const newErrors = { ...previousErrors };

                            if (error.response.data.errors.vehicle_id) {
                                newErrors.vehicle_id = ['Vehicle is required.'];
                            }
                            if (error.response.data.errors.zone_id) {
                                newErrors.zone_id = ['Zone is required.'];
                            }
                            if (error.response.data.errors.general?.[0].startsWith("Can't start parking twice")) {
                                newErrors.vehicle_id = ['Vehicle already parked.']
                            }

                            return newErrors;
                        }
                    )
                }
                console.error(error);
            })
            .finally(() => setLoading(false));
    }

    return {
        parkingOptions: { 
            toSelect: { vehicles, zones }, 
            selected: { selectedOptions, setSelectedOptions },
        },
        createParking,
        loading,
        errors,
        successMessage,
    };
}

export default useParking;