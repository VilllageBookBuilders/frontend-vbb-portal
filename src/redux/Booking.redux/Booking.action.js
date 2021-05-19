import axios from 'axios';
import { PYTHON_API } from '../actions/index';

export const MENTOR_CHANGE = 'MENTOR_CHANGE';
export const COMMIT_CHANGE = 'COMMIT_CHANGE';
export const DROPDOWN_CHANGE = 'DROPDOWN_CHANGE';
export const SET_LIBRARIES = 'SET_LIBRARIES';
export const SET_LANGUAGES = 'SET_LANGUAGES';
export const SET_TIMES = 'SET_TIMES';
export const POST_REQUEST = 'POST_REQUEST';


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

export const dropDown_Change = (name, value) => {
  return {
    type: DROPDOWN_CHANGE,
    payload: { name, value }
  }
}

export const dropDownChange = (name, value, dispatch) => async (dispatch, getState) => {
  dispatch(dropDown_Change(name, value))
  dispatch(getTimes())
}

export const setLibraryInBooking = (library) => {
  return {
    type: SET_LIBRARIES,
    payload: library
  }
}

export const setLanguageInBooking = (language) => {
  return {
    type: SET_LANGUAGES,
    payload: language
  }
}

export const setTimeInBooking = (time) => {
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
    //   const getLibraryResponse = await axios.get(PYTHON_API + 'v1/library/', {
    //     headers,
    //   });
    // const getLibraryResponse = await axios.get(
    //   'http://127.0.0.1:8000/api/library/'
    // );
    // const getLanguageResponse = await axios.get(
    //   'http://127.0.0.1:8000/api/language/'
    // );

    const getLanguageResponse = fakeLanguageData
    const getLibraryResponse = fakeLibraryData

    dispatch(setLanguageInBooking(getLanguageResponse.data));
    dispatch(setLibraryInBooking(getLibraryResponse.data));

  } catch (err) {
    //manage what happens when things go wrong
    console.log('Error in fetchBookingData', err);
  }
};


/**
 * Gets the Times from the API and adds it to the bookings store
 * @returns void or error
 */
export const getTimes = (e) => async (dispatch, getState) => {
  const authToken = getState().authToken;
  try {
    //get user from backend
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };


    //how to match weekday? create another field with numbers 1-7?  


    //   const getLibraryResponse = await axios.get(PYTHON_API + 'v1/library/', {
    //     headers,
    //   });
    // const getTimeResponse = await axios.get(
    //   'http://127.0.0.1:8000/api/library/'
    // ),
    // params: {
    //   library: this.props.library,
    //   language: this.props.language,
    //   min_msm: this.shift_time(parseInt(this.props.weekday), false),
    //   max_msm: this.shift_time(parseInt(this.props.weekday), false) + 1440,
    // }

    const getTimeResponse = fakeTimeData

    dispatch(setTimeInBooking(getTimeResponse));

  } catch (err) {
    //manage what happens when things go wrong
    console.log('Error in fetchTimes', err);
  }
};

/**
 * Create post request to send data.
 * @returns void or error
 */
 export const postRequest = (e) => async (dispatch, getState) => {
  const authToken = getState().authToken;
  try {
    //get user from backend
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };
    // const getTimeResponse = await axios.post(
    //   'http://127.0.0.1:8000/api/book/'
    // ),
    // params: {
    //   library: this.props.library,
    //   language: this.props.language,
    //   msm: this.props.time,
    // }
    alert('success!')

  } catch (err) {
        alert(
          "We're sorry! Something went wrong while booking your appointment. Please contact your mentor advisor to find out more."
        );
        console.log(err);
  }
};