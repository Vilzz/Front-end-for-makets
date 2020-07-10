import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Orderpanel = ({ setPanelOff }) => {
  useEffect(() => {
    AOS.init({
      offset: 500,
      duration: 500,
    });
  }, []);
  return (
    <div className='mymodal'>
      <form
        className='orderform'
        data-aos='zoom-in'
        data-aos-easing='ease-in-out'
      >
        <div className='form-row'>
          <div className='col-lg-6 col-sm-12'>
            <input
              type='text'
              className='form-control'
              placeholder='Ваше имя'
            />
          </div>
          <div className='col-lg-6 col-sm-12'>
            <input
              type='email'
              className='form-control'
              placeholder='Электронная почта'
            />
          </div>
        </div>
        <div className='form-row mt-3'>
          <div className='col-lg-4 col-sm-12'>
            <input type='text' className='form-control' placeholder='Масштаб' />
          </div>
          <div className='col-lg-4 col-sm-12'>
            <input
              type='text'
              className='form-control'
              placeholder='Количество'
            />
          </div>
          <div className='col-lg-4 col-sm-12'>
            <input
              type='text'
              className='form-control'
              placeholder='Номер телефона'
            />
          </div>
          <input
            type='submit'
            className='btn btn-my-ocean mt-3 mr-3'
            value='Отправить запрос'
          />
          <input
            type='button'
            className='btn btn-my-ocean mt-3'
            value='Назад'
            onClick={setPanelOff}
          />
        </div>
      </form>
    </div>
  );
};

export default Orderpanel;
