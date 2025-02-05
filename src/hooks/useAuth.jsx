import { useNavigate } from 'react-router-dom'
import { route } from '@/routes'
import { useState } from 'react'

export function useAuth() {
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    // `data` should be {name, email, password, password_confirmation}
    async function register(data) {
        setErrors({})

        return axios.post('auth/register', data)
            .then(() => {
                navigate(route('vehicles.index'))
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors)
                }
            })
    }

    return { register, errors }
}

// const response = await axios.post('auth/register', data);

// if (response.status >= 200 && response.status < 300) {
//     navigate(route('vehicles.index'))
// }