import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft} from '@fortawesome/free-solid-svg-icons'

const Carousel = ({ imageUrls }) => {
    const [slide, setSlide] = useState(0);

    const prev = () => {
        setSlide((slide) => (slide === 0 ? imageUrls.length - 1 : slide - 1));
    };
    const next = () => {
        setSlide((slide) => (slide === imageUrls.length - 1 ? 0 : slide + 1));
    };

  return (
      <div className='overflow-hidden w-[23rem]'>
      <div className='flex'>
        <img src={imageUrls[slide]} className='object-cover rounded-lg border h-60 mb-1 ' alt={`Image ${slide}`}
        />
      </div>
      <div className='absolute top-[19rem] p-5'>
        <div className=''>
        <button onClick={prev} className='text-xl px-2 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button onClick={next} className='text-xl px-2 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white absolute left-80'>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
        </div>
      </div>
    </div>
  );
}

export default Carousel
