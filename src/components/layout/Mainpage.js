import React from 'react';
import './Mainpage.scss';
//import Alert from '../layout/Alert';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';

//import PropTypes from 'prop-types';

const Mainpage = ({ setAlert }) => {
  return (
    <section className='mainpage'>
      {/* <Alert /> */}
      <div className='mainpageoverlay'>
        <div className='mainpageinner'>
          {/* {setAlert('Какой-то Алерт', 'danger', 2000)} */}
          <div className='onmain'>
            <h1 className='xl-large'>Макетная студия</h1>
            <p className='lead'>
              Производство коллекционных моделей космических аппаратов,
              ракета-носителей, авиационной техники, двигателей летательных
              аппаратов.
            </p>
            <div className='buttons'>
              <Link to='/login' className='btn btn-sm btn-my-teal'>
                Вход
              </Link>
              <Link to='/register' className='btn btn-sm btn-my-teal'>
                Регистрация
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

//Mainpage.propTypes = {};

export default connect(null, { setAlert })(Mainpage);
