import axios from 'axios';
import { formatPhoneNumber } from '../../util/formatPhoneNumber';
import { sleep } from '../../util/sleep';
import {
  clearIsError,
  PYTHON_API,
  setIsError,
  setProcessingRegistration,
  setUser,
} from '../actions';
import { USER_TYPES } from '../User.redux/User.types';

export const SET_REGISTRATION_FORM = 'SET_REGISTRATION_FORM';

/**
 * sets the registration form store to the payload
 * @param {obj: registrationForm} regForm
 * @returns setRegistrationFromAction
 */
export const setRegistrationForm = (regForm) => {
  return { type: SET_REGISTRATION_FORM, payload: regForm };
};

/**
 * Registers User for the newsletter if newsletter is true.
 * Submits the first part of the form for the user
 * @param {firstName: string, lastName: string, phone: string, email:string, newsletter:boolean} registrationFormStepOne
 * @returns null
 */
export const subUserRegistration = (history) => async (dispatch, getState) => {
  dispatch(setProcessingRegistration(true));
  const regForm = getState().registrationForm;
  console.log(regForm);
  const headers = {
    'Content-Type': 'application/json',
  };
  try {
    //registers the user with VBB
    const { data, status } = await axios.post(
      PYTHON_API + 'v1/mentor/',
      transformRegistrationFormForSubmission(regForm),
      headers
    );

    if (status === 201) {
      dispatch(setUser(transformRegistrationFormResponse(data)));
      history.push('/');
    } else {
      console.error('Failed Registration');
      dispatch(
        setIsError(
          'Registration failed please email Village Book Builders directly to become a member or try again'
        )
      );

      await sleep(2000);
      dispatch(clearIsError());
    }
    dispatch(setProcessingRegistration(false));
  } catch (err) {
    dispatch(setProcessingRegistration(false));
    console.error('mentor registration error', err);
  }
};

const transformRegistrationFormForSubmission = (regForm) => {
  return {
    user: {
      first_name: regForm.firstName,
      last_name: regForm.lastName,
      personal_email: regForm.email,
      phone: formatPhoneNumber(regForm.phone),
      time_zone: regForm.timeZone,
    },
    address: regForm.address,
    is_adult: regForm.is_adult,
  };
};

const transformRegistrationFormResponse = (regFormResponse) => {
  const { user, id } = regFormResponse;
  return {
    id: id,
    userType: USER_TYPES.MENTOR,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    externalId: '', //not returned in this request
  };
};
