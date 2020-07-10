import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.scss';

const Navbar = () => {
  return (
    <nav className='mynavbar'>
      <div className='links'>
        <div className='dropdown'>
          Макет
          <div className='dropdown-content list-group'>
            <Link
              to='/admindashboard/makets'
              className='list-group-item list-group-item-action'
            >
              <div name='maketslist'>
                Список
                <small>(список макетов)</small>
              </div>
              <i className='fas fa-list-alt'></i>
            </Link>
            <Link
              to='/admindashboard/addmaket'
              className='list-group-item list-group-item-action'
            >
              <div name='addmaket'>
                Добавить
                <small>(добавить макет)</small>
              </div>
              <i className='fas fa-plus'></i>
            </Link>
          </div>
        </div>

        <div className='dropdown'>
          Категория
          <div className='dropdown-content list-group'>
            <Link
              to='/admindashboard/getcategories'
              className='list-group-item list-group-item-action'
            >
              <div>
                Список
                <small>(список категорий)</small>
              </div>
              <i className='fas fa-th-list'></i>
            </Link>
            <Link
              to='/admindashboard/addcategory'
              className='list-group-item list-group-item-action'
            >
              <div>
                Добавить
                <small>(добавить категорию)</small>
              </div>
              <i className='fas fa-folder-plus'></i>
            </Link>
          </div>
        </div>
        <div className='dropdown'>
          Упаковка
          <div className='dropdown-content list-group'>
            <Link
              to='/admindashboard/packing'
              className='list-group-item list-group-item-action'
            >
              <div>
                Список
                <small>(список упаковок)</small>
              </div>
              <i className='fas fa-luggage-cart'></i>
            </Link>
            <Link
              to='/admindashboard/addpacking'
              className='list-group-item list-group-item-action'
            >
              <div>
                Добавить
                <small>(добавить упаковку)</small>
              </div>
              <i className='fas fa-folder-plus'></i>
            </Link>
          </div>
        </div>
        <div className='dropdown'>
          Пользователи
          <div className='dropdown-content list-group'>
            <Link
              to='/admindashboard/users'
              className='list-group-item list-group-item-action'
            >
              <div>
                Список
                <small>(список пользователей)</small>
              </div>
              <i className='fas fa-users'></i>
            </Link>
            <a href='!#' className='list-group-item list-group-item-action'>
              <div>
                Поиск
                <small>Найти пользователя</small>
              </div>
              <i className='fas fa-user-secret'></i>
            </a>
          </div>
        </div>

        <div className='dropdown'>
          Заказы
          <div className='dropdown-content list-group'>
            <Link
              to='/admindashboard/orders'
              className='list-group-item list-group-item-action'
            >
              <div>
                Список
                <small>(список заказов)</small>
              </div>
              <i className='fas fa-receipt'></i>
            </Link>
            <a href='!#' className='list-group-item list-group-item-action'>
              <div>
                Изменить
                <small>(изменить статус заказа) </small>
              </div>
              <i className='fas fa-highlighter'></i>
            </a>
          </div>
        </div>
        <div className='dropdown'>
          <Link to='/admindashboard/contactedit'>О нас</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
