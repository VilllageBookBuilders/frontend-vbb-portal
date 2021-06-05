import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';
import { Form, Select } from 'antd';
import moment from 'moment-timezone';

const TimeZone = ({ registrationForm, setRegistrationForm }) => {
  const { Option } = Select;
  return (
    <Form.Item
      name="timezone"
      label="What timezone are you in"
      rules={[
        {
          required: true,
          message: 'Timezone is required.',
        },
      ]}
    >
      <Select
        value={registrationForm.timeZone}
        onChange={(e) => {
          const updatedRegForm = {
            ...registrationForm,
            timeZone: e,
          };
          setRegistrationForm(updatedRegForm);
        }}
      >
        {/* Need to update timezone drop downs */}
        {moment.tz.names().map((tz) => {
          if (tz.includes('Etc/GMT')) return null;
          return (
            <Option key={tz} value={tz}>
              {tz}
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );
};

const mapStateToProps = (state) => {
  return { registrationForm: state.registrationForm };
};

export default connect(mapStateToProps, actions)(TimeZone);
