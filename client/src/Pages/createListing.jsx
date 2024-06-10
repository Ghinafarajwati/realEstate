import React, { useState } from 'react'
import { app } from '../firebase.js'
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faTrash, faArrowUpFromBracket, faPersonShelter, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Sidebar } from '../Components/sidebar.jsx';

const CreateListing = () => {
  const { user } = useSelector((state) => state.user)
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);           //berisi file gambarnya sebelum diunggah
  console.log(files)
  const [formData, setFormData] = useState({        //berisi URL gambar yang sudah diunggah. 
    imageUrls: [],
    name: '',
    description: '',
    address: '',    
    road: '1 industrial road', 
    regularPrice: 50,
    discountPrice: 0,
    bathrooms: 1,
    bedrooms: 1,
    type: 'rent', 
    furnished: false,
    parking: false,
    offer: false,

  });
  const [imgLoading, setImgLoading] = useState(false)
  const [imgErr, setImgErr] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitErr, setSubmitErr] = useState(false)


  /* SUBMIT IMAGE */
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {   //Pengecekan. Ada datanya atau engga. File yang akan diunggah dan URL gambar harus kurang dari 7
      setImgLoading(true)
      setImgErr(false)

      const dataImg = [];                                                    //Berisi keranjang semua img files sebelum diunggah
      for (let i = 0; i < files.length; i++) {                                //selama datanya kurang dari panjang array files (7) maka teruskan
        dataImg.push(storeImage(files[i]));                                  //Setiap file diunggah ke Firebase Storage
      }

      Promise.all(dataImg)                                          //Tunggu sampai semua file terunggah, dataImg berisi kumpulan Promise img files
      .then((urls) => {                                  
        setFormData({...formData, imageUrls: formData.imageUrls.concat(urls)});  //Gabungin url yg udah ada dengan yg baru
        setImgErr(false)
        setImgLoading(false)
      }).catch ((err) => {
        setImgErr('Image upload failed, (2mb max)!')
        setImgLoading(false)
      })
      
    } else {
      setImgErr('You can only upload 6 images!')
      setImgLoading(false)
    }
  };

   /* KIRIM KE FIREBASE */
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadImg = uploadBytesResumable(storageRef, file);    //mengunggah file ke penyimpanan Firebase

      uploadImg.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadImg.snapshot.ref).then((downloadURL) => {   //mendapatkan URL unduhan
            resolve(downloadURL);
          });
        }
      );
    });
  };

  /* HAPUS IMAGE */
  const handleDeleteImg = (index) => {
    const updatedImageUrls = [...formData.imageUrls]
    updatedImageUrls.splice(index, 1);  // Menghapus satu elemen pada indeks tertentu
  
    setFormData({...formData, imageUrls: updatedImageUrls});
  }

  //CHECKBOX CHOOSING
  const handleChange = (e) => {
    const { id, checked, type, value } = e.target;

    if(type === 'checkbox' && (id === 'sale' || id === 'rent' || id === 'furnished' || id === 'parking' || id === 'offer')) {
      setFormData({...formData, [id]: checked, type: id === 'sale' || id === 'rent' ? id: formData.type})
    }
    if(type === 'select-one') {
      setFormData({...formData, road: value})
    }
    if(type === 'text' || type === 'number' || type === 'textarea') {
      setFormData({...formData, [id] : value})
    }
  }

  /* SUBMIT FORM */
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (formData.imageUrls.length < 1)
        return setSubmitErr('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setSubmitErr('Discount price must be lower than regular price');
      
      setSubmitLoading(true)
      setSubmitErr(false)
      const res = await fetch('/api/listing/create', {
        method: 'post',
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify({...formData, userRef: user._id })    //Dengan menyertakan user._id dalam data yang dikirim, server atau backend dapat mengidentifikasi pengguna mana yang membuat listing tersebut.
      })

      const result = await res.json()
      setSubmitLoading(false)
      if(!res.ok) {
        setSubmitErr(result.message)
      }
      navigate(`/dashboard?tab=user-listing`)
    } catch (error) {
      setSubmitErr(error.message)
      setSubmitLoading(false)
    }
  };

  return (
    <div className='relative'>
    <Sidebar/>
    <div className='md:max-w-3xl md:mx-auto mx-20'>
    <div className='flex justify-center items-center'>
      <h1 className='text-3xl font-semibold text-center my-7 mt-10'>CREATE LISTING</h1>
    </div>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-10'>
        <div className='flex flex-col gap-4 w-60 md:mb-10 md:w-80 flex-1 border p-2 md:p-3 pt-4 rounded-lg'>
          <div className='w-full bg-violet-500 p-2 rounded-lg text-white flex justify-center font-semibold'><p>Input your property here! <FontAwesomeIcon className='pl-2' icon={faPersonShelter}/></p></div>
          
          <input onChange={handleChange} value={formData.name} type='text' placeholder='Name' id='name' maxLength='27' minLength='10' required className='border md:p-2 rounded-lg'></input>
          <textarea onChange={handleChange} value={formData.description} type='text' placeholder='Description' id='description' required className='border md:p-2 rounded-lg resize-none md:h-36 overflow-y-auto placeholder-top text-gray-500'></textarea>
          <input onChange={handleChange} type='text' placeholder='Address' id='address' maxLength='27' minLength='10' required className='border md:p-2 rounded-lg'></input>
         
          <div className='flex flex-wrap gap-4 justify-start mb-1'>
          <div className='flex gap-2'>
            <input onChange={handleChange} checked={formData.type === 'sale'} type='checkbox' id='sale' className='w-5'></input>
            <span>Sale</span>
          </div>
          <div className='flex gap-2'>
            <input onChange={handleChange} checked={formData.type === 'rent'} type='checkbox' id='rent' className='w-5'></input>
            <span>Rent</span>
          </div>
          <div className='flex md:flex-row flex-col gap-3'>
            <div className='flex gap-2'>
              <input onChange={handleChange} checked={formData.parking} type='checkbox' id='parking' className='w-5'></input>
              <span>Parking</span>
            </div>
            <div className='flex gap-2'>
              <input onChange={handleChange} checked={formData.furnished} type='checkbox' id='furnished' className='w-5'></input>
              <span>Furnished</span>
            </div>
            <div className='flex gap-2 mr-8'>
              <input onChange={handleChange} checked={formData.offer} type='checkbox' id='offer' className='w-5'></input>
              <span>Offer</span>
            </div>
          </div>
        </div>
        <div className='flex gap-2 mr-8 mb-3'>
          <select onChange={handleChange} value={formData.selectedOption} id='road' className='rounded-md border  bg-white shadow-md p-2 text-center text-sm'>
            <option value='1 industrial road'>1 industrial road</option>
            <option value='2 industrial road'>2 industrial road</option>
            <option value='3 industrial road'>3 industrial road</option>
            <option value='many industrial road'>many industrial road</option>
          </select>
        </div>

        <div className='flex flex-wrap gap-1 md:gap-6 justify-start'>
          <div className='flex flex-col items-center gap-2'>
            <input onChange={handleChange} value={formData.bedrooms} type="number" id="bedrooms" min='1' max='10' required className='p-2 w-16 border border-gray-300 rounded-lg'/> 
            <p>Beds</p>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <input onChange={handleChange} value={formData.bathrooms} type="number" id="bathrooms" min='1' max='10' required className='p-2 w-16 border border-gray-300 rounded-lg'/> 
            <p>Bath</p>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <input onChange={handleChange} value={formData.regularPrice} type="number" id="regularPrice" min='1' max='10000000000' required className='p-2 w-16 border border-gray-300 rounded-lg' style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}/> 
            <div className='flex flex-col items-center'>
            <p>Regular price</p>
            {formData.type === 'rent' && (
              <span className='text-xs'>($ / month)</span>
            )}
            </div>
          </div>

          {formData.offer && (                  //Kalo offer bernilai true
            <div className='flex flex-col items-center gap-2'>
            <input onChange={handleChange} value={formData.discountPrice} type="number" id="discountPrice" min='1' max='10000000000' required className='p-2 w-16 border border-gray-300 rounded-lg' style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}/> 
            <div className='flex flex-col items-center'>
            <p>Discount Price</p>
            {formData.type === 'rent' && (
              <span className='text-xs'>($ / month)</span>
            )}
            </div>
          </div>
          )}
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>    
          
          <div className='md:flex md:justify-end mx-7 md:mt-[-4rem]'>
          <button disabled={submitLoading || imgLoading} onSubmit={handleSubmit} className='px-5 py-3 border border-2 shadow-md border-gray-200 rounded-full capitalize bg-gradient-to-r  hover:opacity-95 disabled:opacity-80'>{submitLoading ? 'loading...' : (<div><FontAwesomeIcon icon={faPlus} className='mr-2 text-sm'/>Add property</div>)}</button>
          </div>      
          
          <p className='font-semibold mt-5'>Upload Images:</p>
          <span className='text-slate-500'>The first image will be the cover (max 6) </span>
          {/*  */}
          <div className='flex flex-col gap-4 mb-10  '>
          <div className='bg-violet-600 flex flex-col bg-violet-600 justify-center items-center w-full cursor-pointer border-dashed rounded-lg h-24 text-violet-600 overflow-hidden'>
            <FontAwesomeIcon icon={faArrowUpFromBracket} className='text-white pb-2 text-2xl'/>
            <p className='text-sm text-white font-semibold'>Click to upload</p>
            <p className='text-xs text-white'>max 2 mb</p>
          <input onChange={(e) => setFiles(e.target.files)} type="file" id='images' accept='image/*' multiple className='opacity-0 absolute border border-gray-300 rounded-xl p-3' />
          </div>            
            
          <div className='flex justify-start'>
            <button type='button' id='images' onClick={handleImageSubmit} disabled={imgLoading} className='p-3 border border-2 shadow-md text-sm font-semibold border-violet-500 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{imgLoading ? 'Uploading..' : (<>Upload <FontAwesomeIcon icon={faArrowUp}/></>)}</button>
            </div>

          
          </div>
          {/*  */}
          <div className='flex flex-wrap gap-2'>
            {formData.imageUrls.length > 0 && formData.imageUrls.map((item, i) => (
              <div key={item} className='w-40 h-48 p-1 pb-6 bg-gray-300 rounded-lg flex justify-center relative transform hover:-translate-y-1 transition-transform duration-300 ease-in-out'>
              <img src={item} alt='images' className='h-full w-full object-cover rounded-lg'></img>
              <button type='button' onClick={() => handleDeleteImg(i)} className='absolute bottom-10 left-28 px-3 py-2 bg-white text-red-500 text-md rounded-lg'>
                <FontAwesomeIcon className='hover:text-black' icon={faTrash}/>
              </button>
              </div>
            ))}
          </div>
          <div>
          <p className='text-red-500 text-sm' style={{marginTop: '-50px'}}>{imgErr && imgErr}</p>
          </div>
          <div>
          <p className='text-red-500 text-sm'>{submitErr && submitErr}</p>
          </div>
        </div>
      </form>
    </div>
    </div>
  )
}

export default CreateListing
