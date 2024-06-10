import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Avatar, Dropdown } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '../Components/signOut.jsx'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)
  const [searchTerms, setSearchTerms] = useState('')   //searchTerms ini dengan search page harus sama

  const handleSubmit = (e) => {
    e.preventDefault()

    const urlParams = new URLSearchParams(window.location.search)   //tangkep url
    urlParams.set('searchTerms', searchTerms)                     //ganti url dengan inputan
    const searchQuery = urlParams.toString();                   //inputan ubah jadi string
    navigate(`/search?${searchQuery}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTerms = urlParams.get('searchTerms')
    if(searchTerms) {
      setSearchTerms(searchTerms)
    }
  }, [location.search])

  const logoutProfile = () => {
    handleLogout(dispatch)
  }

  return (
      <header className='bg-white-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-2'>
            <form onSubmit={handleSubmit} className='p-3 rounded-full flex items-center border'>
                <input type='text' placeholder='Search here...' value={searchTerms} onChange={(e) => setSearchTerms(e.target.value)} className='bg-transparent focus:outline-none placeholder-gray-700 ml-1'></input>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='text-slate-600 mr-2'/>
            </form>
            <ul className='flex gap-5'>
            <Link to='/'>
                <li className='hidden sm:inline font-semibold hover:text-blue-500'>Home</li>
            </Link>
            <Link to='/about'>
                <li className='hidden sm:inline font-semibold hover:text-blue-500'>About</li>
            </Link>
            <Link to='/faq'>
                <li className='hidden sm:inline font-semibold hover:text-blue-500'>Faq</li>
            </Link>

            <div style={{zIndex: '9999'}}>
            { user ? (
              <Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={user.avatar} rounded/>}>
                <div className='my-3 ml-3 mr-8'>
                <Dropdown.Header>
                <span className='block text-sm p-1'>@{user.username}</span>
                <span className='block text-sm font-semibold p-1 border-b border-black-400 inline'>{user.email}</span>
              </Dropdown.Header>
              <Link to={'/dashboard?tab=profile'}>
                <Dropdown.Item className='text-base mt-5 p-1'>Dashboard</Dropdown.Item>
              </Link>
              <Dropdown.Divider/>
                <Dropdown.Item onClick={logoutProfile} className='text-base font-semibold text-red-700 pl-1 mt-2 mb-5'>Sign out <FontAwesomeIcon icon={faArrowRight} className='ml-4 mt-1'/></Dropdown.Item>
                </div>
              </Dropdown>
            ) : (
              <Link to='/sign-in'>
                <li className='font-semibold bg-orange-500 px-4 py-1 rounded-full text-white'>Sign In</li>
              </Link>
            )}
            </div>
            </ul>
        </div>
      </header>
  )
}

export default Header
