function name(input, updateErrors) {
    if (!input.value.length) {
        updateErrors(input.name, 'Name is required.');
        return;
    }
    if (input.value.length > 255) {
        updateErrors(input.name, 'Name must not contain more than 255 characters.')
        return;
    }

    updateErrors(input.name, null);
}

function email(input, updateErrors) {
    if (!input.value.length) {
        updateErrors(input.name, 'Email is required.');
        return;
    }
    if (input.value.length > 255) {
        updateErrors(input.name, 'Email must not contain more than 255 characters.');
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        updateErrors(input.name, 'Email is invalid.');
        return;
    }

    updateErrors(input.name, null);
}

function password(input, updateErrors) {
    const passwordConfirmationInput = document.querySelector('#password_confirmation');

    if (!input.value.length) {
        updateErrors(input.name, 'Password is required.');
        updateErrors(passwordConfirmationInput.name, null);
        return;
    }
    if (input.value.length < 8) {
        updateErrors(input.name, 'Password must be greater than 8 characters.');
        updateErrors(passwordConfirmationInput.name, null);
        return;
    }
    if (input.value.length > 255) {
        updateErrors(input.name, 'Password must not contain more than 255 characters.');
        updateErrors(passwordConfirmationInput.name, null);
        return;
    }

    updateErrors(input.name, null);
    // password_confirmation must be checked here on password validation when isn't empty: 
    // - password matching is checked there; 
    // - the "if isn't empty" condition is checked to avoid "is required" error unnecessarily (e.g: after digiting 9th character in password),
    if (passwordConfirmationInput.value.length) passwordConfirmation(passwordConfirmationInput, updateErrors);
}

function passwordConfirmation(input, updateErrors) {
    // this checking must be ignored in onSubmit validation when this input is disabled
    if (input.disabled) return;

    const passwordInput = document.querySelector('#password');
    updateErrors(passwordInput.name, null);

    if (!input.value.length) {
        updateErrors(input.name, 'Password confirmation is required.');
        return;
    }
    if (input.value && input.value !== passwordInput.value) {
        updateErrors(input.name, "Passwords don't match.");
        updateErrors(passwordInput.name, "Passwords don't match.");
        return;
    }

    updateErrors(input.name, null);
    updateErrors(passwordInput.name, null);
}

export default {
    name,
    email,
    password,
    passwordConfirmation,
    onSubmit(inputs, updateErrors) {
        inputs.forEach(input => {
            this[
                input.name
                    .toLowerCase()
                    .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
            ](input, updateErrors);
        });
    }
};