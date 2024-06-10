import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faLocationDot} from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Sidebar } from '../Components/sidebar'

const UserListings = () => {
  const navigate = useNavigate()
  const [showListingErr, setShowListingErr] = useState(false)
  const [deleteErr, setDeleteErr] = useState(false)
  const [userListings, setUserListings] = useState([])
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchUserListings = async () => {
        try {
            setShowListingErr(false);
            const res = await fetch(`/api/user/listings/${user._id}`);
            const result = await res.json();
            if(!res.ok) {
                setShowListingErr(false);
                return;
            }
            setUserListings(result.data); // Anggap API mengembalikan data dalam properti 'data'
        } catch (error) {
            setShowListingErr(true);
        }
    };

    fetchUserListings();
}, [user._id]);


  const handleDelete = async (listingId) => {     //parameter id yg ingin di delete
    try {
      const res = await fetch (`api/listing/delete/${listingId}`, {
        method: 'delete'
      })
      const result = await res.json()
      if(result.success === false) {
        console.log(result.message);
        return
      }
      //FILTER
      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId))   //id tidak sama dengan params id
    } catch (error) {
      setDeleteErr(error.message)
    }
  }

  const getColor = (type) => {
    return type === 'rent' ? 'bg-blue-300' : 'bg-purple-300'
  }

  return (
    <div className='relative'>
    <Sidebar/>
    <div className='max-w-5xl mx-auto'>
      <div className='flex justify-center items-center ml-[8 rem]'>
      <h1 className='text-3xl font-semibold text-center my-7 mt-20'>USER CART</h1>
      </div>
      <div className='flex flex-wrap md:items-center ml-24 md:ml-44 gap-2 pb-20'>
        {userListings && userListings.length > 0 && 
        userListings.map(listing => (
          <div key={listing._id} className='border rounded-lg md:pt-2 md:px-3 shadow-lg'>
            <div className='flex md:flex-row md:h-44 md:w-[23rem] w-[12rem]'>
            <Link to={`/propertyId/${listing._id}`}>
              <div className=''>
              <img src={listing.imageUrls[0]} alt='listing cover' className='hidden md:block border w-40 h-40 object-cover rounded-lg transition-transform transform hover:scale-105'></img>   {/* [0] mengambil gambar pertama dari array tersebut. */}
              </div>
            </Link>
            <div className='mx-4'>
              <Link to={`/propertyId/${listing._id}`}>
              <div className='w-36'>
              <p className='text-slate-700 text-md font-semibold uppercase mx-1 mt-3 truncate'>{listing.name}</p>
              </div>
              </Link>
              <p className='text-slate-500 text-sm mx-1 mt-2 capitalize'><FontAwesomeIcon icon={faLocationDot} className='mr-2'/>{listing.address}</p>
              <div className='mt-3'>
              <span className={`py-1 px-5 text-sm font-semibold rounded-2xl capitalize ${getColor(listing.type)}`}>{listing.type}</span>
              </div>
              <div className='flex md:justify-end mt-5'>
                <Link to={`/update-listing/${listing._id}`}>
                <button onClick={() => handleUpdate(listing._id)} className='px-2 py-1 border border-blue-700 text-blue-700 rounded-md text-sm shadow-md me-2'><FontAwesomeIcon icon={faPen}/></button>
                </Link>
                <button onClick={() => handleDelete(listing._id)} className='px-2 py-1 bg-red-500 text-white rounded-md text-sm shadow-md'><FontAwesomeIcon icon={faTrash}/></button>
              </div>
            </div>
            </div>
          </div>
        ))
      }
        </div>
    </div>
    </div>
  )
}

export default UserListings
