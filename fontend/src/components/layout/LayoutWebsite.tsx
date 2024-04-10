import React from 'react'
import Header from '../Header'
import Banner from '../Banner'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'

const LayoutWebsite = () => {
  return (
    <div>
        <Header />
        <Banner />
        <Outlet />
        <Footer />
    </div>
  )
}

export default LayoutWebsite