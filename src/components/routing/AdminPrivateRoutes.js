import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AdminPrivateRoutes = ({
  component: Component,
  auth: { user, loading, isAuthenticated },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !loading && !isAuthenticated ? (
          <Redirect to='/login' />
        ) : !loading && user.data.role === 'user' ? (
          <Redirect to='/dashboard' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

AdminPrivateRoutes.propTypes = {
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminPrivateRoutes);
