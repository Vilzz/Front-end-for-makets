import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getContact, updateContact } from '../../actions/contact';
import Navbar from './Navbar';
import PropTypes from 'prop-types';

const Contactedit = ({
  contactLoading,
  contact,
  getContact,
  updateContact,
}) => {
  useEffect(() => {
    getContact('5eec9a4769492525b16e0288');
  }, [getContact]);

  const [contactData, setContactData] = useState({
    company: '',
    companyaddress: '',
    companyemail: '',
    companyinstagram: '',
    companyphone: '',
  });

  useEffect(() => {
    setContactData({
      company: !contactLoading && contact !== null ? contact.data.company : '',
      companyaddress:
        !contactLoading && contact !== null ? contact.data.companyaddress : '',
      companyemail:
        !contactLoading && contact !== null ? contact.data.companyemail : '',
      companyphone:
        !contactLoading && contact !== null ? contact.data.companyphone : '',
      companyinstagram:
        !contactLoading && contact !== null
          ? contact.data.companyinstagram
          : '',
    });
  }, [contact, contactLoading]);

  const onChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateContact(contactData, '5eec9a4769492525b16e0288');
  };

  return (
    <div className='component container'>
      <div className='row'>
        <Navbar />
      </div>
      <div className='row'>
        <div className='col-12'>
          <h2>
            <i className='far fa-edit mr-1'></i>
            <i className='fas fa-info-circle mr-1'></i> Изменить информацию о
            производителе
          </h2>
        </div>
      </div>
      <hr />
      <div className='row'>
        <div className='col-12'>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <label htmlFor='company'>Название</label>
              <input
                type='text'
                className='form-control form-control-sm'
                id='company'
                name='company'
                value={contactData.company}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='companyaddress'>Адрес</label>
              <input
                type='text'
                className='form-control form-control-sm'
                id='companyaddress'
                name='companyaddress'
                value={contactData.companyaddress}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='companyemail'>Эл. почта</label>
              <input
                type='text'
                className='form-control form-control-sm'
                id='companyemail'
                name='companyemail'
                value={contactData.companyemail}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='companyphone'>Телефон</label>
              <input
                type='text'
                className='form-control form-control-sm'
                id='companyphone'
                name='companyphone'
                value={contactData.companyphone}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='companyinstagram'>Инстаграм</label>
              <input
                type='text'
                className='form-control form-control-sm'
                id='companyinstagram'
                name='companyinstagram'
                value={contactData.companyinstagram}
                onChange={(e) => onChange(e)}
              />
            </div>
            <button type='submit' className='btn btn-my-ocean mr-2'>
              Сохранить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Contactedit.propTypes = {
  getContact: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  contactLoading: state.contact.loading,
  contact: state.contact.contact,
});
export default connect(mapStateToProps, { getContact, updateContact })(
  Contactedit
);
