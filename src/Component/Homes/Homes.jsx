import React from 'react'
import Header from '../Home/Navbar'
import Hero from './Hero'
import Topics from './Topics'
import History from './History'
import AboutUs from './about'
import ContactUs from './contact'
import WriteContent from './WriteContent'

export default function Homes() {
  return (
    <div>
      <Header />
      <Hero />
      <div className='sandBg'>
        <Topics />
        <History />
        <AboutUs />
        <ContactUs />
        <WriteContent/>
      </div>

    </div>
  )
}
