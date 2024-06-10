import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../Components/OAuth';
import { z } from 'zod'

const signUpSchema = z.object({
  username: z.string().min(8).max(30),
  email: z.string().email(),
  password: z.string().min(8),
});

const Signup = () => {
  const navigate = useNavigate()
  const [login, setLogin] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setLogin(prev => ({...prev, [e.target.id] : e.target.value}))
    setErrors((prev) => ({ ...prev, [e.target.id]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      signUpSchema.parse(login);
      const res = await fetch('/api/auth/signup', {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(login),
      });

      const result = await res.json();

      if (res.status === 200) {
        console.log(result);
        navigate('/sign-in');
      } else {
        setError(result.message || 'Error occurred');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle Zod validation errors
        const validationErrors = {};
        error.errors.forEach((err) => {
          const fieldName = err.path[0];
          validationErrors[fieldName] = err.message;   //fieldName sebagai kunci untuk objek validationErrors, sehingga pesan kesalahan disimpan (err.message) dalam objek dengan kunci yang sesuai
        });
        setErrors(validationErrors);
      } else {
        setError('Error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-3 max-w-sm mx-auto mt-20 mb-20'>
      <h1 className='text-3xl text-center font-semibold mb-7 text-black-700'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange}></input>        
        {errors.username && <p className='text-red-500'>{errors.username}</p>}

        <input type='text' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}></input>        
        {errors.email && <p className='text-red-500'>{errors.email}</p>}

        <input type='text' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}></input>         
        {errors.password && <p className='text-red-500'>{errors.password}</p>}

        <button disabled={loading} className='border border-2 border-blue-500 p-3 font-semibold rounded-full uppercase hover: opacity-95 disabled:opacity-80 hover:text-green-700'>{loading ? 'Loading...' : 'Sign up'}</button>

        <OAuth/>
        
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Already have an account?</p>
        <Link to='/sign-in'><span className='font-bold'>Sign in</span></Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

//and i want to display EACH property message in EACH element input.
export default Signup
