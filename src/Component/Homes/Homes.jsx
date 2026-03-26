import React from 'react'
import Header from './Navbar'
import Hero from './Hero'
import Topics from './Topics'
import History from './History'
import AboutUs from './about'
import ContactUs from './contact'
import WriteContent from './WriteContent'
import Logo from './Logo'

export default function Homes() {
  return (
    <div>
      <Hero />
      <div className='sandBg'>
        <Topics />
        <History />
        <AboutUs />
        <ContactUs />
        <div className="mb-md-5">
          <Logo />
        </div>
        <WriteContent />
      </div>

    </div>
  )
}
