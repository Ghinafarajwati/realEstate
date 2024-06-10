import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCircleExclamation, } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { Sidebar } from '../Components/sidebar.jsx'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase.js'

import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserFailure, deleteUserSuccess} from '../redux/user/userSlice.js'
import { handleLogout } from '../Components/signOut.jsx'
import Modal from '../Components/modal.jsx'

//Private Route, jika tidak authenticated tidak bisa masuk

const Profile = () => {
  const fileRef = useRef()
  const dispatch = useDispatch()
  const { user, loading } = useSelector((state) => state.user)
  const [updateError, setUpdateError] = useState(null)

  const [file, setFile] = useState(undefined)    //file inputan
  const [formData, setFormData] = useState({})   //file inputan + img
  const [open, setOpen] = useState(false)        //modal update
  const [popdelOpen, setPopDelOpen] = useState(false)


  //Buat persennya ketika upload
  const [filepersent, setFilePersent] = useState(0)
  const [fileImgErr, setFileImgErr] = useState(false)
  
  useEffect(() => {
    if(file) {
      handleFileUpload(file)
    }
  }, [file])

  //Unggah file ke firebase
  const handleFileUpload =  async (file) => {
    try {
      const storage = getStorage(app)                    //koneksi ke penyimpanannya
      const fileName = new Date().getTime() + file.name  //Buat nama unik untuk file yang akan diunggah dengan menggabungkan timestamp dan nama file kita.
      const storageRef = ref(storage, fileName)           //simpan spesifik datanya ke storage sesuai dengan fileuniknya
      const uploadTask = uploadBytesResumable(storageRef, file)     //save filenya. file(file yg ingin diunggah)

      //buat presentase uploadingnya
      uploadTask.on('state_changed', (snapshot) => {             //ketika statusnya berubah, buat listener. parameter snapshot ini ibaratnya berisi lembar kertas kosong yg akan diisi oleh bytes dan total.
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePersent(Math.round(progress))                    //hasilnya dibuat tidak desimal
      });
      await uploadTask;

      // Dapatkan URL unduhan dari file yang diunggah
      const downloadURL = await getDownloadURL(storageRef)                
      setFormData({...formData, avatar: downloadURL})                //Perbarui data formulir dengan URL unduhan file
    } catch (error) {
      setFileImgErr(true)
    }
  }

  //AMBIL VALUE
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value})
  } 

  //POST
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(Object.keys(formData).length === 0) {
      setUpdateError('No changes made')
      setTimeout(() => {
        setUpdateError(null)
      }, 2000)
      return;
    }
    try {
      dispatch(updateUserStart())
      const res = await fetch (`/api/user/update/${user._id}`, {
        method: 'post', 
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const result = await res.json()
      if(!res.ok) {
        dispatch(updateUserFailure(result.message))
        setUpdateError(result.message)
      } else {
        dispatch(updateUserSuccess(result))
        setOpen(true)
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message))
      setUpdateError(error.message)
    }
  }

  //DELETE 
  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart())

      const res = await fetch(`/api/user/delete/${user._id}`, {
        method: 'delete'
      })
      const result = await res.json()
      if(!res.ok) {
        dispatch(deleteUserFailure(result.message))
      } else {
        dispatch(deleteUserSuccess(result))
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const logoutProfile = async () => {
    handleLogout(dispatch)
  }


  return (
    <div className='relative'>
    <Sidebar/>
    <div className='relative p-3 mx-20 md:max-w-sm md:mx-auto'>
      <h1 className='text-3xl font-semibold text-center mt-12'>PROFILE</h1>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        {/* Input file image */}

        {/* Ganti imagenya */}
        <img src={formData.avatar || user.avatar} alt='profile' onClick={() => fileRef.current.click()} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 mb-5'></img>
        <p className='text-center mb-2'>
        {fileImgErr ? (
          <span className='text-red-700'>Error image upload (image must be less than 2mb )</span>
        ) : 
          filepersent > 0 && filepersent < 100 ? (
          <span className='text-slate-700'>{`uploading ${filepersent} %`}</span>
        ) : filepersent === 100 ? (
          <span className='text-green-700'>Image successfully uploaded!</span>
        ) : (
          ''
        )} 
        </p>
        <input type='file' ref={fileRef} hidden accept='image/*' onChange={(e) => setFile(e.target.files[0])}></input>
        
        <input type='text' placeholder='username'id='username' className='border p-3 rounded-lg' defaultValue={user.username} onChange={handleChange}></input>
        <input type='text' placeholder='email' id='email' className='border p-3 rounded-lg' defaultValue={user.email} onChange={handleChange}></input>
        <input type='password' placeholder='password' id='password' className='border p-3 rounded-lg' defaultValue={user.password} onChange={handleChange}></input>
        <button disabled={loading} className='bg-green-500 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'loading...' : 'update'}</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={() => setOpen(true)} className='text-red-700 cursor-pointer font-semibold'>Delete Acc</span>
        <span onClick={logoutProfile} className='font-semibold cursor-pointer'>Sign Out <FontAwesomeIcon icon={faArrowRight}/></span>
      </div>
      <div className='mb-10'>
      {
        open && (
          <Modal open={open} onClose={() => setOpen(false)}>
            <FontAwesomeIcon icon={faCircleCheck} className='text-green-500 w-10 h-10 hover:text-gray-600' />
              <div className='mx-auto my-4 w-48'>
                <h3 className='text-lg font-black text-gray-700'>Update successfully!</h3>
              </div>
          </Modal>
        )
      }
      {
        <Modal open={popdelOpen} onClose={() => setPopDelOpen(false)}>
            <FontAwesomeIcon icon={faCircleExclamation} className=' w-10 h-10 text-red-700'/>
            <div className='mx-auto my-4 w-53'>
              <h3 className='text-lg font-semibold text-gray-700 mb-6'>Sure you want to delete your account?</h3>
              <div className='flex justify-center gap-10'>
                <button className='bg-red-700 px-3 py-3 rounded-lg text-white font-semibold' onClick={handleDelete}>Yes, I'm sure</button>
                <button className='bg-slate-200 px-3 py-3 rounded-lg font-semibold' onClick={() => setPopDelOpen(false)}>No, I'm not</button>
              </div>
            </div>
        </Modal>
      }
      </div>
      <p className='text-red-700 mt-2'> {updateError ? updateError : ''} </p>
    </div>
    </div>
  )
}

export default Profile
