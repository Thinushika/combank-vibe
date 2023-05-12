import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <>
    <section className="container-fluid p-0 m-0 navbar_background">
    <div className="d-flex flex-row">
      <div className="col-12 col-lg-10">
        <nav className="navbar navbar-expand-lg">

          <div className="container-fluid">
            <a className="navbar-brand m-0 p-0" href="./index.html">
              <Image src="/vibelogo.png" alt="logo"  className='header-logo-1' width={100} height={40} />
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="bi bi-list toggle-icon-styles" style={{color: "#fff !important"}}></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ms-auto justify-content-lg-end">
                <a className="nav-link px-4" aria-current="page" href="/">Home</a>
                <a className="nav-link px-4" href="/gallery">Gallery</a>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="col-12 col-lg-2 d-none d-lg-flex justify-content-center align-items-center">
        <a className="navbar-combank-brand m-0 p-0" href="./index.html">
          <Image src="/commlogo.png" alt="logo" className='header-logo-2' width={200} height={20} />
        </a>
      </div>
    </div>
  </section>
    </>
  )
}

export default Navbar