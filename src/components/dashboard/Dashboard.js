import React, { Fragment, useState, useEffect } from 'react';
import Usernavbar from './Usernavbar';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { updateUserAddress, updatePhone } from '../../actions/auth';
import './Dashboard.scss';
import PropTypes from 'prop-types';
import Addressmodal from './Addressmodal';
import Phonemodal from './Phonemodal';

const Dashboard = ({ user, loading, updateUserAddress, updatePhone }) => {
  const [userId, setuserId] = useState('');
  const [deliveryData, setDeliveryData] = useState({
    phone: '',
    address: '',
  });
  useEffect(() => {
    setuserId(!loading && !user !== null ? user.data._id : '');
    setDeliveryData({
      phone: !loading && !user !== null ? user.data.phone : '',
      address: !loading && !user !== null ? user.data.address : '',
    });
    // eslint-disable-next-line
  }, [loading, user]);

  const [addressModal, setAddressModal] = useState(false);
  const [phoneModal, setPhoneModal] = useState(false);

  const showAddressModal = () => {
    setAddressModal(true);
  };
  const hideAddressModal = () => {
    setAddressModal(false);
  };
  const showPhoneModal = () => {
    setPhoneModal(true);
  };
  const hidePhoneModal = () => {
    setPhoneModal(false);
  };

  const submitAddress = (address) => {
    const {
      zipcode,
      country,
      region,
      city,
      street,
      housenumber,
      office,
    } = address;
    let fulladdress;
    if (
      zipcode === '' &&
      country === '' &&
      region === '' &&
      city === '' &&
      street === '' &&
      housenumber === '' &&
      office === ''
    ) {
      fulladdress = 'Адрес не указан';
    } else {
      fulladdress = `${zipcode}|${country}|${region}|${city}|${street}|${housenumber}|${office}`;
    }

    updateUserAddress(userId, fulladdress);
  };

  const submitPhone = (phone) => {
    updatePhone(userId, phone);
  };

  return (
    <div className='container component'>
      <div className='row usernav'>
        <Usernavbar />
      </div>
      <div className='row'>
        <h2>
          <i className='far fa-address-card mr-3'></i>Учетные данные
          пользователя
        </h2>
      </div>

      <div className='row'>
        <div className='col-sm-12 col-lg-8 profiledata'>
          {!loading && user !== null ? (
            <Fragment>
              <div className='group-item'>
                <h6>
                  Логин:
                  <small className='text-muted'>{user.data.name}</small>
                </h6>
              </div>
              <div className='group-item'>
                <h6>
                  Электронная почта:
                  <small className='text-muted'>{user.data.email}</small>
                </h6>
              </div>
              <div className='group-item'>
                <h6>
                  Телефон:
                  <small className='text-muted'>
                    {user.data.phone === '+70000000000'
                      ? 'Номер не указан'
                      : user.data.phone}
                  </small>
                </h6>
              </div>
              <div className='group-item'>
                <h6>
                  Адрес доставки:
                  <small className='text-muted'>
                    {user.data.address.split('|').join(' ')}
                  </small>
                </h6>
              </div>
              <div className='group-item'>
                <h6>
                  Дата регистрации:
                  <small className='text-muted'>
                    <Moment locale='ru' format='lll'>
                      {user.data.createdAt}
                    </Moment>
                  </small>
                </h6>
              </div>
              <button
                className='btn btn-my-ocean mt-4 mr-4'
                onClick={() => showAddressModal()}
              >
                Изменить адрес доставки
              </button>
              <button
                className='btn btn-my-ocean mt-4'
                onClick={() => showPhoneModal()}
              >
                Изменить контактный номер
              </button>
            </Fragment>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
      {addressModal && (
        <Addressmodal
          hideAddressModal={hideAddressModal}
          submitAddress={submitAddress}
          deliveryData={deliveryData}
        />
      )}
      {phoneModal && (
        <Phonemodal
          hidePhoneModal={hidePhoneModal}
          submitPhone={submitPhone}
          phoneNumber={deliveryData.phone}
        />
      )}
    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  updateUserAddress: PropTypes.func.isRequired,
  updatePhone: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
});
export default connect(mapStateToProps, { updateUserAddress, updatePhone })(
  Dashboard
);
