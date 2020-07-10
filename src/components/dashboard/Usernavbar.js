import React from 'react';
import { Link } from 'react-router-dom';

const Usernavbar = () => {
  return (
    <nav>
      <div className='links'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <Link to='/dashboard'>
              <i className='far fa-address-card'></i> Профиль
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/dashboard/orderhistory'>
              <i className='fas fa-shopping-basket'></i> История заказов
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Usernavbar;
