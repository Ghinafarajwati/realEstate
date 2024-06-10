import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCaretRight} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import SearchData from './searchData'

const Search = () => {
    const navigate= useNavigate()
    const [sideData, setSideData] = useState({
        searchTerms: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc'
    })
    
    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(false)
    const [showMore, setShowMore] = useState(false)

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)       //ambil query urlnya
        const searchUrl = urlParams.get('searchTerms')              
        const typeUrl = urlParams.get('type')
        const parkingUrl = urlParams.get('parking')
        const furnishedUrl = urlParams.get('furnished')
        const offerUrl = urlParams.get('offer')
        const sortUrl = urlParams.get('sort')
        const orderUrl = urlParams.get('order')

        if(searchUrl || typeUrl || parkingUrl || furnishedUrl || offerUrl || sortUrl || orderUrl) {     //ketika search, tulisan search header dan search sidebar sama. Lalu url pun akan mengikuti search/form 
            setSideData({
                searchTerms: searchUrl || '',
                type: typeUrl || 'all',
                parking: parkingUrl === 'true' ? true : false,
                furnished: furnishedUrl === 'true' ? true : false,
                offer: offerUrl === 'true' ? true : false,
                sort: sortUrl || 'created_at',
                order: orderUrl || 'desc'
            })
        }

        const fetchListings = async () => {                             //munculkan datanya
            setLoading(true)
            setShowMore(false)
            try {
                const searchQuery = urlParams.toString()
                const res = await fetch(`/api/listing/get?${searchQuery}`)
                if(!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`)
                }
                const result = await res.json()
                if(result.length > 4) {
                    setShowMore(true)
                } else {
                    setShowMore(false)
                }
                setListings(result)
                setLoading(false)
            } catch(error) {
                setLoading(false)
            }
        }
        fetchListings()
    }, [location.search])

    const handleChange = (e) => {
        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setSideData({...sideData, type: e.target.id})
        } 
        if (e.target.id === 'searchTerms'){
            setSideData({...sideData, searchTerms: e.target.value})
        }
        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setSideData({...sideData, [e.target.id] : e.target.checked})  //jika checknya adalah boolean true/ string true, maka set dengan true/false
        }
        if(e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at'
            const order = e.target.value.split('_')[1] || 'desc'
            setSideData({...sideData, sort, order})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams()
        urlParams.set('searchTerms', sideData.searchTerms)
        urlParams.set('type', sideData.type)
        urlParams.set('parking', sideData.parking)
        urlParams.set('furnished', sideData.furnished)
        urlParams.set('offer', sideData.offer)
        urlParams.set('sort', sideData.sort)
        urlParams.set('order', sideData.order)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }

    const showMoreClick = async () => {
        const numberListing = listings.length                   
        const startIndex = numberListing                           
        const urlParams = new URLSearchParams(location.search)  
        urlParams.set('startIndex', startIndex)                 
        const searchQuery = urlParams.toString()

        const res = await fetch(`/api/listing/get?${searchQuery}`)
        const result = await res.json()
        if(result.length < 5) {
            setShowMore(false)
        } 
        setListings([...listings, ...result])
    }


  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-5 border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
            <div className='flex flex-col gap-2 uppercase'>
                <span className='font-bold text-sm'>Search Terms</span>
                <input id='searchTerms' type='text' placeholder='SearchTerms' value={sideData.searchTerms} onChange={handleChange} className='border rounded-md p-2 outline-none'></input>
            </div>

            <div className='flex flex-row flex-col items-start gap-2'>
            <span className='font-bold text-sm  uppercase'>Product type</span>
                <div className='flex pt-2'>
                <label>Rent & Sale</label>
                <input type='checkbox' id='all'onChange={handleChange}  checked={sideData.type === 'all'}  className='flex w-5 mt-1 ml-4'></input>
                </div>
                <div className='flex pt-1'>
                <label>Rent</label>
                <input type='checkbox' id='rent' onChange={handleChange} checked={sideData.type === 'rent'} className='w-5 mt-1 ml-[66px]'></input>
                </div>
                <div className='flex pt-1'>
                <label>Sale</label>
                <input type='checkbox' id='sale' onChange={handleChange} checked={sideData.type === 'sale'} className='w-5 mt-1 ml-[69px]'></input>
                </div>
                <div className='flex pt-1'>
                <label>Offer</label>
                <input type='checkbox' id='offer' onChange={handleChange} checked={sideData.offer} className='w-5 mt-1 ml-[62px]'></input>
                </div>
            </div>
            <div className='flex flex-row flex-col items-start gap-2'>
            <span className='font-bold text-sm  uppercase'>Categories</span>
                <div className='flex pt-2'>
                <label>Parking</label>
                <input type='checkbox' id='parking' onChange={handleChange} checked={sideData.parking} className='flex w-5 mt-1 ml-[45px]'></input>
                </div>
                <div className='flex pt-1'>
                <label>Funiture</label>
                <input type='checkbox' id='furnished' onChange={handleChange} checked={sideData.furnished} className='w-5 mt-1 ml-[39px]'></input>
                </div>
            </div>
            <div className='flex flex-row flex-col items-start gap-2'>
            <span className='font-bold text-sm  uppercase'>Sort</span>
                <div className='flex pt-2'>
                <select id='sort_order' onChange={handleChange} defaultValue='createdAt_desc' className='px-3 py-2 rounded-md'>
                    <option value='regularPrice_desc'>Price high to low</option>
                    <option value='regularPrice_asc'>Price low to high</option>
                    <option value='createdAt_desc'>Latest</option>
                    <option value='createdAt_asc'>Oldest</option>
                </select>
                </div>
                <button className='w-full bg-orange-400 py-2 rounded-full shadow-md text-white font-semibold mt-3'>Filter</button>
            </div>
        </form>
      </div>
      <div className='ml-16 my-5 flex-1'>
        <h1 className='text-lg mb-5'><span className='mr-4'><FontAwesomeIcon icon={faCaretRight}/></span>Fitering and sorting</h1>
        <div className='flex flex-wrap gap-3'>
        {!loading && listings.length === 0 && (
            <p className='text-xl text-center mt-10 text-red-700'>No listing Found...</p>
        )}
        {!loading && listings && listings.map((item) => (
            <SearchData key={item._id} listing={item}/>
        ))}
        {showMore && (
        <button onClick={showMoreClick} className='text-orange-500 font-semibold hover:underline pt-5'>Show more-</button>
        )}
        </div>
      </div>
    </div>
  )
}

export default Search
