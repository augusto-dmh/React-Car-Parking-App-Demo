import { useState, useEffect } from "react";

function useVehicle() {
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])

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

    return {
        vehicle: { data, setData, errors, loading },
        createVehicle,
    }
}

export default useVehicle;