import React from 'react'

const NavBar = () => {
  return (
    <nav className='nav-bar'>
      {/* Left side */}
      <div className='row'>
        <div className='user'>
          <picture>
            <img src="/User.jpg" alt="User" />
          </picture>
        </div>
        <div className='column'>
          <h5>John Andre</h5>
          <p>Starfjord AS</p>
        </div>
      </div>

      {/* Right side */}
     <div className="language-selector">
  <p>Norsk Bokmal</p>
  <div className='flag'>
    <picture>
      <img src="/image.png" alt="Flag" />
    </picture>
  </div>
</div>

    </nav>
  )
}

export default NavBar
