import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PropTypes from 'prop-types';

const Portfoliomenu = ({ menu, getItems }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  const onClick = (e) => {
    e.preventDefault();
    getItems(e);
  };

  return (
    <div className='container portfolio'>
      <ul className='list-group'>
        {menu.map((menuItem, ind) => {
          return (
            <li key={menuItem.id}>
              <button
                onClick={(e) => onClick(e)}
                data={menuItem.id}
                style={{ width: 800 / menu.length }}
                className='list-group-item flex-fill'
                data-aos='zoom-in-down'
                data-aos-delay={50 + ind * 100}
                data-aos-easing='ease-in-out'
                value={menuItem.ctgname}
              >
                {menuItem.ctgname}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Portfoliomenu.propTypes = {
  menu: PropTypes.array,
  getItems: PropTypes.func,
};

export default Portfoliomenu;
