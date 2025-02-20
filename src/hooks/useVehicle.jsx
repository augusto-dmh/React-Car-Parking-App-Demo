import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

function useVehicle() {
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [data, setData] = useState({})
    const location = useLocation();

    useEffect(() => {
      const matchedEditVehicleRoute = location.pathname.match(/^\/vehicles\/\d+\/edit$/);
      if (matchedEditVehicleRoute) {
        const id = matchedEditVehicleRoute[0].split('/')[2];
        const abortController = new AbortController();
        getVehicle(id, abortController.signal);

        return () => abortController.abort();
      }
    }, [location]);

    async function getVehicle(id, signal = {}) {
      setLoading(true);

      return axios.get(`vehicles/${id}`, { signal })
        .then((response) => setData(response.data.data))
        .catch((error) => {
          console.error(error);
          if (error.response?.status === 422) setErrors(error.response.data.errors);
        })
        .finally(() => setLoading(false));
    }

    function createVehicle(data) {
        setLoading(true)
        setErrors({})
        
        return axios.post('vehicles', data)
          .then(() => navigate(route('vehicles.index')))
          .catch(error => {
            if (error.response?.status === 422) {
              setErrors(error.response.data.errors)
            }
          })
          .finally(() => setLoading(false))
    }

    function editVehicle(data) {
      setLoading(true)
      setErrors({})
      setSuccessMessage('');
      
      return axios.put(`/vehicles/${data.id}`, data)
        .then(() => setSuccessMessage('Vehicle updated successfully'))
        .catch(error => {
          if (error.response?.status === 422) {
            setErrors(error.response.data.errors)
          }
        })
        .finally(() => setLoading(false))
  }

    return {
        vehicle: { data, setData, errors, loading, successMessage },
        createVehicle,
        editVehicle,
    }
}

export default useVehicle;