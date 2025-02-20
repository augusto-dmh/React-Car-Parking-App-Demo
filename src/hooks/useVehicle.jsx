import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

function useVehicle() {
    const location = useLocation();
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
      if (location.pathname === '/vehicles' && data.length === 0) getVehicles();
    }, [location, data])

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

    function getVehicles() {
      setLoading(true);

      return axios.get('vehicles')
        .then(response => {
          setData(response.data.data)
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }

    return {
        vehicle: { data, setData, errors, loading },
        createVehicle,
        getVehicles,
    }
}

export default useVehicle;