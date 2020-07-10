import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const Filter = ({ list, filterOn, filterOff }) => {
  const [filter, setFilter] = useState({
    applyed: false,
    ctg: '0',
  });

  const setFilterState = (e) => {
    setFilter({ ctg: e.target.value, applyed: true });
  };

  const setOnFilter = (e) => {
    e.preventDefault();
    filterOn(filter.ctg);
  };

  const clearFilter = (e) => {
    e.preventDefault();
    setFilter({ ctg: '0', applyed: false });
    filterOff();
  };

  return (
    <form className='form' onSubmit={(e) => setOnFilter(e)}>
      <div className='input-group'>
        <div className='input-group-append'>
          <select
            type='text'
            name='ctg'
            onChange={(e) => setFilterState(e)}
            className='form-control form-control-sm'
            value={filter.ctg}
          >
            {filter.applyed ? (
              <option value='0' disabled>
                *Фильтровать по категории
              </option>
            ) : (
              <option value='0'>*Фильтровать по категории</option>
            )}
            {list.map((opt) => (
              <option value={opt.catid} key={opt.catid}>
                {opt.catname}
              </option>
            ))}
          </select>
          {!filter.applyed ? (
            <button className='btn btn-sm btn-my-ocean' type='button' disabled>
              Применить
            </button>
          ) : (
            <Fragment>
              <button className='btn btn-sm btn-my-ocean' type='submit'>
                Применить
              </button>
              <button
                onClick={(e) => clearFilter(e)}
                className='btn btn-sm btn-my-danger'
                type='button'
              >
                Очистить
              </button>
            </Fragment>
          )}
        </div>
      </div>
    </form>
  );
};

Filter.propTypes = {
  list: PropTypes.array.isRequired,
  filterOn: PropTypes.func.isRequired,
  filterOff: PropTypes.func.isRequired,
};

export default Filter;
