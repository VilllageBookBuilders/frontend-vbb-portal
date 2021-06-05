import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';
import { Form, Checkbox } from 'antd';

const MoreThanFourMonths = ({ registrationForm, setRegistrationForm }) => {
  return (
    <Form.Item
      name="more-than-four-months"
      label="Can you commit to being a mentor for a minimum of 4 months"
    >
      {/* Add if no alert */}
      <Checkbox
        checked={registrationForm.additionalInformation.moreThanFourMonths}
        onChange={(e) => {
          const updatedRegForm = {
            ...registrationForm,
            additionalInformation: {
              ...registrationForm.additionalInformation,
              moreThanFourMonths: e.target.checked,
            },
          };
          setRegistrationForm(updatedRegForm);
        }}
      >
        Yes
      </Checkbox>
      <Checkbox
        checked={!registrationForm.additionalInformation.moreThanFourMonths}
        onChange={(e) => {
          const updatedRegForm = {
            ...registrationForm,
            additionalInformation: {
              ...registrationForm.additionalInformation,
              moreThanFourMonths: !e.target.checked,
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

export default connect(mapStateToProps, actions)(MoreThanFourMonths);
