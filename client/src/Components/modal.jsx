import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

export default function Modal({open, onClose, children}) {
  return (
    <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? 'visible bg-black/10' : 'invisible'}`}>
      <div onClick={(e) => e.stopPropagation()} className={`bg-white rounded-xl shadow p-14 transform transition-all ${open ? 'scale-100' : 'scale-125'}`}>
        <button onClick={onClose} className='absolute top-1 right-3 p-3 rounded-lg text-gray-400 hover:text-red-600'><FontAwesomeIcon icon={faXmark} /></button>
        <div className='text-center'>
        {children}
        </div>
      </div>
    </div>
  )
}
