import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';
import { Form, Tooltip, Input } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const Phone = ({ registrationForm, setRegistrationForm }) => {
  return (
    <Form.Item
      name="phone"
      label={
        <span>
          Phone&nbsp;
          <Tooltip title="USA & Canada country code is +1">
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
      }
      rules={[
        {
          required: true,
          message: 'Phone number is required.',
        },
      ]}
    >
      <Input
        // name="phone"
        style={{
          width: '100%',
        }}
        placeholder="+1 (123) 123-4567"
        value={registrationForm.phone}
        onChange={(e) => {
          const updatedRegForm = {
            ...registrationForm,
            phone: e.target.value,
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

export default connect(mapStateToProps, actions)(Phone);
