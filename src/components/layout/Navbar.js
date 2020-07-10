import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import {
  basketCount,
  deleteBasketOnLogout,
  clearBasket,
} from '../../actions/basket';
import { clearMaket, clearMakets } from '../../actions/makets';
import { clearCategories } from '../../actions/category';
import { clearOrders } from '../../actions/orders';
import PropTypes from 'prop-types';

const Navbar = ({
  auth: { isAuthenticated, loading, user },
  basket,
  basketLoading,
  logout,
  basketCount,
  deleteBasketOnLogout,
  clearBasket,
  clearMaket,
  clearMakets,
  clearCategories,
  clearOrders,
}) => {
  const [basketState, setBasketState] = useState({
    showBasket: false,
    basketItems: '',
    basketId: '',
  });
  useEffect(() => {
    const basketid =
      !loading && user !== null && user.data.basketid ? user.data.basketid : '';

    if (basketid !== '') {
      setBasketState({
        ...basketState,
        basketId: basketid,
      });

      basketCount(basketid);
    }
    // eslint-disable-next-line
  }, [basketCount, loading, user]);

  useEffect(() => {
    setBasketState({
      ...basketState,
      basketItems: !basketLoading && basket !== null ? basket.data : '',
      showBasket:
        !basketLoading && basket !== null && basket.data > 0 ? true : false,
    });
    // eslint-disable-next-line
  }, [basket, basketLoading]);

  const logoutClick = async () => {
    if (basketState.basketId !== '') {
      await deleteBasketOnLogout(basketState.basketId);
    }
    setBasketState({
      showBasket: false,
      basketItems: '',
      basketId: '',
    });
    clearBasket();
    clearMaket();
    clearMakets();
    clearCategories();
    clearOrders();
    logout();
  };

  const toBasketClick = () => {
    clearMaket();
  };

  const authLinks = (
    <ul className='navbar-nav'>
      <li className='nav-item'>
        <Link className='nav-link' to='/portfolio'>
          <i className='fas fa-satellite mr-1'></i>
          <span> Портфолио</span>
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/contacts'>
          <i className='fas fa-info-circle mr-1'></i>
          <span> О нас</span>
        </Link>
      </li>

      {!loading && user !== null && user.data.role === 'user' ? (
        <Fragment>
          <li className='nav-item'>
            <Link className='nav-link' to='/dashboard'>
              <i className='far fa-id-badge mr-1'></i>
              <span>Профиль</span>
            </Link>
          </li>
          {basketState.showBasket && (
            <li className='nav-item basketcount'>
              <Link
                className='nav-link'
                to='/basket'
                onClick={() => toBasketClick()}
              >
                <i className='fas fa-shopping-basket mr-1'></i>
                <span>Корзина</span>
                <div className='badge'>{basketState.basketItems}</div>
              </Link>
            </li>
          )}
        </Fragment>
      ) : (
        <Fragment>
          <li className='nav-item'>
            <Link className='nav-link' to='/admindashboard'>
              <i className='fas fa-chalkboard-teacher mr-1'></i>
              <span>Админпанель</span>
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/dashboard'>
              <i className='far fa-id-badge mr-1'></i>
              <span>Профиль</span>
            </Link>
          </li>
        </Fragment>
      )}

      <li className='nav-item'>
        <Link className='nav-link' to='/' onClick={() => logoutClick()}>
          <i className='fas fa-sign-out-alt'></i> <span>Выход</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='navbar-nav'>
      <li className='nav-item'>
        <Link className='nav-link' to='/portfolio'>
          <i className='fas fa-satellite mr-1'></i>
          <span> Портфолио</span>
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/contacts'>
          <i className='fas fa-info-circle mr-1'></i>
          <span> О нас</span>
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/login'>
          <i className='fas fa-sign-in-alt mr-1'></i>
          <span> Логин</span>
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/register'>
          <i className='fas fa-user-plus mr-1'></i>
          <span> Регистрация</span>
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar navbar-expand-lg bg-mydark'>
      <a href='/' className='navbar-brand'>
        <h3>
          RedHand
          <i className='fas fa-hand-paper logohand'></i>
        </h3>
      </a>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  basketCount: PropTypes.func.isRequired,
  basket: PropTypes.object,
  basketLoading: PropTypes.bool.isRequired,
  deleteBasketOnLogout: PropTypes.func.isRequired,
  clearBasket: PropTypes.func.isRequired,
  clearMaket: PropTypes.func.isRequired,
  clearMakets: PropTypes.func.isRequired,
  clearCategories: PropTypes.func.isRequired,
  clearOrders: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  basket: state.basket.basketcount,
  basketLoading: state.basket.loading,
});

export default connect(mapStateToProps, {
  logout,
  basketCount,
  deleteBasketOnLogout,
  clearBasket,
  clearMaket,
  clearMakets,
  clearCategories,
  clearOrders,
})(Navbar);
