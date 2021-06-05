import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';
import { Form, Tooltip, Input } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const LastName = ({ registrationForm, setRegistrationForm }) => {
  return (
    <Form.Item
      name="last-name"
      label={
        <span>
          Last Name&nbsp;
          <Tooltip title="i.e. Doe">
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
      }
      rules={[
        {
          required: true,
          message: 'Last name is required.',
          whitespace: true,
        },
      ]}
    >
      <Input
        // name="last name"
        value={registrationForm.lastName}
        onChange={(e) => {
          const updatedRegForm = {
            ...registrationForm,
            lastName: e.target.value,
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

export default connect(mapStateToProps, actions)(LastName);
