import React from 'react';
import { Button, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import * as actions from '../redux/actions';
import Logo from '../images/vbb-small-logo-white.png';

/**
 * HomeSignin.
 * Connected functional component
 * Displays Google Signin button and Register button
 *
 * @param { Type History } history from react router dom
 * @param {redux action} logIn current action from login import as a connected component
 * @param {redux action} manageFailedGoogleLogin current action from login import as a connected component
 */
const HomeSignin = ({ history, logIn, manageFailedGoogleLogin }) => {
  return (
    <Row justify="center" align="middle">
      <Col
        span={24}
        style={{
          textAlign: 'center',
          color: 'white',
          backgroundColor: '#549bea',
          borderRadius: '15px',
          padding: '2rem 1rem',
        }}
      >
        <img
          src={Logo}
          alt="VBB logo icon"
          width="100"
          height="75"
          style={{ margin: '1rem' }}
        ></img>
        <h1 style={{ margin: '1rem 0', color: 'white' }}>Village Portal</h1>
        <h4 style={{ margin: '1rem 0 2rem 0', color: 'white' }}>
          Let's give hope to children through mentoring.
        </h4>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={(res) => logIn(res.accessToken, history)}
          onFailure={(res) => manageFailedGoogleLogin(res)}
          cookiePolicy={'single_host_origin'}
        />
        <p style={{ margin: '1rem 0' }}>
          Don't have an account with us yet?
          <Button
            style={{ fontWeight: 'bold', lineHeight: '.5', color: 'white' }}
            type="link"
            href="/signup/"
          >
            Register
          </Button>
        </p>
      </Col>
    </Row>
  );
};

export default connect(null, actions)(HomeSignin);
