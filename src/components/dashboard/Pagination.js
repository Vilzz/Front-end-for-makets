import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ pagesData, changeActive }) => {
  const { pages, active } = pagesData;

  const pageItems = () => {
    const items = [];
    for (let i = 1; i <= pages; i++) {
      items.push(
        <li className={i === active ? 'page-item active' : 'page-item'} key={i}>
          <button className='page-link' onClick={(e) => onClick(e)} value={i}>
            {i}
          </button>
        </li>
      );
    }
    return items;
  };

  const onClick = (e) => {
    changeActive(Number(e.target.value));
  };

  const leftArrowClick = () => {
    if (active > 1) {
      changeActive(active - 1);
    }
  };
  const rightArrowClick = () => {
    if (active < pages) {
      changeActive(active + 1);
    }
  };
  return (
    <nav>
      <ul className='pagination'>
        <li className='page-item'>
          <button className='page-link' onClick={() => leftArrowClick()}>
            <i className='fas fa-angle-double-left'></i>
          </button>
        </li>
        {pageItems()}
        <li className='page-item'>
          <button className='page-link' onClick={() => rightArrowClick()}>
            <i className='fas fa-angle-double-right'></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  pagesData: PropTypes.object.isRequired,
  changeActive: PropTypes.func.isRequired,
};

export default Pagination;
