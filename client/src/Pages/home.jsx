import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import city from '../assets/city.png'
import people from '../assets/people.png'
import house from '../assets/house.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import SearchData from './searchData'
import GalleryImages from '../Components/galleryImages/gallery.jsx'
import buildings from '../assets/buildings.jpg'

const Home = () => {
  const [offerListings, setOfferListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  const [saleListings, setSaleListings] = useState([])

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`)
        const result = await res.json()
        setOfferListings(result)
        /*Ketika berhasi, tampilkan rent*/
        fetchRent()
      } catch(error) {
        console.log(error)
      }
    }

    const fetchRent = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`)
        const result = await res.json()
        setRentListings(result)
        /*Ketika berhasi;, tampilkan sale*/
        fetchSale()
      } catch(error) {
        console.log(error)
      }
    }
    const fetchSale = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`)
        const result = await res.json()
        setSaleListings(result)
      } catch(error) {
        console.log(error)
      }
    }

    fetchOffer()
  }, [])

  return (
      <div>
        <div className='flex flex-col min-h-screen sm:flex-row w-full mt-20 gap-2 h-full'>
        <div className='overflow-hidden relative flex flex-col flex-1 mx-16 md:ml-28 gap-3'>
          <h1 className='text-[2rem] md:text-[55px] font-semibold'>DISCOVER <br/> MOST SUITABLE <br/>PROPERTY</h1> 
          <span className='w-8 h-8 bg-orange-500 rounded-full absolute right-3 md:right-6'></span>
          <span className='w-8 h-8 bg-blue-500 rounded-full absolute right-10 top-5 md:right-16 md:top-10'></span>
          <div className='flex mr-5'>
          <span className='text-gray-500'>Find a variety of properties that suit you very easily. Forget all difficulties in finding a residence for you</span>
          </div>

          <div className='w-full h-full mt-3'>
            <div className='flex flex-col md:mr-48'>
              <div className='flex justify-between'>
                <div className='w-24'>
                <h1 className='text-xl md:text-3xl capitalize font-semibold'>9K<span className='text-orange-500 font-bold'>++</span></h1>
                <span className='text-gray-500 capitalize'>premium product</span>
                </div>
                <div className='w-24'>
                <h1 className='text-xl md:text-3xl capitalize font-semibold'>2K<span className='text-orange-500 font-bold'>++</span></h1>
                <span className='text-gray-500 capitalize'>Happy customer</span>
                </div>
                <div className='w-24'>
                <h1 className='text-xl md:text-3xl capitalize font-semibold'>28K<span className='text-orange-500 font-bold'>++</span></h1>
                <span className='text-gray-500 capitalize'>awards winning</span>
                </div>
              </div>
            </div>
          </div>

          <div className=' bg-slate-700 md:mr-14' style={{borderRadius: '40% 10%'}}>
          <img src={people} className='hidden md:block md:h-[28rem] md:w-[33rem] md:mt-[-7rem] object-cover'/>
          </div>
        </div>

        <div className='relative flex flex-col flex-1 md:mb-40'>
          <div>
          <img src={city} className='hidden md:block md:mt-[-5rem] md:h-[28rem] shadow-xl' style={{borderRadius: '40% 10%'}}/>  
          </div>          
          <div className='flex flex-col mt-[-10rem] mx-16 md:mt-36 md:mx-10 md:py-10 justify-center '>
            <h1 className='text-4xl font-semibold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-400'>GET STARTED</h1>
            
            <div className='flex mr-5 mt-1'>
              <span className='text-gray-500 text-sm md:text-lg'>Discover your dream home with our range of thoughtfully designed residential spaces.</span>
            </div>
            <div className='mt-5'>
              <Link to='/sign-up'>
              <button className='bg-slate-500 px-10 py-2 text-white font-semibold rounded-full bg-gradient-to-r from-blue-500  to-green-500 hover:scale-105'>Try <span className='text-xs ml-2 font-bold'><FontAwesomeIcon icon={faChevronRight}/></span></button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-row min-h-screen sm:flex-row w-full gap-2 justify-center'>
        {offerListings && offerListings.length > 0 && (
          <div className='flex flex-col mx-14 md:justify-center md:items-center'>
          <div className='mb-7'>
            <h1 className='text-xl font-semibold uppercase'>Recent Offers -</h1>
          </div>
          <div className='flex flex-wrap gap-2'>
            {offerListings.map((listing) => (
              <SearchData listing={listing} key={listing._id}/>
            ))}
          </div>
          </div>
        )}
        
      </div>
      <div className='flex flex-row min-h-screen sm:flex-row w-full md:mt-[-2rem] gap-2 justify-center'>
        {rentListings && rentListings.length > 0 && (
          <div className='flex flex-col mx-14 md:justify-center md:items-center'>
          <div className='mb-7 mt-10'>
            <h1 className='text-xl font-semibold uppercase'>Recent Place for rent-</h1>
          </div>
          <div className='flex flex-wrap gap-2'>
            {rentListings.map((listing) => (
              <SearchData listing={listing} key={listing._id}/>
            ))}
          </div>
          </div>
        )}
      </div>
      <div className='flex flex-row min-h-screen sm:flex-row w-full gap-2 justify-center'>
        {saleListings && saleListings.length > 0 && (
          <div className='flex flex-col md:mt-[-7rem] mx-14 md:justify-center md:items-center'>
          <div className='mb-7 mt-10'>
            <h1 className='text-xl font-semibold uppercase'>Recent Place for sale-</h1>
          </div>
          <div className='flex flex-wrap gap-2'>
            {saleListings.map((listing) => (
              <SearchData listing={listing} key={listing._id}/>
            ))}
          </div>
          </div>
        )}
      </div>

      <div className='mx-24'>
        <div className='mb-20 flex items-center justify-center'>
          <div>
            <img src={house} className='w-[20rem]'/>
          </div>
          <h1 className='text-3xl'>Provides a Suitable Residence For You!</h1>
        </div>
        <div className='bg-black/10 p-5 rounded-lg'>
        <GalleryImages/>
        </div>
      </div>

      <div className='max-w-screen sm:flex-row  flex flex-col mx-[10rem] md:mt-14 md:mb-10 rounded-xl'>
      <div className='flex flex-row flex-1 gap-20 border rounded-lg bg-gradient-to-r from-purple-700 via-blue-500 to-purple-400  hidden md:block'>
        <div className='flex flex-col px-5 py-4'>
          <h1 className='text-lg font-semibold text-white mb-5'>Join Us for an Exclusive Property Showcase!</h1>
          <p className='text-white text-sm text-justify mb-5'>Discover the epitome of luxury living at our upcoming Property Showcase event. Unveil the charm of exquisite homes, explore lucrative investment opportunities, and witness innovation in real estate.</p>
          <button className='py-3 px-5 bg-orange-500 w-[13rem] rounded-full font-semibold border-b border-white text-white'>Check the schedule <FontAwesomeIcon icon={faChevronRight}/></button>
        </div>
      </div>
      <div className='flex flex-row flex-1 gap-20 my-2 hidden md:block'>
        <div className='flex flex-row mx-32'>
          <img src={buildings} className='w-48 h-48 rounded-full border-b border-white'></img>
          <div className='p-3 bg-orange-500 mx-2'></div>
          <div className='p-3 bg-orange-800  mx-2 my-5'></div>
          <div className='p-3 bg-black  mx-2'></div>
        </div>
      </div>
      </div>

      </div>

  )
}

export default Home
