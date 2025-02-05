function name(input, updateErrors) {
    if (!input.value.length) {
        updateErrors(input.name, 'Name is required.');
        return false;
    }
    if (input.value.length > 255) {
        updateErrors(input.name, 'Name must not contain more than 255 characters.')
        return false;
    }

    updateErrors(input.name, null);
    return true;
}

function email(input, updateErrors) {
    if (!input.value.length) {
        updateErrors(input.name, 'Email is required.');
        return false;
    }
    if (input.value.length > 255) {
        updateErrors(input.name, 'Email must not contain more than 255 characters.');
        return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        updateErrors(input.name, 'Email is invalid.');
        return false;
    }

    updateErrors(input.name, null);
    return true;
}

function password(input, updateErrors) {
    const passwordConfirmationInput = document.querySelector('#password_confirmation');

    if (!input.value.length) {
        updateErrors(input.name, 'Password is required.');
        updateErrors(passwordConfirmationInput.name, null);
        return false;
    }
    if (input.value.length < 8) {
        updateErrors(input.name, 'Password must be greater than 8 characters.');
        updateErrors(passwordConfirmationInput.name, null);
        return false;
    }
    if (input.value.length > 255) {
        updateErrors(input.name, 'Password must not contain more than 255 characters.');
        updateErrors(passwordConfirmationInput.name, null);
        return false;
    }

    updateErrors(input.name, null);
    // password_confirmation must be checked here on password validation when isn't empty: 
    // - password matching is checked there; 
    // - the "if isn't empty" condition is checked to avoid "is required" error unnecessarily (e.g: after digiting 9th character in password),
    if (passwordConfirmationInput.value.length) passwordConfirmation(passwordConfirmationInput, updateErrors);
    return true;
}

function passwordConfirmation(input, updateErrors) {
    // this checking must be ignored in onSubmit validation (allInputs) when this input is disabled
    if (input.disabled) return true;

    const passwordInput = document.querySelector('#password');
    updateErrors(passwordInput.name, null);

    if (!input.value.length) {
        updateErrors(input.name, 'Password confirmation is required.');
        return false;
    }
    if (input.value && input.value !== passwordInput.value) {
        updateErrors(input.name, "Passwords don't match.");
        updateErrors(passwordInput.name, "Passwords don't match.");
        return false;
    }

    updateErrors(input.name, null);
    updateErrors(passwordInput.name, null);
    return true;
}

export default {
    name,
    email,
    password,
    passwordConfirmation,
    allInputs(inputs, updateErrors) {
        const validationResults = []; 

        inputs.forEach(input => {
            validationResults.push(
                this[
                    input.name
                        .toLowerCase()
                        .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
                ](input, updateErrors)
            );
        });

        // i was checking initially for the presence of 'border-error' class in some input to consider the validation as successful or not, but that was wrong: 
        // a state variable does not get automatically updated after the `set` function finishes its execution. In React, state updates are asynchronous and batched. 
        // Thus, never an element with border-error would exist at the time of a condition checking here.
        if (validationResults.includes(false)) return false;

        return true;
    }
};