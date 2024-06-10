import React, { useState } from 'react'
import {questions} from '../assets/questions/questions.js'
import SingleQuestion from './singleQuestion.jsx'
import question from '../assets/question.png'

const Questions = () => {
    const [cards, setCards] = useState(questions)
  return (
    <>
    <section className='flex flex-col min-h-screen sm:flex-row mt-20 p-3 gap-2'>
      <div className='overflow-hidden relative flex flex-col flex-1 gap-3 mx-20'>
      <h1 className='text-center uppercase tracking-widest font-bold'>QUESTION FAQS</h1>

      <section className='grid grid-cols-1 gap-1 p-5'>
        {cards.map((item, index) => (
            <SingleQuestion item={item} key={index}/>
        ))}
      </section>
      </div>
      <div className='flex flex-1 mr-24 bg-blue-700 shadow-lg h-[15rem]' style={{borderRadius: '50% 10%'}}>
        <img src={question} className='text-3xl w-[40rem] h-[30rem] object-cover'></img>
      </div>
    </section>
    </>
  )
}

export default Questions
