import React, { Fragment } from 'react';

const Spinner = () => {
  return (
    <Fragment>
      <div className='spinner-container mt-5'>
        <div
          className='spinner-border text-danger'
          style={{
            width: '15rem',
            height: '15rem',
          }}
          role='status'
        ></div>
      </div>
    </Fragment>
  );
};

export default Spinner;
