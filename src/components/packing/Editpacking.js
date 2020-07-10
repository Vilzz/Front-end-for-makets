import React, { useEffect, useState } from 'react';
import Navbar from '../dashboard/Navbar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPacking, editPacking, clearPacking } from '../../actions/packing';
import PropTypes from 'prop-types';

const Editpacking = ({
  getPacking,
  editPacking,
  clearPacking,
  loading,
  packing,
  match,
  history,
}) => {
  const { id } = match.params;
  const [packingData, setPackingData] = useState({
    name: '',
    description: '',
    addtoprice: '',
  });
  useEffect(() => {
    getPacking(id);
  }, [getPacking, id]);

  useEffect(() => {
    if (!loading && packing !== null) {
      setPackingData({
        ...packingData,
        name: packing.data.name,
        description: packing.data.description,
        addtoprice: packing.data.addtoprice,
      });
    }
    // eslint-disable-next-line
  }, [loading, packing]);

  const updatePacking = (e) => {
    e.preventDefault();
    editPacking(packingData, id, history);
  };

  const onChange = (e) => {
    setPackingData({
      ...packingData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='container component'>
      <div className='row'>
        <Navbar />
      </div>
      <div className='row'>
        <div className='col-12'>
          <h2>
            <i className='fas fa-luggage-cart mr-3'></i>Редактировать упаковку
          </h2>
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className='col-12 col-sm-8'>
          <form className='form' onSubmit={(e) => updatePacking(e)}>
            <div className='form-group'>
              <label htmlFor='packname'>Наименование упаковки</label>
              <input
                type='text'
                className='form-control'
                name='name'
                id='packname'
                onChange={(e) => onChange(e)}
                value={packingData.name}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Описание упаковки</label>
              <textarea
                type='text'
                className='form-control'
                name='description'
                id='description'
                onChange={(e) => onChange(e)}
                value={packingData.description}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='addtoprice'>Стоимость упаковки</label>
              <input
                type='text'
                className='form-control'
                name='addtoprice'
                id='addtoprice'
                onChange={(e) => onChange(e)}
                value={packingData.addtoprice}
              />
            </div>
            <div className='form-group'>
              <input
                type='submit'
                className='btn btn-sm btn-my-ocean mr-3'
                value='Изменить'
              />
              <Link
                to='/admindashboard/packing'
                className='btn btn-my-ocean btn-sm'
                onClick={() => clearPacking()}
              >
                Вернуться
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Editpacking.propTypes = {
  getPacking: PropTypes.func.isRequired,
  editPacking: PropTypes.func.isRequired,
  clearPacking: PropTypes.func.isRequired,
  packing: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  packing: state.packing.packing,
  loading: state.packing.loading,
});

export default connect(mapStateToProps, {
  editPacking,
  getPacking,
  clearPacking,
})(Editpacking);
