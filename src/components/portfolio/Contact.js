import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getContact } from '../../actions/contact';
import PropTypes from 'prop-types';

const Contact = ({ contactLoading, contact, getContact }) => {
  const [compData, setCompData] = useState({});
  useEffect(() => {
    getContact('5eec9a4769492525b16e0288');
  }, [getContact]);
  useEffect(() => {
    !contactLoading &&
      contact !== null &&
      setCompData({
        ...contact.data,
      });
  }, [contactLoading, contact]);
  return (
    <div className='component container contactcontainer'>
      <div className='row'>
        <div className='col-12'>
          <h2>
            <i className='fas fa-info-circle mr-1'></i> Информация о
            производителе
          </h2>
        </div>
      </div>
      <hr />
      <div className='row'>
        <div className='col-12'>
          <a href='/' className='navbar-brand'>
            <h3>
              RedHand
              <i className='fas fa-hand-paper logohand'></i>
            </h3>
          </a>
        </div>
        <div className='col-12'>
          <h4>
            <i className='far fa-flag mr-3'></i> {compData.company}{' '}
          </h4>
        </div>
        <div className='col-12'>
          <h4>
            <i className='fas fa-phone-volume mr-3'></i>Контактный номер:{' '}
            {compData.companyphone}
          </h4>
        </div>
        <div className='col-12'>
          <h4>
            <i className='fas fa-map-marked-alt mr-3'></i> Адрес:{' '}
            {compData.companyaddress}
          </h4>
        </div>
        <div className='col-12'>
          <h4>
            <i className='far fa-envelope mr-3'></i>E-mail:{' '}
            {compData.companyemail}
          </h4>
        </div>
        <div className='col-12'>
          <h4>
            <i className='fab fa-instagram mr-3'></i> Instagram :{' '}
            <a href={compData.companyinstagram}>RedHand</a>
          </h4>
        </div>
      </div>
    </div>
  );
};

Contact.propTypes = {
  getContact: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  contact: state.contact.contact,
  contactLoading: state.contact.loading,
});
export default connect(mapStateToProps, { getContact })(Contact);
