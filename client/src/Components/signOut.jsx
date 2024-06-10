import { signOutStart, signOutSuccess, signOutFailure } from '../redux/user/userSlice.js'


export const handleLogout = async (dispatch) => {
    try {
        dispatch(signOutStart())
        const res = await fetch('/api/auth/signout')
        const result = await res.json()
        if(!res.ok) {
        dispatch(signOutFailure(result.message))
        return;
    }
        dispatch(signOutSuccess(result))        
    } catch(error) {
        dispatch(signOutFailure(error.message))
    }
}
