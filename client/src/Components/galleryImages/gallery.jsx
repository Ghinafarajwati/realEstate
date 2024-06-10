import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import galleryImg from './galleryImg.jsx'

const GalleryImages = () => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{350:1, 768:3, 992:4}}>
        <Masonry gutter='1rem'>
            {galleryImg.map((item, index) => (
                <div key={index}>
                  <img src={item} alt='' className='gallery_img rounded-lg'></img>
                </div>
            ))}
        </Masonry>
    </ResponsiveMasonry>
  )
}

export default GalleryImages
