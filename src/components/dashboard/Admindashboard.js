import React, { Fragment } from 'react';
//import PropTypes from 'prop-types';
import Navbar from './Navbar';

const Admindashboard = (props) => {
  return (
    <Fragment>
      <Navbar />
      <h3 className='mt-3'>Памятка администратору</h3>
      <ul className='list-group mt-3'>
        <li className='list-group-item'>
          1. При удалении макета из списка макетов необходимо убедиться, что он
          не является элементом какого-либо заказа.
        </li>
        <li className='list-group-item'>
          2. Удаляя пользователя из списка пользователей, ты автоматически
          удаляешь также, все заказы, связанные с данным пользователем
        </li>
      </ul>
    </Fragment>
  );
};

//Admindashboard.propTypes = {};

export default Admindashboard;
