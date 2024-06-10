import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

// Outlet fungsinya untuk menampilkan komponen yang sesuai dengan sub-rute.

const PrivateRoute = () => {
    const { user } = useSelector((state) => state.user) 
  return user ? <Outlet/> : <Navigate to='/sign-in'/>      //tampilkan profile atau sign-in
}

export default PrivateRoute
