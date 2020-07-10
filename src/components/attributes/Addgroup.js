import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addAttrGroup } from '../../actions/attributes';
import PropTypes from 'prop-types';

const Addgroup = ({ attrid, showModalClick, addAttrGroup }) => {
  const [formData, setFormData] = useState({
    scalesize: '',
    price: '',
    w_netto: '',
    w_bruto: '',
    height: '',
    instock: '',
    minprodtime: '',
  });
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addAttrGroup(attrid, formData);
    setModal();
  };
  const setModal = () => {
    showModalClick();
  };
  return (
    <div className='addgroupmodal'>
      <div className='formbg'>
        <div className='header-row'>
          <h4>Добавить параметры</h4>
          <i
            className='far fa-times-circle close'
            onClick={() => setModal()}
          ></i>
        </div>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <label htmlFor='scalesize'>Масштаб изделия</label>
            <input
              type='text'
              id='scalesize'
              name='scalesize'
              className='form-control form-control-sm'
              placeholder='Введите масштаб изделия'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='price'>Цена изделия</label>
            <input
              type='text'
              id='price'
              name='price'
              className='form-control form-control-sm'
              placeholder='Введите цену изделия'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='w_netto'>Вес нетто</label>
            <input
              type='text'
              id='w_netto'
              name='w_netto'
              className='form-control form-control-sm'
              placeholder='Введите нетто вес изделия'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='w_bruto'>Вес бруто</label>
            <input
              type='text'
              id='w_bruto'
              name='w_bruto'
              className='form-control form-control-sm'
              placeholder='Введите бруто вес изделия'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='height'>Размер изделия</label>
            <input
              type='text'
              id='height'
              name='height'
              className='form-control form-control-sm'
              placeholder='Введите размер изделия'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='instock'>Остаток на складе</label>
            <input
              type='text'
              id='instock'
              name='instock'
              className='form-control form-control-sm'
              placeholder='Введите остаток изделий'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='minprodtime'>Минимальный срок производства</label>
            <input
              type='text'
              id='minprodtime'
              name='minprodtime'
              className='form-control form-control-sm'
              placeholder='Введите срок производства'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='submit'
              className='btn btn-my-ocean btn-sm mr-3'
              value='Сохранить'
            />
            <input
              type='button'
              className='btn btn-my-ocean btn-sm'
              onClick={() => setModal()}
              value='Закрыть'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

Addgroup.propTypes = {
  showModalClick: PropTypes.func.isRequired,
  addAttrGroup: PropTypes.func.isRequired,
  attrid: PropTypes.string.isRequired,
};

export default connect(null, { addAttrGroup })(Addgroup);
