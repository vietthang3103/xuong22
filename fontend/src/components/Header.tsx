import React from 'react'

const Header = () => {
  return (
    <header className="header">
  <div className="container">
    <div className="header-inner">
      <a className="header__logo">
        <img src="./assets/logo.svg" />
      </a>
      <div className="button-mobile"><button>=</button></div>
      <nav className="main-menu">
        <ul className="main-menu__list">
          <li className="main-menu__item">
            <a className="main-menu__link">Home</a>
          </li>
          <li className="main-menu__item">
            <a href="./show.html" className="main-menu__link">Shop</a>
          </li>
          <li className="main-menu__item">
            <a className="main-menu__link">About</a>
          </li>
          <li className="main-menu__item">
            <a href="./thanhtoan.html" className="main-menu__link">Contact</a>
          </li>
        </ul>
      </nav>
      <div className="header-items">
        <div className="header-item-user">
          <span><img src="./assets/icons/1.svg" /></span>
        </div>
        <div className="header-item-user">
          <span><img src="./assets/icons/2.svg" /></span>
        </div>
        <div className="header-item-user">
          <span><img src="./assets/icons/3.svg" /></span>
        </div>
        <div className="header-item-user">
          <span>
            <a href="./chitiet.html">
              <img src="./assets/icons/4.svg" />
            </a>
          </span>
        </div>
      </div>
    </div>
  </div>
</header>

  )
}

export default Header