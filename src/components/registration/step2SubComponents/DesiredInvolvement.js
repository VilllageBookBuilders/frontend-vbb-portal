import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';
import { Form, Checkbox, Row, Col } from 'antd';

const DesiredInvolvement = ({ registrationForm, setRegistrationForm }) => {
  return (
    <Form.Item label="How would you like to get more involved?">
      <Row>
        <Col span={16}>
          <Checkbox
            checked={
              registrationForm.additionalInformation.desiredInvolvement
                .fundraiser
            }
            onChange={(e) => {
              const updatedRegForm = {
                ...registrationForm,
                additionalInformation: {
                  ...registrationForm.additionalInformation,
                  desiredInvolvement: {
                    ...registrationForm.additionalInformation
                      .desiredInvolvement,
                    fundraiser: e.target.checked,
                  },
                },
              };
              setRegistrationForm(updatedRegForm);
            }}
          >
            Run or help with a fundraiser
          </Checkbox>
        </Col>
        <Col span={16}>
          <Checkbox
            checked={
              registrationForm.additionalInformation.desiredInvolvement.advocate
            }
            onChange={(e) => {
              const updatedRegForm = {
                ...registrationForm,
                additionalInformation: {
                  ...registrationForm.additionalInformation,
                  desiredInvolvement: {
                    ...registrationForm.additionalInformation
                      .desiredInvolvement,
                    advocate: e.target.checked,
                  },
                },
              };
              setRegistrationForm(updatedRegForm);
            }}
          >
            Be a social media advocate
          </Checkbox>
        </Col>
        <Col span={16}>
          <Checkbox
            checked={
              registrationForm.additionalInformation.desiredInvolvement
                .mentorChapter
            }
            onChange={(e) => {
              const updatedRegForm = {
                ...registrationForm,
                additionalInformation: {
                  ...registrationForm.additionalInformation,
                  desiredInvolvement: {
                    ...registrationForm.additionalInformation
                      .desiredInvolvement,
                    mentorChapter: e.target.checked,
                  },
                },
              };
              setRegistrationForm(updatedRegForm);
            }}
          >
            Start / join a mentors chapter
          </Checkbox>
        </Col>
        <Col span={16}>
          <Checkbox
            checked={
              registrationForm.additionalInformation.desiredInvolvement.bookClub
            }
            onChange={(e) => {
              const updatedRegForm = {
                ...registrationForm,
                additionalInformation: {
                  ...registrationForm.additionalInformation,
                  desiredInvolvement: {
                    ...registrationForm.additionalInformation
                      .desiredInvolvement,
                    bookClub: e.target.checked,
                  },
                },
              };
              setRegistrationForm(updatedRegForm);
            }}
          >
            Start / Join a book club
          </Checkbox>
        </Col>
        <Col span={16}>
          <Checkbox
            checked={
              registrationForm.additionalInformation.desiredInvolvement.research
            }
            onChange={(e) => {
              const updatedRegForm = {
                ...registrationForm,
                additionalInformation: {
                  ...registrationForm.additionalInformation,
                  desiredInvolvement: {
                    ...registrationForm.additionalInformation
                      .desiredInvolvement,
                    research: e.target.checked,
                  },
                },
              };
              setRegistrationForm(updatedRegForm);
            }}
          >
            Research
          </Checkbox>
        </Col>
        <Col span={16}>
          <Checkbox
            checked={
              registrationForm.additionalInformation.desiredInvolvement.other
            }
            onChange={(e) => {
              const updatedRegForm = {
                ...registrationForm,
                additionalInformation: {
                  ...registrationForm.additionalInformation,
                  desiredInvolvement: {
                    ...registrationForm.additionalInformation
                      .desiredInvolvement,
                    other: e.target.checked,
                  },
                },
              };
              setRegistrationForm(updatedRegForm);
            }}
          >
            Other
          </Checkbox>
        </Col>
      </Row>
    </Form.Item>
  );
};

const mapStateToProps = (state) => {
  return { registrationForm: state.registrationForm };
};

export default connect(mapStateToProps, actions)(DesiredInvolvement);
