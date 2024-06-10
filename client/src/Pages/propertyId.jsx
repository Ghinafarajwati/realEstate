import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBath, faBed, faCarOn, faCouch, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import Contact from '../Components/Contact.jsx'
import Carousel from '../Components/carousel.jsx'

const PropertyId = () => {
  const { id } = useParams()
  const [listingId, setListingId] = useState({})   //user pemilik listing
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const { user } = useSelector((state) => state.user)
  
  const [contact, setContact] = useState(false)

  useEffect (() => {
    const fetchListingId = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/listing/get/${id}`)
        const result = await res.json()
        if(!res.ok) {
          setError(true)
          setLoading(false)
        }

        setListingId(result)
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchListingId()
  }, [id])

  return (
    <div className='max-w-6xl mx-auto my-16'>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}
      {listingId && !loading && !error && (
      <>
      <div className='mb-10'>
        <h1 className='ml-10 font-semibold text-4xl tracking-wide'>Properties</h1>
      </div>

      <div className='flex flex-col sm:flex-row grid grid-cols-3 '>
        <div className='flex flex-col col-span-2'>
          <div className='relative px-10'>
            <img src={listingId.imageUrls} className='object-cover rounded-lg border w-full'></img>
            <div className='absolute right-14 top-0 hover:scale-105'>
            {
              listingId.offer === true && (
                <span className='bg-blue-600 font-semibold text-white bg-blue-500 border-b border-white px-2 py-10 rounded-full tracking-wide'>
                  <span className='text-md'>Disc </span><span className='text-2xl'>{listingId.discountPrice} %</span>
                </span>
              )
            }
            </div>
          </div>
          <div className='flex justify-start mt-8 mb-5 ml-10'>
            <h4 className='capitalize text-2xl font-bold tracking-normal'>{listingId.name}</h4>
          </div>
          <div className='mx-10'>
            <h4 className='capitalize text-sm text-gray-500 text-justify w-full'>{listingId.description}</h4>
          </div>
          <div className='flex w-full my-5 px-10 lg:justify-end md:justify-center'>
            <p className='capitalize text-md font-semibold text-blue-700'><FontAwesomeIcon icon={faLocationDot} className='px-2'/>{listingId.address}</p>
          </div>
          {/* section */}
          <div className='flex flex-col col-span-2 w-full px-5'>
            <div className='relative bg-gradient-to-r from-slate-600 to-slate-800 w-full pb-10 rounded-md shadow-lg'>
            
            <div className='mb-10'>
            {listingId.regularPrice !== undefined && (
              <span className='bg-slate-600 font-semibold text-white px-5 py-7 bg-purple-800 rounded-md'>
                $ {listingId.regularPrice.toLocaleString(undefined, { minimumFractionDigits: 3 })}
              </span>
              )}
              <span className='bg-orange-500 font-semibold text-white px-5 py-3 rounded-sm'>{listingId.type ? `${listingId.type}`: 'x'}</span>
            </div>

            <div className='flex flex-wrap gap-6 w-full capitalize justify-center px-10'>
              <div className='text-white flex flex-col w-36 p-3 shadow-xl hover:scale-110'>
              <FontAwesomeIcon icon={faBed} className='text-2xl mb-3'/>
              <h1 className='text-center'>Bedroom: <br/> <span className='font-semibold'>{listingId.bedrooms ? `${listingId.bathrooms}` : 'x'}</span></h1>
              </div>

              <div className='text-white flex flex-col w-36 p-3 shadow-xl hover:scale-110'>
              <FontAwesomeIcon icon={faBath} className='text-2xl mb-3'/>
              <h1 className='text-center'>Bathroom: <br/> <span className='font-semibold'>{listingId.bathrooms ? `${listingId.bathrooms}` : 'x'}</span></h1>
              </div>

              <div className='text-white flex flex-col w-36 p-3 shadow-xl hover:scale-110'>
              <FontAwesomeIcon icon={faCouch} className='text-2xl mb-3'/>
              <h1 className='text-center'>Furnished: <br/> <span className='font-semibold'>{listingId.furnished ? `available` : 'x'}</span></h1>
              </div>
              <div className='text-white flex flex-col w-36 p-3 shadow-xl hover:scale-110'>
              <FontAwesomeIcon icon={faCarOn} className='text-2xl mb-3'/>
              <h1 className='text-center'>Parking: <br/> <span className='font-semibold'>{listingId.parking ? `available` : 'x'}</span></h1>
              </div>
              <div className='text-white flex flex-col w-36 p-3 shadow-xl hover:scale-110'>
              <FontAwesomeIcon icon={faBath} className='text-2xl mb-3'/>
              <h1 className='text-center'>Road: <br/> <span className='font-semibold'>{listingId.road ? `${listingId.road}` : 'x'}</span></h1>
              </div>
            </div>
            </div>
          </div>
      </div>

        {/* CEK DULU */}
        <div className='flex flex-col flex-auto'>
        {listingId && listingId.imageUrls && (
          <Carousel imageUrls={listingId.imageUrls} />
        )}
            {/* Orang lain yg bisa mengakses ini */}
            {user && listingId.userRef !== user._id && !contact && (        //ketika user sudah login, pemilik listing tidak sama dengan user database, dan buttonnya false, maka tampilkan button.
              <button onClick={() => setContact(true)} className='py-3 px-5 rounded-full shadow-xl mt-5 border-b border-blue-600 bg-gray-100 font-semibold'>Contact</button>  //Ketika button di klik, yg semulanya false menjadi true dan menampilkan contact 
            )}                                                      
            <div>
              {contact && <Contact listingId={listingId}/>} 
              {/* ketika user pemilik listing tidak sama dengan user database dan contactnya false maka tampilkan button */}
            </div>
        </div>
      </div>
      </>
      )}
      {error && <p className='text-center my-7 text-2xl'>Terjadi kesalahan!</p>}
    </div>
  )
}

export default PropertyId

{/* 
user login : 65aaade4055e718935ebcc43
sementara listing isinya semua user yg login, jadi terdapat banyak userID
jadi ketika login dengan pemilik listingnya sama, jangan tampilkan button.

useRef = user listing
userId = user login 
*/}
