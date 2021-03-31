import React from 'react';
// import { connect } from 'react-redux';
// import * as actions from '../../redux/actions';
import { Form, Input, Tooltip, Checkbox, Row, Col, Image } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import MenteePicture from '../../images/vbb-mentee-computer.png';

// const { Option } = Select;

export const Step1 = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values: ', values);
  };

  if (props.currentStep !== 1) {
    return null;
  }

  return (
    <div>
      <Row>
        <Col xs={24} sm={24} md={24} lg={16} xl={12}>
          <Form
            form={form}
            name="register"
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              firstname: '',
              lastname: '',
              phone: '',
              email: '',
              newsletter: true,
            }}
            scrollToFirstError
          >
            <Form.Item
              name="firstname"
              label={
                <span>
                  First Name&nbsp;
                  <Tooltip title="i.e. Jane">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              rules={[
                {
                  required: true,
                  message: 'First name is required.',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastname"
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
                  message: 'First name is required.',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
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
                style={{
                  width: '100%',
                }}
                placeholder="+1 (123) 123-4567"
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
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
              <Input />
            </Form.Item>
            <Form.Item
              name="newsletter"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(),
                },
              ]}
            >
              <Checkbox>I would like to receive the VBB newsletter.</Checkbox>
            </Form.Item>
          </Form>
        </Col>
        <Col xs={0} sm={0} md={0} lg={8} xl={12}>
          <div style={{ padding: '0 10px' }}>
            <Image src={MenteePicture}></Image>
          </div>
        </Col>
      </Row>
    </div>
  );
};

// const mapStateToProps = (state) => ({

// })

// export default connect(mapStateToProps)(Step1)
export default Step1;
