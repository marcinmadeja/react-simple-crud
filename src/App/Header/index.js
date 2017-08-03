import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Header = () => {
  return (
    <header className="l-header">
      <div className="container">
        <nav className="l-nav">
          <ul className="l-nav__list">
            <li className="l-nav__item">
              <Link to="/" className="l-nav__link">Home</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
