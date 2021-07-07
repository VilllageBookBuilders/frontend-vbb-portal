import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment-timezone';
import { Checkbox } from 'antd';

import menteeComputer from '../images/vbb-mentee-computer.png';

import * as actionCreators from '../redux/Booking.redux/Booking.action';

import { DateTime } from 'luxon';

class Booking extends React.Component {
  componentDidMount() {
    this.props.getBookingData();
    this.props.getBookingTimes();
  }

  display_day = (time) => {
    const weekday = DateTime.fromISO(time).weekdayLong
    return weekday
  };

  convert_timezone = (t) => {
    const newTime = DateTime.fromISO(t, { zone: this.props.time_zone });
    return newTime.toString()
  }

  submitRequest = () => {
    this.props.handleCommitChange();
    this.props.createBooking();
  };

  test = (e) => {
    console.log(e)
  }

  render() {

    return (
      <div className="twocol-container">
        <div id="booking-box">
          <h1 id="booking-header">Book Your Weekly Mentoring Session Below!</h1>
          <br />
          <div className="booking-fields">

            Mentoring Language:
            <Checkbox.Group
                style={{marginLeft: '5px'}}
                options={this.props.languages}
                onChange={(e) => this.props.handleCheckBox(e)}           
              />
       
            <br />
            <br />

            <label htmlFor="time_zone">Your Timezone:</label>&nbsp;
            <select
              name="time_zone"
              id="time_zone"
              onChange={(e) =>
                this.props.handleDropDownChange(e.target.name, e.target.value)
              }
              value={this.props.time_zone}
            >
              {moment.tz.names().map((tz) => {
                return (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                );
              })}
            </select>

            <br />
            <br />
            
            {this.props.isReturning && (
              <div>
                <label htmlFor="library">
                  Your Library:&nbsp;
                </label>
                <select
                  name="library"
                  id="library"
                  onChange={(e) =>
                    this.props.handleDropDownChange(e.target.name,e.target.value)
                  }
                  style={{ marginTop: '0px' }}
                >
                  <option value=''>Select Your Library:</option>
                  {this.props.libraries &&
                    this.props.libraries.length > 0 &&
                    this.props.libraries.map((lib, index) => {
                      return <option key={index}>{lib}</option>;
                    })}
                </select>
                <br />
                <br />
              </div>
            )}

            <label htmlFor="weekday">Day of the Week:&nbsp;</label>
            <select
              name="weekday"
              id="weekday"
              onChange={(e) =>
                this.props.handleDropDownChange(e.target.name, e.target.value)
              }
            >
              <option value=''>Select Avaliable Weekday:</option>
              <option value={1}>Monday</option>
              <option value={2}>Tuesday</option>
              <option value={3}>Wednesday</option>
              <option value={4}>Thursday</option>
              <option value={5}>Friday</option>
              <option value={6}>Saturday</option>
              <option value={7}>Sunday</option>
            </select>

            <br />
            <br />

            <label htmlFor="time">Time of Day:&nbsp;</label>
            <select
              name="time"
              id="time"
              onChange={(e) => this.props.handleDropDownChange(e.target.name, e.target.value)}>
              <option value={false}>Select from Avaliable Times:</option>
              {this.props.times &&
                Object.keys(this.props.times).length > 0 &&
                Object.keys(this.props.times).map((slot, index) => {
                  const start_time = this.convert_timezone(this.props.times[slot].start_time)
                  const end_time = this.convert_timezone(this.props.times[slot].end_time)
                  return (
                    <option value={start_time} key={index}>
                      {start_time} to {end_time}
                    </option>
                  );
                })}
            </select>

            <br />
            <br />

            {this.props.time && (
              <div>
                <label>
                  Please confirm that the time and library you have selected
                  represent your current mentoring session time and library:{' '}
                </label>
                <p>
                  (If you book a time that is not currently yours, you will
                  displace another mentor from their current mentoring session.
                  if you wish to reschedule, please do that in 2 or 3 weeks once
                  all mentors have completed the transition to this new system.
                  Thank you!)
                </p>
                <select
                  name="sameAppointment"
                  id="sameAppointment"
                  onChange={(e) =>
                    this.props.handleDropDownChange(e.target.name,e.target.value)
                  }
                  value={this.props.sameAppointment}
                >
                  <option value="no">No, or I am unsure</option>
                  <option value="yes">Yes, I am sure this slot is mine</option>
                </select>
                <br />
                <br />
                <br />
              </div>
            )}
            {this.props.sameAppointment === 'yes' && (
              <div>
                <input
                  type="checkbox"
                  id="commitment"
                  name="commitment"
                  checked={this.props.isCommitted}
                  onChange={(e) =>
                    this.props.handleDropDownChange(
                      e.target.name,
                      e.target.value
                    )
                  }
                />
                <label htmlFor="commitment">
                  Please double check that the time you have selected (every{' '}
                  {this.display_day(this.props.time)} at{' '}
                  {this.props.time}) is your
                  current mentoring time
                </label>
                <br />
                <br />
              </div>
            )}
          </div>
          <br />
          <br />
          <a href="/" type="button" className="btn goback-btn">
            GO BACK
          </a>
          <button
            className="btn btn-light"
            id="requestsession-btn"
            disabled={!this.props.isCommitted || this.props.time === false}
            onClick={this.submitRequest}
          >
            REQUEST SESSION
          </button>
        </div>
        <img
          src={menteeComputer}
          id="booking-picture"
          alt="Pic"
          style={{ width: '600px', margin: '5vw' }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    libraries: state.booking.libraries,
    languages: state.booking.languages,
    times: state.booking.times,
    time_zone: state.booking.time_zone,
    weekday: state.booking.weekday,
    time: state.booking.time,
    isReturning: state.booking.isReturning,
    isCommitted: state.booking.isCommitted,
    sameAppointment: state.booking.sameAppointment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleMentorChange: () => dispatch(actionCreators.mentorChange()),
    handleCommitChange: () => dispatch(actionCreators.commitChange()),
    handleCheckBox: (languages) => dispatch(actionCreators.updatingCheckBox(languages)),
    handleDropDownChange: (name, value) => dispatch(actionCreators.updatingBookingForm(name, value)),
    getBookingData: () => dispatch(actionCreators.getBookingData()),
    getBookingTimes: () => dispatch(actionCreators.getBookingTimes()),
    createBooking: () => dispatch(actionCreators.createBooking())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
