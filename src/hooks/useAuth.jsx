import { useNavigate } from 'react-router-dom'
import { route } from '@/routes'

export function useAuth() {
    const navigate = useNavigate()

    // `data` should be {name, email, password, password_confirmation}
    async function register(data) {
        return axios.post('auth/register', data)
            .then(() => {
                navigate(route('vehicles.index'))
            })
            .catch(() => {})

        // const response = await axios.post('auth/register', data);
        
        // if (response.status >= 200 && response.status < 300) {
        //     navigate(route('vehicles.index'))
        // }
    }

    return { register }
}