import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import { Button, PageHeader } from 'antd';
import { LoginOutlined, FormOutlined, LogoutOutlined } from '@ant-design/icons';

import fullLogo from '../images/vbb-full-logo.png';
// import miniLogo from '../images/vbb-picture-logo.png';

const NavBar = ({ logout, authToken }) => {
  console.log('Logout', logout);
  console.log('AuthToken', authToken);

  const signInSignOut = !authToken ? (
    <Link to="/signin" key="link-1">
      <Button key="1" style={{ marginTop: '15px', color: '#549bea' }}>
        Sign In
        <LoginOutlined />
      </Button>
    </Link>
  ) : (
    <Link to="/" key="link-1">
      <Button
        key="1"
        style={{ marginTop: '15px', color: '#549bea' }}
        onClick={logout}
      >
        Sign Out
        <LogoutOutlined />
      </Button>
    </Link>
  );
  return (
    <PageHeader
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        backgroundColor: '#ff914d',
      }}
      title={
        <Link to="/">
          <img
            src={fullLogo}
            alt="Logo for Village Book Builders, small orange hut with Village Book Builders text"
            width="200"
          ></img>
        </Link>
      }
      extra={[
        signInSignOut,
        <Link to="/signup" key="link-2">
          <Button type="primary" key="2">
            Register
            <FormOutlined style={{ color: 'white' }} />
          </Button>
        </Link>,
      ]}
    ></PageHeader>
  );
};

const mapStateToProps = (state) => {
  return {
    authToken: state.authToken,
  };
};
export default withRouter(connect(mapStateToProps, actions)(NavBar));
