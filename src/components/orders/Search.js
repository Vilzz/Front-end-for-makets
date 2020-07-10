import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ onSearch }) => {
  const onChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className='input-group input-group-sm search'>
      <div className='input-group-prepend'>
        <span className='input-group-text'>Найти</span>
      </div>
      <input
        type='text'
        className='form-control'
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Search;
