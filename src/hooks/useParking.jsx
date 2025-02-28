import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { route } from '@/routes'

export function useParking() {
    const navigate = useNavigate()
    const [parkings, setParkings] = useState([])
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const location = useLocation();

    useEffect(() => {
        const abortController = new AbortController();
        if (location.pathname === '/parkings/active') {
            getParkings(abortController.signal);
        }
        return () => abortController.abort();
    }, [location.pathname]);

    async function getParkings(signal) {
        console.log(axios.defaults.headers.common['Authorization']);
        return axios.get('parkings', { signal })
            .then((response) => setParkings(response.data.data))
            .catch((error) => console.error(error));
    }

    async function startParking(data) {
        setLoading(true)

        return axios.post('parkings/start', data)
            .then(() => navigate(route('parkings.active')))
            .catch((error) => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors);
                }
            })
            .finally(() => setLoading(false))
    }

    async function stopParking(parkingId) {
        setLoading(true);

        return axios.put(`parkings/${parkingId}`)
            .then(() =>
                setParkings(prevParkings => 
                    prevParkings.filter(parking => parking.id !== parkingId)
                )
            )
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    return { loading, errors, parkings, startParking, stopParking }
}
