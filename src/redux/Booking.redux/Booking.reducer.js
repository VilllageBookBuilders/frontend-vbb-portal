import moment from 'moment';
import 'moment-timezone';

import {
    MENTOR_CHANGE,
    COMMIT_CHANGE,
    UPDATING_CHECKBOX,
    DROPDOWN_CHANGE,
    SET_LIBRARIES_AND_LANGUAGES,
    SET_TIMES
} from './Booking.action'

const BookingInitialState = {
    libraries: [], 
    languages: [], 
    times: [], 
    time_zone: moment.tz.guess(), 
    language: '',
    weekday: '', 
    displayDay: '',
    library: '', 
    time: false,
    displayTime: '',
    isReturning: true, // 1
    isCommitted: false,
    sameAppointment: 'no'
};

export const booking = (state = BookingInitialState, action) => {
  //this needs to use the payload in someway
  switch (action.type) {
    case MENTOR_CHANGE:
        let newLibrary = state.library
        if ( !state.isReturning ) {
            newLibrary = false
        }
        return {
            ...state,
            isReturning: !state.isReturning,
            library: newLibrary
        }
    case COMMIT_CHANGE:
        return {
            ...state,
            isCommitted: !state.isCommitted
        }
    case UPDATING_CHECKBOX:
    case DROPDOWN_CHANGE:
        return {
            ...state,
            [action.payload.name]: action.payload.value
        }
    case SET_LIBRARIES_AND_LANGUAGES:
        return {
            ...state,
            libraries: action.payload.library,
            languages: action.payload.language
        }
    case SET_TIMES:
        return {
            ...state,
            times: action.payload
        }
    default:
      return state;
  }
};
