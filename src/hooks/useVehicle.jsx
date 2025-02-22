import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function useVehicle(id = null) {
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({})
    const [confirmDeletionForVehicle, setConfirmDeletionForVehicle] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      if (id !== null) {
        const controller = new AbortController()
        getVehicle(id, { signal: controller.signal })
        return () => controller.abort()
      }
    }, [id]);

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

    async function getVehicle(id, { signal } = {}) {
      setLoading(true);

      return axios.get(`vehicles/${id}`, { signal })
        .then(response => setData(response.data.data))
        .catch(() => {})
        .finally(() => setLoading(false))
    }

    async function updateVehicle(vehicle) {
      setLoading(true)
      setErrors({})

      return axios.put(`vehicles/${vehicle.id}`, vehicle)
        .then(() => navigate(route('vehicles.index')))
        .catch(error => {
          if (error.response?.status === 422) {
            setErrors(error.response.data.errors)
          }
        })
        .finally(() => setLoading(false))
    }

    async function deleteVehicle(vehicle) {
      return axios.delete(`vehicles/${vehicle.id}`)
        .then(() => setConfirmDeletionForVehicle(null))
        .catch(error => {});
    }

    async function tryToDeleteVehicle(vehicle, setVehicles) {
      setConfirmDeletionForVehicle(vehicle.id);

      // always not true in the first execution due to React's Component Lifecycle (a state variable holds the new value only in the next render)
      if (confirmDeletionForVehicle === vehicle.id) {
        deleteVehicle(vehicle)
          .then(() => 
            setVehicles(currentVehicles => 
              [...currentVehicles.filter(v => v.id !== vehicle.id)]
            )
          )
          .catch(error => console.error(error));
      }
    }

    return {
        vehicle: { data, setData, errors, loading, confirmDeletionForVehicle },
        createVehicle,
        updateVehicle,
        tryToDeleteVehicle,
    }
}

export default useVehicle;