import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import ValidationError from '@/components/ValidationError'
 
function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const { register, errors } = useAuth()
 
  async function handleSubmit(event) {
    event.preventDefault()
 
    await register({ name, email, password, password_confirmation: passwordConfirmation })
 
    setPassword('')
    setPasswordConfirmation('')
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
            onChange={ event => setName(event.target.value) }
            className="form-input"
            autoComplete="name"
          />
          <ValidationError errors={ errors } field="name" />
        </div>
 
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="email" className="required">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={ email }
            onChange={ event => setEmail(event.target.value) }
            className="form-input"
            autoComplete="email"
          />
          <ValidationError errors={ errors } field="email" />
        </div>
 
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="password" className="required">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={ password }
            onChange={ event => setPassword(event.target.value) }
            className="form-input"
            autoComplete="new-password"
          />
          <ValidationError errors={ errors } field="password" />
        </div>
 
        <div className="flex flex-col gap-2">
          <label htmlFor="password_confirmation" className="required">Confirm Password</label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            value={ passwordConfirmation }
            onChange={ event => setPasswordConfirmation(event.target.value) }
            className="form-input"
            autoComplete="new-password"
          />
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

// import validate from './validationFunctions';
// import { useState } from 'react';
// import { useAuth } from '@/hooks/useAuth'

// function Register() {
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [passwordConfirmation, setPasswordConfirmation] = useState('')
//   // Each key is the name attribute of an input and each value is an array of error messages
//   const [errors, setErrors] = useState({})
//   const { register } = useAuth()

//   function updateErrors(inputName, errorMessage) {
//     // The error message cannot be duplicated
//     setErrors(prevState => {
//       if (prevState[inputName]?.includes(errorMessage)) return prevState;
      
//       return {
//         ...prevState,
//         [inputName]: errorMessage,
//       }
//     });
//   }

//   async function handleSubmit(event) {
//     event.preventDefault();
//     const inputs = document.querySelectorAll('input');
    
//     const success = validate.allInputs(inputs, updateErrors);

//     if (!success) return;

//     await register({ name, email, password, password_confirmation: passwordConfirmation });
//   }

//   return (
//     <form onSubmit={handleSubmit} noValidate>
//       <div className="flex flex-col w-full mx-auto md:w-96">
//         <h1 className="heading">Register</h1>

//         <div className="flex flex-col gap-2 mb-4">
//           <label htmlFor="name" className="required">Name</label>
//           <input
//             id="name"
//             name="name"
//             type="text"
//             value={name}
//             onChange={event => {
//               setName(event.target.value);
//               validate.name(event.target, updateErrors);
//             }}
//             onBlur={event => validate.name(event.target, updateErrors)}
//             className={`form-input ${errors.name && 'border-error'}`}
//             autoComplete="name"
//           />
//           {errors.name &&
//             <div role="alert">
//               <span className="block text-sm text-red-500">{errors.name}</span>
//             </div>
//           }
//         </div>

//         <div className="flex flex-col gap-2 mb-4">
//           <label htmlFor="email" className="required">Email</label>
//           <input
//             id="email"
//             name="email"
//             type="email"
//             value={email}
//             onChange={event => {
//               setEmail(event.target.value);
//               validate.email(event.target, updateErrors);
//             }}
//             onBlur={event => validate.email(event.target, updateErrors)}
//             className={`form-input ${errors.email && 'border-error'}`}
//             autoComplete="email"
//           />
//           {errors.email &&
//             <div role="alert">
//               <span className="block text-sm text-red-500">{errors.email}</span>
//             </div>
//           }
//         </div>

//         <div className="flex flex-col gap-2 mb-4">
//           <label htmlFor="password" className="required">Password</label>
//           <input
//             id="password"
//             name="password"
//             type="password"
//             value={password}
//             onChange={event => {
//               setPassword(event.target.value);
//               validate.password(event.target, updateErrors);
//             }}
//             onBlur={event => validate.password(event.target, updateErrors)}
//             className={`form-input ${errors.password && 'border-error'}`}
//             autoComplete="new-password"
//           />
//           {errors.password &&
//             <div role="alert">
//               <span className="block text-sm text-red-500">{errors.password}</span>
//             </div>
//           }
//         </div>

//         <div className="flex flex-col gap-2">
//           <label htmlFor="password_confirmation" 
//             className={`required ${(!password.length || (errors.password && errors.password !== "Passwords don't match.")) && 'disabled'}`}>
//             Confirm Password
//           </label>
//           <input
//             id="password_confirmation"
//             name="password_confirmation"
//             type="password"
//             value={passwordConfirmation}
//             disabled={!password.length || (errors.password && errors.password !== "Passwords don't match.")}
//             onChange={event => {
//               setPasswordConfirmation(event.target.value);
//               validate.passwordConfirmation(event.target, updateErrors);
//             }}
//             onBlur={event => validate.passwordConfirmation(event.target, updateErrors)}
//             className={`form-input ${errors.password_confirmation && 'border-error'}`}
//             autoComplete="new-password"
//           />
//           {errors.password_confirmation &&
//             <div role="alert">
//               <span className="block text-sm text-red-500">{errors.password_confirmation}</span>
//             </div>
//           }
//         </div>

//         <div className="border-t h-[1px] my-6"></div>

//         <div className="flex flex-col gap-2 mb-4">
//           <button type="submit" className="btn btn-primary">
//             Register
//           </button>
//         </div>
//       </div>
//     </form>
//   )
// }

// export default Register