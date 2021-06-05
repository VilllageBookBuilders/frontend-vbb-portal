import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';
import { Form, Checkbox } from 'antd';

const Convicted = ({ registrationForm, setRegistrationForm }) => {
  return (
    <Form.Item
      name="convicted"
      label="Have you ever been arrested, charged, or convicted of child abuse or molestation of any form"
    >
      {/* Add if yes alert */}
      <Checkbox
        checked={registrationForm.additionalInformation.convicted}
        onChange={(e) => {
          const updatedRegForm = {
            ...registrationForm,
            additionalInformation: {
              ...registrationForm.additionalInformation,
              convicted: e.target.checked,
            },
          };
          setRegistrationForm(updatedRegForm);
        }}
      >
        Yes
      </Checkbox>
      <Checkbox
        checked={!registrationForm.additionalInformation.convicted}
        onChange={(e) => {
          const updatedRegForm = {
            ...registrationForm,
            additionalInformation: {
              ...registrationForm.additionalInformation,
              convicted: !e.target.checked,
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

export default connect(mapStateToProps, actions)(Convicted);
