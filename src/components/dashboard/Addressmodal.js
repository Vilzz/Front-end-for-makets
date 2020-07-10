import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Addressmodal = ({ hideAddressModal, submitAddress, deliveryData }) => {
  const [addressData, setUserData] = useState({
    zipcode: '',
    country: '',
    region: '',
    city: '',
    street: '',
    housenumber: '',
    office: '',
  });
  useEffect(() => {
    if (deliveryData.address !== 'Адрес не указан') {
      const addressStr = deliveryData.address.split('|');
      setUserData({
        zipcode: addressStr[0] || '',
        country: addressStr[1] || '',
        region: addressStr[2] || '',
        city: addressStr[3] || '',
        street: addressStr[4] || '',
        housenumber: addressStr[5] || '',
        office: addressStr[6] || '',
      });
    }
  }, [deliveryData]);
  const modalClose = () => {
    hideAddressModal();
  };
  const onChange = (e) => {
    setUserData({
      ...addressData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    submitAddress(addressData);
    hideAddressModal();
  };
  return (
    <div className='modalbg'>
      <div className='addparamsmodal'>
        <div className='header-row mb-3'>
          <h4>Добавить адрес</h4>
          <i
            className='far fa-times-circle close'
            onClick={(e) => modalClose(e)}
          ></i>
        </div>
        <form className='from' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <label htmlFor='zipcode'>Индекс</label>
            <input
              type='text'
              id='zipcode'
              name='zipcode'
              className='form-control form-control-sm'
              value={addressData.zipcode}
              placeholder='Введи индекс'
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='country'>Страна</label>
            <input
              type='text'
              id='country'
              name='country'
              className='form-control form-control-sm'
              value={addressData.country}
              placeholder='Введи страну'
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='region'>Регион</label>
            <input
              type='text'
              id='region'
              name='region'
              className='form-control form-control-sm'
              value={addressData.region}
              placeholder='Введи название региона'
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='city'>Город</label>
            <input
              type='text'
              id='city'
              name='city'
              className='form-control form-control-sm'
              value={addressData.city}
              placeholder='Введи город'
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='street'>Улица</label>
            <input
              type='text'
              id='street'
              name='street'
              className='form-control form-control-sm'
              value={addressData.street}
              placeholder='Введи улицу'
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='housenumber'>Номер дома</label>
            <input
              type='text'
              id='housenumber'
              name='housenumber'
              className='form-control form-control-sm'
              value={addressData.housenumber}
              placeholder='Введи номер дома'
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='office'>Номер офиса/кв. </label>
            <input
              type='text'
              id='office'
              name='office'
              className='form-control form-control-sm'
              value={addressData.office}
              placeholder='Введи номер офиса'
              onChange={(e) => onChange(e)}
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

Addressmodal.propTypes = {
  hideAddressModal: PropTypes.func.isRequired,
  submitAddress: PropTypes.func.isRequired,
  deliveryData: PropTypes.object.isRequired,
};

export default Addressmodal;
