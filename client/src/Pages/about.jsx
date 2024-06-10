import React from 'react'
import building1 from "../assets/building1.jpg";
import building2 from "../assets/building2.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons'

const About = () => {
  return (
    <div className='md:mx-36 my-24'>
      <div className='flex flex-col justify-center items-center '>
        <h1 className='mb-7 md:text-2xl md:text-4xl uppercase font-bold'>About Us</h1>
        <h2 className='mx-3 md:mx-[10rem] text-center'>Explore a diverse range of residential, commercial, and investment properties meticulously curated to meet your specific needs and aspirations.</h2>
      </div>

      <div className='flex flex-row justify-between mt-24 bg-gray-100'>
        <div className='relative flex-flex-col w-[20rem] md:w-[27rem]'>
          <div className='relative'>
            <img src={building1}></img>
            <div className='absolute flex flex-col items-end top-10 right-[-2rem]'>
              <h1 className='text-2xl font-semibold'>CENDANA</h1>
              <h2 className='text-xl'>Residence</h2>
            </div>
          </div>
        </div>
        <div className='flex-flex-col w-[20rem] md:w-[27rem] mt-60'>
        <div className='relative'>
            <img src={building2} className='md:h-[25rem]'></img>
            <div className='absolute flex flex-col items-end top-32 left-[-2rem]'>
              <h1 className='text-2xl font-semibold'>ROZENIN</h1>
              <h2 className='text-xl'>Residence</h2>
            </div>
          </div>
        </div>
      </div>

      <div className='border-b bg-gray-800 p-2 mt-24'></div>

      {/* section 2 */}
      <div className='flex flex-row justify-between gap-2'>
        <div className='relative flex-flex-col w-[27rem]'>
          <div className='relative'>
            <img src={building1}></img>
            <div className='absolute flex flex-col items-end top-10 left-[-2rem] hidden md:block'>
              <h1 className='text-2xl font-semibold'>JUPITER</h1>
              <h2 className='text-xl'>Residence</h2>
            </div>
          </div>
        </div>
        <div className='relative flex-flex-col w-[27rem]'>
          <div className='relative'>
            <img src={building1}></img>
          </div>
        </div>
        <div className='relative flex-flex-col w-[27rem]'>
          <div className='relative'>
            <img src={building1}></img>
            <div className='absolute flex flex-col items-end top-10 right-[-2rem] hidden md:block'>
              <h1 className='text-2xl font-semibold'>SYMPHONY</h1>
              <h2 className='text-xl'>Residence</h2>
            </div>
          </div>
        </div>

        <div className='border-b bg-gray-800 p-2 mt-28 hidden md:block'></div>
      </div>

      {/* section 3 */}
      <div className='flex flex-row justify-between mt-24 '>
        <div className='relative flex-flex-col md:w-[27rem] hidden md:block'>
          <div className='relative'>
            <img src={building1} className='h-[30rem] w-[25rem]'></img>
          </div>
        </div>

        <div className='flex flex-col justify-center md:w-[40rem]'>
          <div className='flex flex-row md:my-5 '>
            <div className='w-40 md:w-52 ml-3 md:ml-14'>
            <FontAwesomeIcon icon={faCircleCheck} className='text-2xl mb-2'/>
            <h1 className='font-semibold mb-5 md:text-xl'>Company Profesional</h1>
            <p className='text-xs text-justify text-gray-500'>Join us on a journey where each property represents an opportunity for the future, and each transaction is a step toward realizing your dreams.</p>
            </div>
            <div className='w-40 md:w-52 ml-3 md:ml-14'>
            <FontAwesomeIcon icon={faCircleCheck} className='text-2xl mb-2'/>
            <h1 className='font-semibold mb-5 text-xl'>Easy peasy</h1>
            <p className='text-xs text-justify text-gray-500'> Enjoy the convenience of a one-stop destination for buying, selling, and renting properties. Our platform caters to a diverse range of needs investment opportunities.</p>
            </div>
          </div>
          <div className='flex flex-row my-5 '>
            <div className='w-40 md:w-52 ml-3 md:ml-14'>
            <FontAwesomeIcon icon={faCircleCheck} className='text-2xl mb-2'/>
            <h1 className='font-semibold mb-5 text-xl'>Buy, sell, rent</h1>
            <p className='text-xs text-justify text-gray-500'>We strive to provide a comprehensive range of real estate solutions, embracing both buying and renting, ensure that your every requirement is met under one roof.</p>
            </div>
            <div className='w-40 md:w-52 ml-3 md:ml-14'>
            <FontAwesomeIcon icon={faCircleCheck} className='text-2xl mb-2'/>
            <h1 className='font-semibold mb-5 text-xl'>Trusted for you</h1>
            <p className='text-xs text-justify text-gray-500'>We aim to be the unwavering partner you can rely on, providing a seamless experience for those looking to buy, sell, or rent properties.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
