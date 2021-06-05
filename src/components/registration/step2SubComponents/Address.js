import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';
import { Form, Tooltip, Input } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const Address = ({ registrationForm, setRegistrationForm }) => {
  return (
    <Form.Item
      name="address"
      label={
        <span>
          What city and state/province do you live in&nbsp;
          <Tooltip title="i.e. New York, NY">
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
      }
      rules={[
        {
          required: true,
          message: 'Address is required.',
        },
      ]}
    >
      <Input
        value={registrationForm.address}
        onChange={(e) => {
          const updatedRegForm = {
            ...registrationForm,
            address: e.target.value,
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

export default connect(mapStateToProps, actions)(Address);
