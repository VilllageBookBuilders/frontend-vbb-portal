import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';
import { Form, Input } from 'antd';

const Initials = ({ registrationForm, setRegistrationForm }) => {
  return (
    <Form.Item
      name="initials"
      label="Type your initials here to agree to the above"
      rules={[
        {
          required: true,
          message: 'Initials are required.',
        },
      ]}
    >
      <Input
        value={registrationForm.additionalInformation.initials}
        onChange={(e) => {
          const updatedRegForm = {
            ...registrationForm,
            additionalInformation: {
              ...registrationForm.additionalInformation,
              initials: e.target.value,
            },
          };
          setRegistrationForm(updatedRegForm);
        }}
      />
    </Form.Item>
  );
};

const mapStateToProps = (state) => {
  return { registrationForm: state.registrationForm };
};

export default connect(mapStateToProps, actions)(Initials);
