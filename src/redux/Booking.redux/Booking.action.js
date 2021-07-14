import axios from 'axios';
import { PYTHON_API } from '../actions/index';

export const MENTOR_CHANGE = 'MENTOR_CHANGE';
export const COMMIT_CHANGE = 'COMMIT_CHANGE';
export const UPDATING_CHECKBOX = 'UPDATING_CHECKBOX';
export const DROPDOWN_CHANGE = 'DROPDOWN_CHANGE';
export const SET_LIBRARIES_AND_LANGUAGES = 'SET_LIBRARIES_AND_LANGUAGES';
export const SET_TIMES = 'SET_TIMES';

const fakeLanguageData = {
  data: ['English', 'Spanish', 'French', 'German']
}

const fakeLibraryData = {
  data: ['fake library1', 'fake library2', 'fake library3', 'fake library4']
}

// ISO time format
const fakeTimeData = {
    slot1: {
      start_time: '2021-05-15T09:00:00.000-04:00',
      end_time: '2021-05-15T10:00:23.000-04:00'
    },
    slot2: {
      start_time: '2021-05-17T15:00:00.000-04:00',
      end_time: '2021-05-17T16:00:00.000-04:00'
    },
    slot3: {
      start_time: '2021-05-18T21:00:00.000-04:00',
      end_time: '2021-05-18T22:00:00.000-04:00'
    },
    slot4: {
      start_time: '2021-05-19T23:00:00.000-04:00',
      end_time: '2021-05-19T24:00:00.000-04:00'
    }
}


export const mentorChange = () => {
  return {
    type: MENTOR_CHANGE
  }
}

export const commitChange = () => {
  return {
    type: COMMIT_CHANGE
  }
}

export const updatingCheckBox = (language) => {
  // console.log(languages)
  return {
    type: UPDATING_CHECKBOX,
    payload: { name: 'language', value: language }
  }
}

/**
 * Update Booking form, then fetch booking time slots if all options are selected.
 */
export const updatingBookingForm = (optionName, optionValue) => async (dispatch, getState) => {
  dispatch(updateFormValues(optionName, optionValue));
  const {language, library, time_zone, weekday} = getState().booking;
  if ((language && library && time_zone && weekday) !=='' )  {
    dispatch(getBookingTimes());
  }
}

const updateFormValues = (name, value) => {
  return {
    type: DROPDOWN_CHANGE,
    payload: { name, value }
  }
}

/**
 * Gets the Times from the API and adds it to the bookings store
 * @returns void or error
 */
 export const getBookingTimes = () => async (dispatch, getState) => {
  const authToken = getState().authToken;
  try {
    //get user from backend
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };

    // fetch fake data
    const getTimeResponse = fakeTimeData

    dispatch(setTimeInBooking(getTimeResponse));

  } catch (err) {
    //manage what happens when things go wrong
    console.log('Error in getBookingTimes', err);
  }
};

const setTimeInBooking = (time) => {
  return {
    type: SET_TIMES,
    payload: time
  }
}

/**
 * Gets the Library and Language from the API and adds it to the bookings store
 * @returns void or error
 */

export const getBookingData = () => async (dispatch, getState) => {

  const authToken = getState().authToken;
  try {
    //get user from backend
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };

    // fetch fake data
    const getLibraryResponse = fakeLibraryData
    const getLanguageResponse = fakeLanguageData
    

    dispatch(setLibraryAndLanguageInBooking(getLibraryResponse.data, getLanguageResponse.data));

  } catch (err) {
    //manage what happens when things go wrong
    console.log('Error in getBookingData', err);
  }
};


const setLibraryAndLanguageInBooking = (library, language) => {
  return {
    type: SET_LIBRARIES_AND_LANGUAGES,
    payload: {library, language}
  }
}

/**
 * Create post request to send data.
 * @returns void or error
 */
 export const createBooking = () => async (dispatch, getState) => {
  const authToken = getState().authToken;
  try {
    //get user from backend
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };

    // upload data to server-side

    alert('success!')

  } catch (err) {
        alert(
          "We're sorry! Something went wrong while booking your appointment. Please contact your mentor advisor to find out more."
        );
        console.log(err);
  }
};
