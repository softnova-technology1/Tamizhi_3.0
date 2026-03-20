import React from 'react'
import Header from '../Home/Navbar'
import Hero from './Hero'
import Topics from './Topics'
import History from './History'

export default function Homes() {
  return (
    <div>
      <Header />
      <Hero />
      <div className='sandBg'>
        <Topics />
        <History />
      </div>

    </div>
  )
}
 