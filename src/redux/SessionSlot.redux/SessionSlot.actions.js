import axios from 'axios';

import { sleep } from '../../util/sleep';
import { getDateStr } from '../../helpers';
import {
  PYTHON_API,
  setLoading,
  setLoadingFalse,
  setIsError,
  clearIsError,
} from '../actions';

// const fakeSessionResponseData = {
//   id: 'FakeId',
//   display: 'Fake Display',
//   end_date: 'Fake Date',
//   mentor_notes: 'These are some fake notes',
//   mentor: 'not sure what data type the mentor should be',
// };

//Action Types
export const SET_SESSION_INFO = 'SET_SESSION_INFO';
export const SET_SESSION_END_DATE = 'SET_SESSION_END_DATE';

// Basic Actions
const setSessionInfo = (sessionInfo) => {
  return { type: SET_SESSION_INFO, payload: sessionInfo };
};

export const setSessionEndDate = (endDate) => {
  return { type: SET_SESSION_END_DATE, payload: endDate };
};

// Thunk Actions
/**
 * getSessionInfo.
 * Gets Session info from the python api given a sessionId from the URL
 * endpoint: /session/:id
 * @param {string} sessionId
 */
export const getSessionInfo = (sessionId) => async (dispatch, getState) => {
  dispatch(setLoading());
  try {
    const token = getState().authToken;
    const url = PYTHON_API + 'v1/session/' + sessionId;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const responseData = await axios.get({ url, headers }).data;

    dispatch(setLoadingFalse());

    const newSession = {
      id: responseData.id,
      display: responseData.display,
      endDate: responseData.end_date,
      mentorNotes: responseData.mentor_notes,
      mentor: responseData.mentor,
    };

    //TODO REMOVE logging once we're done with setup
    console.log('res : ', responseData);
    console.log('rd: ', responseData.display);

    dispatch(setSessionInfo(newSession));
  } catch (err) {
    dispatch(setLoadingFalse());
    console.error('Error getting Session Info', err);
    dispatch(
      setIsError('There was an error in retrieving your mentoring sessions')
    );
    await sleep(1500);
    dispatch(clearIsError());
  }
};

/**
 * updateSessionInfo.
 * Updates a session given the sessionId from the URL and pulls in
 * the current session object from the state
 * endpoint: /update/:id
 * @param {string} sessionId
 */
export const updateSessionInfo = (sessionId) => async (dispatch, getState) => {
  dispatch(setLoading());
  try {
    const sessionInfo = getState().sessionInfo;
    const { endDate, mentorNotes } = sessionInfo;
    const body = { end_date: endDate, mentor_notes: mentorNotes };

    const token = getState().authToken;

    const url = PYTHON_API + 'v1/update/' + sessionId;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    await axios.patch({ url, body, headers }).data;
    dispatch(setLoadingFalse());
  } catch (err) {
    dispatch(setLoadingFalse());
    console.error('Error updating Session Info', err);
    dispatch(
      setIsError('There was an error in updating your mentoring sessions')
    );
    await sleep(1500);
    dispatch(clearIsError());
  }
};

/**
 * unbookSession.
 * Unbooks a session using the session Id from the URL and pushes the user
 * back to the root page on a successful unbooking
 * @param {string} sessionId
 * @param {History Obj React Router Dom} history
 */
export const unbookSession = (sessionId, history) => async (
  dispatch,
  getState
) => {
  dispatch(setLoading());
  try {
    const body = { end_date: getDateStr(0), mentor_notes: null };

    const token = getState().authToken;

    const url = PYTHON_API + 'v1/update/' + sessionId;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    await axios.patch({ url, body, headers }).data;
    dispatch(setLoadingFalse());
    history.push('/');
  } catch (err) {
    dispatch(setLoadingFalse());
    console.error('Error Cancelling Session Info', err);
    dispatch(
      setIsError('There was an error cancelling your mentoring session')
    );
    await sleep(1500);
    dispatch(clearIsError());
  }
};
//
//******************* OLD CODE FOR REF
//new getSessionInfo
// //OLD FUNCTION from Session Details
// fetchSessionSlotData = () => {
//   axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
//   axios.defaults.xsrfCookieName = 'csrftoken';
//   axios.defaults.headers = {
//     'Content-Type': 'application/json',
//     Authorization: `Token ${this.props.jjjoken}`,
//   };
//   const sessionid = this.props.match.params.sessionid;
//   axios
//     .get(`http://127.0.0.1:8000/api/session/${sessionid}`)
//     .then((res) => {
//       console.log('res : ', res);
//       console.log('rd: ', res.data.display);
//       this.setState({
//         //   sessionslot: res.data,
//         id: res.data.id,
//         display: res.data.display,
//         endDate: res.data.end_date,
//         mentorNotes: res.data.mentor_notes,
//         mentor: res.data.mentor,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       alert('There was an error in retrieving your mentoring sessions', err);
//     });
// };
//
// new updateSessionInfo
// //OLD FUNCTION from Session Details
// onApplyChanges = () => {
//   const sessionid = this.props.match.params.sessionid;
//   //  const endDate = this.state.endDate;
//   axios
//     .patch(`http://127.0.0.1:8000/api/update/${sessionid}`, {
//       end_date: this.state.endDate,
//       mentor_notes: this.state.mentorNotes,
//     })
//     .then((res) => {
//       console.log('apply', res.data.display);
//       alert(
//         'Your changes have successfully applied.\nYour session is now set for: ' +
//           res.data.display +
//           '.'
//       );
//     })
//     .catch((err) => {
//       console.log(err);
//       alert('There was an error in applying changes.', err);
//     });
// };
