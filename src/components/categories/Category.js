import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { deleteCategory } from '../../actions/category';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Category = ({ categories, deleteCategory }) => {
  const delItem = (e) => {
    deleteCategory(e.target.attributes.data.value);
  };

  return (
    <div>
      <Fragment>
        <ul className='list-group list-group-horizontal ctglist'>
          <li className='list-group-item bg-mydark'>Наименование</li>
          <li className='list-group-item bg-mydark'>Описание</li>
          <li className='list-group-item bg-mydark'>Показать на главной</li>
          <li className='list-group-item bg-mydark'>Управление</li>
        </ul>
        {categories.data.map((category) => (
          <ul
            className='list-group list-group-horizontal ctglist'
            key={category._id}
          >
            <li className='list-group-item'>{category.categoryname}</li>
            <li className='list-group-item'>{category.description}</li>
            <li className='list-group-item'>
              {category.showonmain ? 'Показать' : 'Скрыть'}
            </li>
            <li className='list-group-item'>
              <Link
                to={`/admindashboard/updatecategory/${category._id}`}
                className='btn btn-sm btn-my-ocean mr-2'
              >
                изм
              </Link>
              <button
                data={category._id}
                className='btn btn-sm btn-my-danger'
                onClick={(e) => delItem(e)}
              >
                удл
              </button>
            </li>
          </ul>
        ))}
      </Fragment>
    </div>
  );
};

Category.propTypes = {
  deleteCategory: PropTypes.func.isRequired,
  categories: PropTypes.object,
  loading: PropTypes.bool,
};

export default connect(null, { deleteCategory })(Category);
