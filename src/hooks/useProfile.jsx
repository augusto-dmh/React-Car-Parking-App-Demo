import axios from 'axios';
import { useState } from 'react';

function useProfile() {
    const [errors, setErrors] = useState({});
    const [loading,  setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    function getProfile() {
        return axios.get('/profile')
            .then(response => response.data)
            .catch(error => console.error(error));
    }

    function editProfile(data) {
        setErrors({});
        setLoading(true);
        setSuccessMessage('');

        axios.put('/profile', data)
            .then(response => {
                setSuccessMessage('Profile has been updated');
            })
            .catch(error => {
                if (error.response?.status === 422) {
                    setErrors(error.response.data.errors);
                }
            })
            .finally(() => setLoading(false));
    }

    return { errors, loading, successMessage, getProfile, editProfile };
}

export default useProfile;