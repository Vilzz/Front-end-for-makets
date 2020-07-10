import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../dashboard/Navbar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createCategory } from '../../actions/category';

const Addcategory = ({ createCategory, history }) => {
  const [categoryData, setCategoryData] = useState({
    categoryname: '',
    description: '',
    showonmain: false,
  });
  const { categoryname, description, showonmain } = categoryData;
  const onSubmit = (e) => {
    e.preventDefault();
    createCategory(categoryData, history);
  };
  const onChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };
  const checkBoxToggle = () => {
    setCategoryData({ ...categoryData, showonmain: !showonmain });
  };
  return (
    <div className='container component'>
      <div className='row'>
        <Navbar />
      </div>
      <div className='row'>
        <div className='col-sm-12'>
          <h2>
            <i className='fas fa-folder-plus mr-3'></i>Добавить категорию
          </h2>
          <hr />
        </div>
      </div>

      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            className='form-control form-control-sm'
            type='text'
            name='categoryname'
            placeholder='Наименование категории'
            value={categoryname}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <textarea
            className='form-control form-control-sm'
            type='text'
            name='description'
            placeholder='Описание категории'
            value={description}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group form-check'>
          <input
            type='checkbox'
            className='form-check-input'
            name='showonmain'
            checked={showonmain}
            onChange={() => checkBoxToggle()}
          />

          <label className='form-check-label'>Показывать на главной</label>
        </div>
        <button type='submit' className='btn btn-my-ocean mr-2'>
          Добавить
        </button>
        <Link to={'/admindashboard/getcategories'} className='btn btn-my-ocean'>
          Вернуться
        </Link>
      </form>
    </div>
  );
};

Addcategory.propTypes = {
  createCategory: PropTypes.func.isRequired,
};

export default connect(null, { createCategory })(Addcategory);
