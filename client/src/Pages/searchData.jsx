import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

const SearchData = ({listing}) => {
  return (
    <div className='shadow-md border transition-shadow overflow-hidden rounded-lg sm=[330px]'>
      <Link to={`/propertyId/${listing._id}`}>
        <div className='flex flex-col w-full px-2 pt-2 pb-4 ml-1'>
        <img src={listing.imageUrls[0]} alt='listing-cover' className='sm:h-[150px] w-60 object-cover hover:scale-105 transition-scale duration-300 rounded-lg'></img>
        
        <div className='flex flex-col gap-2 mt-2'>
        <p className='text-lg font-semibold text-gray-700 truncate'>{listing.name}</p>
        <div className='flex items-center gap-1'>
            <FontAwesomeIcon icon={faLocationDot} className='text-blue-700 text-sm mr-1'/>
            <p className='text-sm text-gray-500 truncate'>{listing.address}</p>
        </div>
        <p className='text-sm text-gray-700 line-clamp-2 w-60'>{listing.description}</p>
        <p className='font-semibold'>$ 
            {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' /month'}
        </p>
        <div className='flex gap-2'>
          <div className='font-semibold text-sm py-2 px-3 border border-blue-500 rounded-full'>
          {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
          </div>
          <div className='font-semibold text-sm py-2 px-3 border border-blue-500 rounded-full'>
          {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
          </div>
        </div>
        </div>
        </div>
      </Link>
    </div>
  )
}

export default SearchData
