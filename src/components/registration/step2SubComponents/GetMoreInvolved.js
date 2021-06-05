import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';
import { Form, Checkbox } from 'antd';

const GetMoreInvolved = ({ registrationForm, setRegistrationForm }) => {
  return (
    <Form.Item
      name="more_involved"
      label={
        <span>
          Our organization is built by volunteers like you, and we need your
          help to spread hope through books. Would you like to get more
          involved?
        </span>
      }
    >
      <Checkbox
        checked={registrationForm.additionalInformation.getMoreInvolved}
        onChange={(e) => {
          const updatedRegForm = {
            ...registrationForm,
            additionalInformation: {
              ...registrationForm.additionalInformation,
              getMoreInvolved: e.target.checked,
            },
          };
          setRegistrationForm(updatedRegForm);
        }}
      >
        Yes
      </Checkbox>
      <Checkbox
        checked={!registrationForm.additionalInformation.getMoreInvolved}
        onChange={(e) => {
          const updatedRegForm = {
            ...registrationForm,
            additionalInformation: {
              ...registrationForm.additionalInformation,
              getMoreInvolved: !e.target.checked,
            },
          };
          setRegistrationForm(updatedRegForm);
        }}
      >
        No
      </Checkbox>
    </Form.Item>
  );
};

const mapStateToProps = (state) => {
  return { registrationForm: state.registrationForm };
};

export default connect(mapStateToProps, actions)(GetMoreInvolved);
