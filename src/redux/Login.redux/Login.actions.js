import axios from 'axios';
import { getUserFromAuthToken } from '../../util/getUserWithAuthToken';
import { sleep } from '../../util/sleep';
import {
  PYTHON_API,
  setIsError,
  clearIsError,
  setAuthToken,
  setUser,
  setProcessingLogin,
} from '../actions';

/**
 * This handles all actions associated with logging in
 *
 */

// @TODO delete after backend endpoint is live
// to use replace the call with the const resposne = fakeResponseForTesting
// const fakeResponseForTesting = {
//   status: 200,
//   jwt_refresh_token: 'FAKE_JWT_REFRESH_TOKEN',
// };

/**
 * Manages failed google Login
 * Sets an error state, sleeps for 2000ms and then clears error state
 */
export const manageFailedGoogleLogin = (res) => async (dispatch) => {
  console.debug('Error response from failed google login', res);
  dispatch(setIsError('Google login has failed. Please try again'));
  await sleep(2000);
  dispatch(clearIsError());
};

/**
 * logIn.
 * Handles log in for the app. Calls google as part of the loging action
 * Tokens received from the backend will expire in 10 minutes
 * @param {string} googleToken: string from the successful response from google
 * @param {history function} history: function from react-router-dom
 */
export const logIn = (googleToken, history) => async (dispatch) => {
  dispatch(setProcessingLogin(true));
  try {
    //send google token to the backend
    // previous endpoint   'http://127.0.0.1:8000/api/googlelogin/',
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await axios.post(
      PYTHON_API + 'v1/auth/login/',
      {
        google_access_token: googleToken,
      },
      headers
    );
    console.debug('backendRes', response);

    // @TODO remove once we have a functional backend repo
    // const response = fakeResponseForTesting;

    const statusCode = response.status;

    dispatch(setProcessingLogin(false));

    //call was successful
    if (statusCode === 200) {
      console.log('Successful login');
      const jwtRefreshToken = response.jwt_refresh_token;

      //@TODO set timer to refresh token

      //save token on front
      dispatch(setAuthToken(jwtRefreshToken));

      //push user to dashboard
      history.push('/');
    } else {
      console.debug('Failed login');
      dispatch(setIsError('Google login has failed. Please try again'));
      await sleep(2000);
      dispatch(clearIsError());
    }
  } catch (err) {
    console.debug('Login Catch block failed login');
    console.debug('Backend Login Error: ', err);
    dispatch(setProcessingLogin(false));
    dispatch(setIsError(err.message ?? 'Connection to the API failed'));
    await sleep(2000);
    dispatch(clearIsError());
  }
};

/**
 * Responsible for logging in the user given an email and a password
 * Will attempt a call to the API and set the user in store
 * @param {HistoryObj} history History object from react router
 * @param {string} password user's plain text password
 * @returns
 */
export const logInEmailPassword = (history) => async (dispatch, getState) => {
  const email = getState().registrationForm?.email;
  const password = getState().registrationForm?.password;

  dispatch(setProcessingLogin(true));

  if (!email || !password) {
    console.debug('Can not log in user. Missing email or password');
    dispatch(setProcessingLogin(false));
    //@todo: do we want to fail silently?
    return;
  }

  try {
    const { accessToken, 
      //refreshToken
    } = await getTokenFromEmailPassword(
      email,
      password
    );
    const user = await getUserFromAuthToken(accessToken);

    //@todo: add access token to cookie
    dispatch(setUser(transformUser(user)));
    dispatch(setAuthToken(accessToken));
    history.push('/');
    dispatch(setProcessingLogin(false));
  } catch (err) {
    console.debug('Error logging in user');
    dispatch(setProcessingLogin(false));
    setIsError('Error logging in User');
    await sleep(3000);
    clearIsError();
  }
};

const getTokenFromEmailPassword = async (email, password) => {
  // get token from the backend
  const body = {
    email,
    password,
  };
  const headers = {
    'Content-Type': 'application/json',
  };
  try {
    const { data, status } = await axios.post(
      PYTHON_API + 'v1/auth/login/',
      body,
      { headers }
    );
    if (status !== 200) {
      throw new Error('Error logging in user');
    }
    return { accessToken: data.access, refreshToken: data.refresh };
  } catch (err) {
    throw new Error('Error logging in user');
  }
};

const transformUser = (userAPI) => {
  const { id, user_type, first_name, last_name, email, external_id } = userAPI;
  return {
    id: id,
    userType: user_type,
    firstName: first_name,
    lastName: last_name,
    email: email,
    externalId: external_id,
  };
};
