import React from 'react'
import footerImg from '../assets/footerImg.png'

const Footer = () => {
    const quickLinks = [
        {
            path: '/home',
            display: 'Home'
        },
        {
            path: '/about',
            display: 'About'
        },
        {
            path: '/tours',
            display: 'Tours'
        },
    ]

    const quickLinks2 = [
        {
            path: '/home',
            display: 'Home'
        },
        {
            path: '/about',
            display: 'About'
        },
        {
            path: '/tours',
            display: 'Tours'
        },
    ]
    const quickLinks3 = [
        {
            path: '/home',
            display: 'Home'
        },
        {
            path: '/about',
            display: 'About'
        },
        {
            path: '/tours',
            display: 'Tours'
        },
    ]

    const year = new Date().getFullYear()

  return (
    <div className='bg-black w-full'>
      <div className='max-w-screen sm:flex-row  flex flex-col '>
      <div className='flex flex-1 justify-center mb-5'>
        <img src={footerImg} className='object-cover w-[15rem]'></img>
      </div>

      <div className='flex flex-row flex-1 gap-20 pt-10'>
        <div className='flex flex-col'>
            {quickLinks.map((item, index) => (
                <ul key={index} className='text-white'>
                    <li className='text-md p-1 px-3 hover:bg-orange-500 rounded-lg'>{item.display}</li>
                </ul>
            ))}
        </div>
        <div className='flex flex-col'>
            {quickLinks2.map((item, index) => (
                <ul key={index} className='text-white'>
                    <li className='text-md p-1 px-3 hover:bg-orange-500 rounded-lg'>{item.display}</li>
                </ul>
            ))}
        </div>
        <div className='flex flex-col'>
            {quickLinks3.map((item, index) => (
                <ul key={index} className='text-white'>
                    <li className='text-md p-1 px-3 hover:bg-orange-500 rounded-lg'>{item.display}</li>
                </ul>
            ))}
        </div>
      </div>
      </div>
      <div className='flex justify-center'>
        <p className='text-orange-300 mb-5 text-sm md:text-md'>Copyright {year}, develop by GHINA FARAJ. All righ reserved.</p>
      </div>
    </div>
  )
}

export default Footer;
