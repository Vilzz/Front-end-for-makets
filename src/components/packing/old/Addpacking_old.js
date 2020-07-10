import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { createPacking } from '../../actions/packing';
import Navbar from '../dashboard/Navbar';
import PropTypes from 'prop-types';
import Addparamsmodal from './Addparamsmodal';

const Addpacking = ({ createPacking, history }) => {
  const [showModal, setShowModal] = useState(false);
  const [packing, setPacking] = useState({
    name: '',
    description: '',
    params: [],
  });

  const pushParams = (prgroup) => {
    const { params } = packing;
    params.push(prgroup);
    setPacking({
      ...packing,
      params,
    });
    setShowModal(!showModal);
  };
  const delParams = (e) => {
    e.preventDefault();
    const removeInd = Number(e.target.attributes.data.value);
    const { params } = packing;
    const newparams = params.filter(
      (param) => params.indexOf(param) !== removeInd
    );
    setPacking({
      ...packing,
      params: newparams,
    });
  };
  const setName = (e) => {
    setPacking({
      ...packing,
      [e.target.name]: e.target.value,
    });
  };
  const addParams = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
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
      <div className='row justify-content-center'>
        <div className='col-12 col-sm-8'>
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
            <div className='form-row justify-content-between mt-3'>
              <div className='form-group col-6'>
                <h5>Параметры упаковки</h5>
              </div>
              <div className='form-group col-6'>
                <button
                  className='btn btn-sm btn-my-ocean'
                  onClick={(e) => addParams(e)}
                >
                  <i className='fas fa-plus mr-1'></i>Добавить параметры
                </button>
              </div>
            </div>
            {packing.params.length > 0 && (
              <Fragment>
                <table className='table'>
                  <thead className='thead-dark'>
                    <tr>
                      <th>Масштаб</th>
                      <th>Цена</th>
                      <th>Размер</th>
                      <th>Вес</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {packing.params.map((paramrow, idx) => (
                      <tr key={idx}>
                        <td>{paramrow.scale}</td>
                        <td>{paramrow.price}</td>
                        <td>{paramrow.size}</td>
                        <td>{paramrow.weight}</td>
                        <td>
                          <button
                            data={idx}
                            className='btn btn-sm btn-my-danger'
                            onClick={(e) => delParams(e)}
                          >
                            Удалить
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className='form-group'>
                  <input
                    type='submit'
                    className='btn btn-sm btn-my-ocean btn-block'
                    value='Сохранить'
                  />
                </div>
              </Fragment>
            )}
          </form>
        </div>
      </div>
      {showModal && (
        <Addparamsmodal addParams={addParams} pushParams={pushParams} />
      )}
    </div>
  );
};

Addpacking.propTypes = {
  createPacking: PropTypes.func.isRequired,
};

export default connect(null, { createPacking })(Addpacking);
