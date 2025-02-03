import { useState } from 'react'
import validate from './validationFunctions'
 
function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  // Each key is the name attribute of an input and each value is an array of error messages
  const [errors, setErrors] = useState({})

  function updateErrors(inputName, errorMessage) {
    setErrors(prevState => {
      // The error message cannot be duplicated
      if (prevState[inputName]?.includes(errorMessage)) return {...prevState};
      
      return {
        ...prevState,
        [inputName]: errorMessage,
      }
    });
  }
 
  function handleSubmit(event) {
    event.preventDefault()
    const data = { name, email, password, passwordConfirmation }
    console.log(errors)
    // console.log(data)
  }
 
  return (
    <form onSubmit={ handleSubmit } noValidate>
      <div className="flex flex-col w-full mx-auto md:w-96">
 
        <h1 className="heading">Register</h1>
 
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="name" className="required">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={ name }
            onChange={ event => {
              const element = event.target;
              
              setName(element.value);

              if (!element.value.length) {
                updateErrors(element.name, 'Name is required.');
                return;
              }
              if (element.value.length > 255) {
                updateErrors(element.name, 'Name must not contain more than 255 characters.')
                return;
              }

              updateErrors(element.name, null);
            }}
            onBlur={(event) => {
              const element = event.target;

              if (!element.value.length) {
                updateErrors(element.name, 'Name is required.');
                return;
              }
              if (element.value.length > 255) {
                updateErrors(element.name, 'Name must not contain more than 255 characters.')
                return;
              }

              updateErrors(element.name, null);
            }}
            className={`form-input ${errors.name && 'border-error'}`}
            autoComplete="name"
          />
          {errors.name &&
            <div role="alert">
              <span className="block text-sm text-red-500">{errors.name}</span>
            </div>
          }
        </div>
 
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="email" className="required">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={ email }
            onChange={ event => {
              const element = event.target;
              
              setEmail(element.value);

              if (!element.value.length) {
                updateErrors(element.name, 'Email is required.');
                return;
              }
              if (element.value.length > 255) {
                updateErrors(element.name, 'Email must not contain more than 255 characters.');
                return;
              }
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(element.value)) {
                updateErrors(element.name, 'Email is invalid.');
                return;
              }

              updateErrors(element.name, null);
            }}
            onBlur={(event) => {
              const element = event.target;

              if (!element.value.length) {
                updateErrors(element.name, 'Email is required.');
                return;
              }
              if (element.value.length > 255) {
                updateErrors(element.name, 'Email must not contain more than 255 characters.');
                return;
              }
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(element.value)) {
                updateErrors(element.name, 'Email is invalid.');
                return;
              }

              updateErrors(element.name, null);
            }}
            className={`form-input ${errors.email && 'border-error'}`}
            autoComplete="email"
          />
          {errors.email &&
            <div role="alert">
              <span className="block text-sm text-red-500">{errors.email}</span>
            </div>
          }
        </div>
 
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="password" className="required">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={ password }
            onChange={(event) => () => validate.passwordOnChange(event)}
            onBlur={(event) => () => validate.passwordOnBlur(event)}
            className={`form-input ${errors.password && 'border-error'}`}
            autoComplete="new-password"
          />
          {errors.password &&
            <div role="alert">
              <span className="block text-sm text-red-500">{errors.password}</span>
            </div>
          }
        </div>
 
        <div className="flex flex-col gap-2">
          <label htmlFor="password_confirmation" className={`required ${(!password.length || (errors.password && errors.password !== "Passwords don't match.")) && 'disabled'}`}>Confirm Password</label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            value={ passwordConfirmation }
            disabled={!password.length || (errors.password && errors.password !== "Passwords don't match.")}
            onChange={ event => {
              const element = event.target;
              const passwordInput = document.querySelector('#password');
              updateErrors(passwordInput.name, null);

              setPasswordConfirmation(element.value);

              if (!element.value.length) {
                updateErrors(element.name, 'Password confirmation is required.');
                return;
              }
              if (element.value && element.value !== passwordInput.value) {
                updateErrors(element.name, "Passwords don't match.");
                updateErrors(passwordInput.name, "Passwords don't match.");
                return;
              }

              updateErrors(element.name, null);
              updateErrors(passwordInput.name, null);
            }}
            onBlur={(event) => {
              const element = event.target;
              const passwordInput = document.querySelector('#password');
              updateErrors(passwordInput.name, null);

              if (!element.value.length) {
                updateErrors(element.name, 'Password confirmation is required.');
                return;
              }
              if (element.value && element.value !== passwordInput.value) {
                updateErrors(element.name, "Passwords don't match.");
                updateErrors(passwordInput.name, "Passwords don't match.");
                return;
              }

              updateErrors(element.name, null);
              updateErrors(passwordInput.name, null);
            }}
            className={`form-input ${errors.password_confirmation && 'border-error'}`}
            autoComplete="new-password"
          />
          {errors.password_confirmation &&
            <div role="alert">
              <span className="block text-sm text-red-500">{errors.password_confirmation}</span>
            </div>
          }
        </div>
 
        <div className="border-t h-[1px] my-6"></div>
 
        <div className="flex flex-col gap-2 mb-4">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </div>
    </form>
  )
}
 
export default Register