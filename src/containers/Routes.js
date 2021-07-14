import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Booking from '../components/Booking';
import Dashboard from '../components/Dashboard';
import MasterForm from '../components/registration/MasterForm';
import HomeSignin from '../components/HomeSignin';
import SessionDetails from '../components/SessionDetails';
import Donation from '../components/registration/Donation';
import TempRegistration from '../components/registration/TempRegistration';
import MentorProfile from '../components/MentorProfile';

const Routes = ({ token }) => {
  const isLoggedIn = !!token;

  return (
    <div className="App">
      <Route exact path='/test-booking'>
        <Booking />
      </Route>
      <Route exact path="/register/">
        <TempRegistration />
      </Route>
      <Route
        exact
        path="/"
        render={(routerProps) =>
          isLoggedIn ? (
            <Dashboard {...routerProps} />
          ) : (
            <Redirect to="/signin" />
          )
        }
      />
      <Route
        exact path="/booking/"
        render={(routerProps) =>
          isLoggedIn ? <Booking {...routerProps} /> : <Redirect to="/signin" />
        }
      />
      <Route
        exact path="/profile/"
        render={(routerProps) =>
          isLoggedIn ? <MentorProfile {...routerProps} /> : <Redirect to="/signin" />
        }
      />
      <Route exact path="/signin/" render={HomeSignin} />
      <Route exact path="/signup/" render={MasterForm} />
      <Route exact path="/sessiondetails/:sessionid/" render={SessionDetails} />
      <Route exact path="/donate/" render={Donation} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { token: state.authToken };
};

export default connect(mapStateToProps, null)(Routes);
