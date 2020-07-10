import React, { Fragment } from 'react';

const NotFound = () => {
  return (
    <Fragment>
      <div className='container'>
        <h1 className='x-large notfound-text text-center'>
          <i className='fas fa-exclamation-triangle'></i> 404 Страница не
          найдена
        </h1>
        <h3 className='large text-center'>
          Запрашиваемая страница не существует!
        </h3>
      </div>
    </Fragment>
  );
};

export default NotFound;
