import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase.js'
import { signInSuccess } from '../redux/user/userSlice.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

export default function OAuth() {
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)
            // console.log(result) data login akan tampil di console

            const res = await fetch('/api/auth/google', {
                method: 'post',
                headers: {
                    'content-type' : 'application/json'
                }, 
                body: JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL})  //send information dari google setelah login, yg tampil di console.log
            })

            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/')
        } catch (error) {
            console.log('Could not sign in with google', error)
        }
    }
  return (
      <button type='button' onClick={handleGoogleClick} className='bg-red-600 text-white p-3 rounded-full uppercase hover:opacity-95'>
        <span className='mr-2'><FontAwesomeIcon icon={faGoogle}/>
        </span>Continue with google
    </button>
  )
}
