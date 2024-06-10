import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Contact = ({listingId}) => {
  const [landLord, setLandlord] = useState(null)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setMessage(e.target.value)
  }


  //mendapatkan id pemilik propeti
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listingId.userRef}`);
        const result = await res.json()
        setLandlord(result)
      } catch(error) {
        console.log(error)
      }
    }
    fetchLandlord()
  }, [listingId.userRef])
  return (
    <>
      {landLord && (
        <div className='px-5'>
          <div className='flex flex-col mt-10 py-5 rounded-lg bg-gray-100 px-5'>
          <p className='text-center capitalize mb-5'>Contact <span className='font-semibold'>{landLord.data.username}</span> for <span className='font-semibold'>{listingId.name.toLowerCase()}.</span></p>
          <textarea name='message' id='message' rows="2" value={message} onChange={handleChange} placeholder='Send your message...' className='p-2 rounded-lg resize-none h-36 overflow-y-auto placeholder-top text-gray-500'></textarea>
        {/* EMAIL */}
          <Link to={`mailto: ${landLord.email}?subject=Regarding${listingId.name}&body=${message}`} className='bg-blue-500 mt-5 py-3 rounded-full text-white font-semibold text-center shadow-md'>Send message</Link>
        </div>
        </div>
      )}
    </>
  )
}

export default Contact
