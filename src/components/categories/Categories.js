import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Categories.scss';
import Navbar from '../dashboard/Navbar';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/category';
import Category from './Category';
import PropTypes from 'prop-types';

const Categories = ({ loading, categories, getCategories }) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);
  return (
    <div className='container component'>
      <div className='row'>
        <Navbar />
      </div>

      <div className='row'>
        <div className='col-sm-12 col-lg-6'>
          <h2>
            <i className='fas fa-th-list mr-3'></i> Список Категорий
          </h2>
        </div>
        <div className='col-sm-12 col-lg-6 flexhelper'>
          <Link
            to={'/admindashboard/addcategory'}
            className='btn btn-my-ocean mr-5'
          >
            <i className='fas fa-folder-plus mr-2'></i> Добавить
          </Link>
        </div>
      </div>
      <hr />
      {!loading && categories !== null ? (
        <Category categories={categories} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

Categories.propTypes = {
  getCategories: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  loading: state.categories.loading,
});

export default connect(mapStateToProps, { getCategories })(Categories);
