import { useNavigate } from 'react-router-dom'
import { route } from '@/routes'
import { useState, useMemo, useEffect } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage';

export function useAuth() {
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [accessToken, setAccessToken, removeAccessToken] = useLocalStorage('access_token', '')

    const navigate = useNavigate()

    // Since "isLoggedIn" stores a primitive and obtaining it involves a quite low-expensive operation, and that useMemo has the overhead of checking for dependency changes, there's no need - and is potentially a little worst - to use "useMemo" here. But since i've never use it, i let it.
    const isLoggedIn = useMemo(() => !!accessToken, [accessToken])

    useEffect(() => {
        if (accessToken) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        }
        // previously i had placed an `else` clause to delete the authorization header for axios when `accessToken` wasn't present, but this isn't necessary since there's an axios' interceptor that already ends up removing it after 401 responses
    }, [accessToken])

    // `data` should be {name, email, password, password_confirmation}
    async function register(data) {
        setErrors({})
        setLoading(true)

        return axios.post('auth/register', data)
            .then((response) => {
              setAccessToken(response.data.access_token)
              navigate(route('vehicles.index'))
            })
            .catch(error => {
              if (error.response.status === 422) {
                setErrors(error.response.data.errors)
              }
            })
            .finally(() => setLoading(false))
    }

    async function logout(force = false) {
        if (!force) {
          await axios.post('auth/logout')
        }

        removeAccessToken()
        navigate(route('login'))
    }

    return { register, errors, loading, isLoggedIn, logout }
}

// const response = await axios.post('auth/register', data);

// if (response.status >= 200 && response.status < 300) {
//     navigate(route('vehicles.index'))
// }