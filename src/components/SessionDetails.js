import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getDateStr } from '../helpers';
import * as actions from '../redux/actions';

// values in store
// id: responseData.id,
// display: responseData.display,
// endDate: responseData.end_date,
// mentorNotes: responseData.mentor_notes,
// mentor: responseData.mentor,

/*
 *Displays Session Details
 *@props { getSessionInfo, setSessionEndDate, updateSessionInfo, history, match }
 */
class SessionDetails extends PureComponent {
  state = {
    unbookConfirmation: false,
    readyToApplyChanges: false,
    didCommunicate: '',
    proceedToUnbook: '',
  };

  componentDidMount() {
    const sessionid = this.props.match.params.sessionid;
    this.props.getSessionInfo(sessionid);
  }

  onUnbookFirstClick = () => {
    this.setState({
      unbookConfirmation: true,
    });
  };

  onApplyChanges = async () => {
    //gets the session ID from the URL
    const sessionid = this.props.match.params.sessionid;
    await this.props.updateSessionInfo(sessionid);
  };

  onUnbookRequest = async () => {
    //gets the session ID from the URL
    const sessionid = this.props.match.params.sessionid;
    await this.props.unbookSession(sessionid, this.props.history);
  };

  render() {
    const {
      id,
      display,
      endDate,
      // mentorNotes,
      // mentor,
    } = this.props.sessionSlot;
    return (
      <div className="cream-bg">
        <div
          className="session-details-card col-card mx-auto p-4"
          style={{ borderRadius: '30px' }}
        >
          {!this.state.unbookConfirmation ? (
            <>
              <div className="d-block px-4 mb-4">
                <h5>Adjust Mentoring Session #{id}:</h5>
                <h4 className="session-details-link session-details-location px-5">
                  {display}
                </h4>
              </div>
              <div className="d-block mb-2">
                <label className="ml-4">Adjust End Date:</label>
                <input
                  type="date"
                  className="mx-4"
                  value={endDate}
                  min={getDateStr(14)} // min is 2 weeks out
                  max={getDateStr(365)} // max is 1 year out
                  onChange={(event) => {
                    this.props.setSessionEndDate(event.target.value);
                    this.setState({ readyToApplyChanges: true });
                    // this.setState({
                    //   endDate: event.target.value,
                    //   readyToApplyChanges: true,
                    // });
                  }}
                />
              </div>
              <div className="d-block w-100 mb-2 px-4">
                <label>
                  Add/Edit Notes: <br />
                  (Mentee name, mentee interests, session notes, etc.)
                </label>
                <textarea
                  className="w-100"
                  rows="3"
                  value={this.state.mentorNotes}
                  onChange={(event) =>
                    //TODO UPDATE THIS
                    this.setState({
                      mentorNotes: event.target.value,
                      readyToApplyChanges: true,
                    })
                  }
                />
              </div>
              <div className="d-block my-2 w-100 p-3">
                <button
                  className="btn unbook-btn d-block mx-auto mt-2 mb-5 btn-light unbook-btn"
                  onClick={this.onUnbookFirstClick}
                >
                  UNBOOK THIS SLOT
                </button>
                <br />
                <a
                  href="/"
                  type="button"
                  className="btn px-4 goback-btn d-inline "
                >
                  GO BACK
                </a>
                <button
                  className="btn btn-light applychanges-btn"
                  disabled={!this.state.readyToApplyChanges}
                  onClick={this.onApplyChanges}
                  // FIXME - Make call to end date and mentor notes updater api
                >
                  APPLY CHANGES
                </button>
                <br />
                <br />
              </div>
            </>
          ) : (
            <>
              <h5 style={{ paddingLeft: '20%' }}>Sure you want to unbook?</h5>
              <div className="d-block px-4 py-2 mb-4">
                <label>
                  Have you communicated with your mentee and with your mentor
                  advisors about this unbooking at least one week in advance?
                </label>
                <select
                  onChange={(event) => {
                    this.setState(
                      { didCommunicate: event.target.value },
                      console.log('dc: ', this.state.didCommunicate)
                    );
                  }}
                  value={this.state.didCommunicate}
                >
                  <option value="" style={{ display: 'none' }}></option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <br />
              <br />
              <div className="d-block px-4 mb-4">
                <label>
                  Are you sure you wish to proceed with this unbooking?
                </label>
                <select
                  onChange={(event) => {
                    this.setState(
                      { proceedToUnbook: event.target.value },
                      console.log('pu: ', this.state.proceedToUnbook)
                    );
                  }}
                  value={this.state.proceedToUnbook}
                >
                  <option value="" style={{ display: 'none' }}></option>

                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <br />
              <br />
              <div className="d-block my-2 w-100 p-3">
                <a
                  href="/"
                  type="button"
                  className="btn px-4 goback-btn d-inline "
                >
                  GO BACK
                </a>
                <button
                  className="btn unbook-btn float-right"
                  disabled={
                    this.state.didCommunicate === '' ||
                    this.state.didCommunicate === 'no' ||
                    this.state.proceedToUnbook === '' ||
                    this.state.proceedToUnbook === 'no'
                  }
                  // onClick={this.submitUnbookRequest}
                  onClick={this.onUnbookRequest}
                  // FIXME - Make call to unbooking api
                >
                  REQUEST UNBOOKING
                </button>
                <br />
                <br />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.authToken,
    sessionSlot: state.sessionSlot,
  };
};

export default connect(mapStateToProps, actions)(SessionDetails);
