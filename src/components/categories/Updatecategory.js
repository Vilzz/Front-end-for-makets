import React, { useEffect, useState } from 'react';
import Navbar from '../dashboard/Navbar';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  updateCategory,
  getCategoryByID,
  clearCategory,
} from '../../actions/category';
import PropTypes from 'prop-types';

const Updatecategory = ({
  match,
  updateCategory,
  getCategoryByID,
  clearCategory,
  category,
  loading,
  history,
}) => {
  const [categoryData, setCategorydata] = useState({
    id: '',
    categoryname: '',
    description: '',
    showonmain: '',
  });
  useEffect(() => {
    getCategoryByID(match.params.id);
  }, [getCategoryByID, match.params.id]);
  useEffect(() => {
    setCategorydata({
      id: !loading && category !== null ? category.data._id : '',
      categoryname:
        !loading && category !== null ? category.data.categoryname : '',
      description:
        !loading && category !== null ? category.data.description : '',
      showonmain: !loading && category !== null ? category.data.showonmain : '',
    });
  }, [loading, category]);

  const { id, categoryname, description, showonmain } = categoryData;

  const onChange = (e) => {
    setCategorydata({ ...categoryData, [e.target.name]: e.target.value });
  };

  const checkBoxToggle = () => {
    setCategorydata({ ...categoryData, showonmain: !showonmain });
  };

  const clickBack = (e) => {
    setCategorydata({
      id: '',
      categoryname: '',
      description: '',
      showonmain: '',
    });
    clearCategory();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateCategory(categoryData, id, history);
  };

  return (
    <div className='container component'>
      <div className='row'>
        <Navbar />
      </div>
      <div className='row'>
        <div className='col-sm-12'>
          <h2>
            <i className='fas fa-folder-plus mr-3'></i>Редактировать категорию
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
            value={categoryname}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <textarea
            className='form-control form-control-sm'
            type='text'
            name='description'
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
          Сохранить
        </button>
        <Link
          to={'/admindashboard/getcategories'}
          className='btn btn-my-ocean'
          onClick={(e) => clickBack(e)}
        >
          Вернуться
        </Link>
      </form>
    </div>
  );
};

Updatecategory.propTypes = {
  updateCategory: PropTypes.func.isRequired,
  getCategoryByID: PropTypes.func.isRequired,
  clearCategory: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  category: state.categories.category,
  loading: state.categories.loading,
});

export default connect(mapStateToProps, {
  updateCategory,
  getCategoryByID,
  clearCategory,
})(withRouter(Updatecategory));
