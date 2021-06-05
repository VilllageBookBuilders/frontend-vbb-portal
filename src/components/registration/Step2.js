import React from 'react';
import { Form, Row, Col, Image, Button } from 'antd';
import { RightOutlined, LeftOutlined, CheckOutlined } from '@ant-design/icons';

import ActionPicture from '../../images/vbb-in-action.png';
import IsAdult from './step2SubComponents/IsAdult';
import Occupation from './step2SubComponents/Occupation';
import ReferralSource from './step2SubComponents/ReferralSource';
import Language from './step2SubComponents/Language';
import TimeZone from './step2SubComponents/TimeZone';
import Convicted from './step2SubComponents/Convicted';
import MoreThanFourMonths from './step2SubComponents/MoreThanFourMonths';
import Initials from './step2SubComponents/Initials';
import GetMoreInvolved from './step2SubComponents/GetMoreInvolved';
import Address from './step2SubComponents/Address';
import AgreeTermsAndConditions from './step2SubComponents/AgreeTermsAndConditions';
import DesiredInvolvement from './step2SubComponents/DesiredInvolvement';

export const Step2 = ({ currentStep, nextOnClick, backOnClick }) => {
  if (currentStep !== 2) {
    return null;
  }

  const onFinish = () => {
    nextOnClick();
  };

  const backButton = () => {
    return (
      <Button
        style={{ marginRight: '10px' }}
        type="button"
        onClick={backOnClick}
      >
        <LeftOutlined />
        Back
      </Button>
    );
  };

  const nextButton = () => {
    return (
      <Form.Item name="step2-next" className="submit">
        <Button style={{ marginRight: '10px' }} type="button" htmlType="submit">
          Next
          <RightOutlined />
        </Button>
      </Form.Item>
    );
  };

  return (
    <div>
      <Row>
        <Col xs={24} sm={24} md={24} lg={16} xl={12}>
          <Form
            name="step2-register"
            layout="vertical"
            scrollToFirstError
            onFinish={onFinish}
          >
            <IsAdult />
            <Occupation />
            <ReferralSource />
            <Language />
            <TimeZone />
            <Convicted />
            <MoreThanFourMonths />
            <Initials />
            <GetMoreInvolved />
            <DesiredInvolvement />
            <Address />
            <AgreeTermsAndConditions />
            <Row>
              {backButton()}
              {nextButton()}
            </Row>
          </Form>
        </Col>
        <Col xs={0} sm={0} md={0} lg={8} xl={12}>
          <div style={{ padding: '0 10px' }}>
            <Image src={ActionPicture}></Image>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Step2;
