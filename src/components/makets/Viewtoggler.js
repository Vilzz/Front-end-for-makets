import React from 'react';
import PropTypes from 'prop-types';

const Viewtoggler = ({ viewToggle }) => {
  const setView = (e) => {
    e.preventDefault();
    viewToggle(e.target.parentNode.name);
  };

  return (
    <div className='viewtoggle'>
      <div className='cardview'>
        <div className='popup'>таблица</div>
        <a
          href='#!'
          name='table'
          className='btn btn-sm'
          onClick={(e) => setView(e)}
        >
          <i className='far fa-list-alt'></i>
        </a>
      </div>
      <div className='tableview'>
        <div className='popup'>карточки</div>
        <a
          href='#!'
          name='cards'
          className='btn btn-sm'
          onClick={(e) => setView(e)}
        >
          <i className='fas fa-table'></i>
        </a>
      </div>
    </div>
  );
};

Viewtoggler.propTypes = {
  viewToggle: PropTypes.func.isRequired,
};

export default Viewtoggler;
