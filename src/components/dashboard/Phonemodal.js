import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Phonemodal = ({ hidePhoneModal, submitPhone, phoneNumber }) => {
  const [phoneData, setPhoneData] = useState({
    phone: '',
  });
  useEffect(() => {
    if (phoneNumber !== '+70000000000') {
      setPhoneData({
        phone: phoneNumber,
      });
    }
  }, [phoneNumber]);
  const modalClose = () => {
    hidePhoneModal();
  };
  const onChange = (e) => {
    setPhoneData({
      phone: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    submitPhone(phoneData);
    hidePhoneModal();
  };
  return (
    <div className='modalbg'>
      <div className='addparamsmodal'>
        <div className='header-row mb-3'>
          <h4>Добавить/Изменить номер</h4>
          <i
            className='far fa-times-circle close'
            onClick={(e) => modalClose(e)}
          ></i>
        </div>
        <form className='from' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <label htmlFor='phone'>
              Контактный номер телефона
              <br /> (образец: +71110001122, 89271113344)
            </label>
            <input
              type='text'
              id='phone'
              name='phone'
              className='form-control mt-1 mb-3'
              value={phoneData.phone}
              placeholder='Введи номер телефона'
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              className='btn btn-my-ocean btn-sm mr-3'
              type='submit'
              value='Сохранить'
            />
            <input
              type='button'
              className='btn btn-my-danger btn-sm'
              value='Закрыть'
              onClick={() => modalClose()}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

Phonemodal.propTypes = {
  hidePhoneModal: PropTypes.func.isRequired,
};

export default Phonemodal;
