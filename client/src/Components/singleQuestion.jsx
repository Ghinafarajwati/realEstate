import React, { useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSortUp, faSortDown, faHouseChimneyCrack} from '@fortawesome/free-solid-svg-icons'

const SingleQuestion = ({item}) => {
    const [show, setShow] = useState(false)
  return (
    <>
      <div className='rounded-lg bg-white shadow-md'>
      <article className='flex items-center justify-between px-2 py-4 lg:p-3'>
      <h1 className='cursor-pointer font-semibold text-slate-600' onClick={() => setShow(!show)}><span className='px-1 mx-2 text-lg text-blue-700 bg-slate-100 shadow-md'><FontAwesomeIcon icon={faHouseChimneyCrack} className='shadow-lg'/></span>{item.question}</h1>
      <ul>
        {!show && (
        <li>
        <button onClick={() => setShow(!false)} className='px-2 pb-2 bg-slate-100 text-blue-700 rounded-lg'><FontAwesomeIcon icon={faSortDown}/></button>
        </li>
        )}
        {show && (
            <li>
            <button onClick={() => setShow(false)} className='px-2 pt-2 bg-slate-100 text-blue-700 rounded-lg'><FontAwesomeIcon icon={faSortUp}/></button>
            </li>
        )}
      </ul>
      </article>

      <article className={`${show && "ml-1 px-4 pb-4 lg:p-6"}`}>
       {show && <p className='text-sm text-gray-500 w-full pr-10'>{item.answer}</p>}
      </article>
      </div>
    </>
  )
}

export default SingleQuestion
