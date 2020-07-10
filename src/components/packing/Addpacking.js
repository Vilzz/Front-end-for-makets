import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPacking } from '../../actions/packing';
import Navbar from '../dashboard/Navbar';
import PropTypes from 'prop-types';

const Addpacking = ({ createPacking, history }) => {
  const [packing, setPacking] = useState({
    name: '',
    description: '',
    addtoprice: '',
  });

  const setName = (e) => {
    setPacking({
      ...packing,
      [e.target.name]: e.target.value,
    });
  };

  const packSubmit = (e) => {
    e.preventDefault();
    createPacking(packing, history);
  };

  return (
    <div className='container component'>
      <div className='row'>
        <Navbar />
      </div>
      <div className='row'>
        <div className='col-sm-12'>
          <h2>
            <i className='fas fa-plus mr-3'></i>
            <i className='fas fa-luggage-cart mr-3'></i>Добавить упаковку
          </h2>
          <hr />
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-12'>
          <form className='form' onSubmit={(e) => packSubmit(e)}>
            <div className='form-group'>
              <label htmlFor='packname'>Наименование упаковки</label>
              <input
                type='text'
                className='form-control'
                name='name'
                id='packname'
                placeholder='Введи наименование'
                onChange={(e) => setName(e)}
                value={packing.name}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Описание упаковки</label>
              <textarea
                type='text'
                className='form-control'
                name='description'
                id='description'
                placeholder='Введи описание'
                onChange={(e) => setName(e)}
                value={packing.description}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='addtoprice'>Стоимость упаковки</label>
              <input
                type='text'
                className='form-control'
                name='addtoprice'
                id='addtoprice'
                placeholder='Введи цену упаковки'
                onChange={(e) => setName(e)}
                value={packing.addtoprice}
              />
            </div>
            <div className='form-group'>
              <input
                type='submit'
                className='btn btn-my-ocean mr-3'
                value='Сохранить'
              />
              <Link to={'/admindashboard/packing'} className='btn btn-my-ocean'>
                Вернуться
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Addpacking.propTypes = {
  createPacking: PropTypes.func.isRequired,
};

export default connect(null, { createPacking })(Addpacking);
