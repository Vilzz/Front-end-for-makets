import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Addparamsmodal = ({ addParams, pushParams }) => {
  const [paramsgr, setParamsGr] = useState({
    scale: '',
    price: '',
    size: '',
    weight: '',
  });
  const sendData = (e) => {
    e.preventDefault();
    pushParams(paramsgr);
  };
  const onChange = (e) => {
    setParamsGr({
      ...paramsgr,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className='modalbg'>
      <div className='addparamsmodal'>
        <div className='header-row mb-3'>
          <h4>Добавить параметры</h4>
          <i className='far fa-times-circle close' onClick={addParams}></i>
        </div>

        <form className='form' onSubmit={(e) => sendData(e)}>
          <div className='form-group'>
            <label htmlFor='scale'>Масштаб</label>
            <input
              type='text'
              name='scale'
              id='scale'
              required
              className='form-control'
              placeholder='Введи масштаб'
              value={paramsgr.scale}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='price'>Цена</label>
            <input
              type='text'
              name='price'
              id='price'
              required
              className='form-control'
              placeholder='Введи цену'
              value={paramsgr.price}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='size'>Размер ШхДхВ</label>
            <input
              type='text'
              name='size'
              id='size'
              required
              className='form-control'
              placeholder='Введи размер'
              value={paramsgr.size}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='weight'>Вес</label>
            <input
              type='text'
              name='weight'
              id='weight'
              required
              className='form-control'
              placeholder='Введи вес'
              value={paramsgr.weight}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className='form-row'>
            <div className='form-group col-6'>
              <input
                type='submit'
                className='btn btn-sm btn-my-ocean btn-block'
                value='Добавить'
              />
            </div>
            <div className='form-group col-6'>
              <input
                type='button'
                className='btn btn-my-sm btn-my-danger btn-block'
                value='Закрыть'
                onClick={addParams}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

Addparamsmodal.propTypes = {
  pushParams: PropTypes.func.isRequired,
  addParams: PropTypes.func.isRequired,
};

export default Addparamsmodal;
