import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//REACT REDUX => import these two
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js'
import OAuth from '../Components/OAuth.jsx'

const Signin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loading, error} = useSelector((state) => state.user)            // useSelector untuk mengambil data dari store Redux. Baris kode tsb berfungsi mengekstrak value dari properti loading dan error. (state) berisi seluruh state redux, tanda => maksudnya memberikan instruksi kepada useSelector untuk mengacu bagian spesifik, dalam kontex ini yaitu state.user
  const [formData, setFormData] = useState ({})

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(signInStart())
      const res = await fetch ('/api/auth/signin', {
        method: 'post',
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const result = await res.json()
      if (result.success === false) {
        dispatch(signInFailure(result.message))
        return;
      }

      dispatch(signInSuccess(result))
      navigate('/')

    } catch(error) {
      dispatch(signInFailure(error.message))
    }
  }
  return (
      <div className='p-3 max-w-sm mx-auto mt-20 mb-20'>
      <h1 className='text-3xl text-center font-semibold mb-7 text-black-700'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='text' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}></input>
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}></input>
        <button disabled={loading} className='border border-2 border-blue-500 p-3 font-semibold rounded-full uppercase hover: opacity-95 disabled:opacity-80 hover:text-green-700'>{loading ? 'Loading...' : 'Sign In'}</button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to='/sign-up'><span className='font-bold'>Sign up</span></Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default Signin
