import { useState } from 'react';
import axios from 'axios';

export function usePassword() {
    const [passwordFields, setPasswordFields] = useState({}); /// current_password, password, password_confirmation
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    async function updatePassword() {
        setLoading(true);
        setErrors({});

        axios.put('password', passwordFields)
            .then(response => setSuccessMessage(response.data.message))
            .catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors);
                }
            })
            .finally(() => setLoading(false));
    }

    return { 
        passwordFields, 
        setPasswordFields, 
        loading, 
        errors, 
        successMessage, 
        updatePassword 
    };
}
