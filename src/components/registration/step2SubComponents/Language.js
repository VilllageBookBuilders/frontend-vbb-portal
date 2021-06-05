import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';
import { Form, Checkbox, Row } from 'antd';

//@todo: not sure if we want to do something fancier iteration
//biggest concern is how we track that without typescript so that the
//store doesn't get out of sync with the store

const Language = ({ registrationForm, setRegistrationForm }) => {
  return (
    <Form.Item
      name="language"
      label="Which languages can you speak comfortably"
      valuePropName="checked"
      rules={[
        () => ({
          validator(_) {
            if (
              registrationForm.additionalInformation.language.english ||
              registrationForm.additionalInformation.language.spanish ||
              registrationForm.additionalInformation.language.french ||
              registrationForm.additionalInformation.language.german
            ) {
              console.log('registration form filled');
              return Promise.resolve();
            } else {
              console.log('registration form not filled');
              return Promise.reject(
                new Error('Please select at least one language.')
              );
            }
          },
        }),
      ]}
    >
      <Checkbox
        name="english"
        checked={registrationForm.additionalInformation.language.english}
        onChange={(e) => {
          const updatedRegForm = {
            ...registrationForm,
            additionalInformation: {
              ...registrationForm.additionalInformation,
              language: {
                ...registrationForm.additionalInformation.language,
                english: e.target.checked,
              },
            },
          };
          setRegistrationForm(updatedRegForm);
        }}
      >
        English
      </Checkbox>
      <Checkbox
        checked={registrationForm.additionalInformation.language.spanish}
        onChange={(e) => {
          const updatedRegForm = {
            ...registrationForm,
            additionalInformation: {
              ...registrationForm.additionalInformation,
              language: {
                ...registrationForm.additionalInformation.language,
                spanish: e.target.checked,
              },
            },
          };
          setRegistrationForm(updatedRegForm);
        }}
      >
        Spanish
      </Checkbox>
      <Checkbox
        checked={registrationForm.additionalInformation.language.french}
        onChange={(e) => {
          const updatedRegForm = {
            ...registrationForm,
            additionalInformation: {
              ...registrationForm.additionalInformation,
              language: {
                ...registrationForm.additionalInformation.language,
                french: e.target.checked,
              },
            },
          };
          setRegistrationForm(updatedRegForm);
        }}
      >
        French
      </Checkbox>
      <Checkbox
        checked={registrationForm.additionalInformation.language.german}
        onChange={(e) => {
          const updatedRegForm = {
            ...registrationForm,
            additionalInformation: {
              ...registrationForm.additionalInformation,
              language: {
                ...registrationForm.additionalInformation.language,
                german: e.target.checked,
              },
            },
          };
          setRegistrationForm(updatedRegForm);
        }}
      >
        German
      </Checkbox>
      {/* Need to update with languages in backend */}
    </Form.Item>
  );
};

const mapStateToProps = (state) => {
  return { registrationForm: state.registrationForm };
};

export default connect(mapStateToProps, actions)(Language);
