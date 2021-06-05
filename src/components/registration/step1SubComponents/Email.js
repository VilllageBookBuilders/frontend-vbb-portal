import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';
import { Form, Input } from 'antd';

const Email = ({ registrationForm, setRegistrationForm }) => {
  return (
    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          type: 'email',
          message: 'Please enter a valid email address.',
        },
        {
          required: true,
          message: 'Email is required.',
        },
      ]}
    >
      <Input
        // name="email"
        value={registrationForm.email}
        onChange={(e) => {
          const updatedRegForm = {
            ...registrationForm,
            email: e.target.value,
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

export default connect(mapStateToProps, actions)(Email);
