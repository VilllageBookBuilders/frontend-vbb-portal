import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import { Card, Col, Row, Button, Alert } from 'antd';

import articulate from '../images/articulate-icon.png';
import meet from '../images/meet-icon.webp';
import classroom from '../images/classroom-icon.png';
import village from '../images/village.png';
import facebook from '../images/facebook-icon.png';
import idroo from '../images/idroo-icon.png';
import khan from '../images/khan-icon.jpg';

const Dashboard = ({ getSessionInfo, user }) => {

  const { Meta } = Card;
  // const { Content } = Layout;

  const onAlertClose = (e) => {
    console.log(e, 'Alert was closed.');
  };

  // useEffect (() => {
  //   if (user.externalId) {
  //     getSessionInfo(user.externalId)
  //   }
  // },[user])

  //Todo: Temporarily make and empty sessionslot array in the store

  return (
    <div>
      <h1>
        Weekly Mentoring Session
      </h1>
      {/* {sessionslots && sessionslots.length > 0 ? (
            <ul>
              {sessionslots.map((apt) => {
                console.log(apt);
                return (
                  <li key={apt.id} value={apt.event_id}>
                    <a href={`/sessiondetails/${apt.id}/`}>{apt.display}</a>
                  </li>
                );
              })}
            </ul>
          ) : ( */}
            <div>
            <Alert
              style={{ margin: '1rem 0 1rem 0' }}
              message="Uh oh! You don't have any mentoring sessions booked yet."
              type="warning"
              closable
              showIcon
              onClose={onAlertClose}
            />
              <Button
                style={{ margin: '1rem 1rem 1rem 0' }}
                type="primary"
                href="/booking/"
                target="_blank"
                rel="noreferrer" 
              >Book a Mentoring Session</Button>
              <Button
                style={{ margin: '0 0 2rem 0' }}
                href="https://calendar.google.com/calendar/r"
                target="_blank"
                rel="noreferrer"
              >
                View Your Calendar
              </Button>
              <p>
                If you would like to change a mentoring session or have any mentoring-related questions, please
                <a
                href="mailto:mentor@villagebookbuilders.org"
                style={{ marginLeft: '5px' }}
                >
                  contact your mentor advisor
                </a>
                .
              </p>
            </div>
      {/* <MentorProfile /> */}
      <h1 style={{ paddingTop: '2rem' }}>
        Resources
      </h1>
      <div>
          <Row>
            <Col sm={12} md={12} lg={6} xl={6}>
              <a href='https://360.articulate.com/review/content/73bf3afe-47f9-4f9f-aa4d-70bf27fbe8d5/review' target='_blank' rel="noreferrer">
                <Card
                  style={{ width: 200 }}
                  cover={
                    <img
                      alt="Articulate logo"
                      src={articulate}
                    />
                  }
                >
                  <Meta
                    title="Mentor Training"
                    description="Access your training modules here."
                  />
                </Card>,
              </a>
            </Col>
            <Col sm={12} md={12} lg={6} xl={6}>
              <a href='https://docs.google.com/document/d/e/2PACX-1vR5-WnzhSJ88pfh2yctr7JuRXglAD55q8eluMPnLA1fTIyeKxxrGvL4r7D7wZh8mvd6WTL9GJJ1tkdD/pub' target='_blank' rel="noreferrer">
                <Card
                    style={{ width: 200 }}
                    cover={
                      <img
                      alt="Village Book Builders logo"
                      src={village}
                    />
                    }
                  >
                    <Meta
                      title="Mentoring Guide"
                      description="View the Village Book Builders mentor guide."
                    />
                  </Card>,
                </a>
              </Col>
              <Col sm={12} md={12} lg={6} xl={6}>
                <a href='https://idroo.com/' target='_blank' rel="noreferrer">
                  <Card
                    style={{ width: 200 }}
                    cover={
                      <img
                      alt="IDroo logo"
                      src={idroo}
                      />
                    }
                  >
                    <Meta
                      title="Whiteboard"
                      description="Whiteboard during your mentoring session."
                    />
                  </Card>,
                </a>
              </Col>
              <Col sm={12} md={12} lg={6} xl={6}>
                <a href='https://www.khanacademy.org/' target='_blank' rel="noreferrer">
                  <Card
                    style={{ width: 200 }}
                    cover={
                      <img
                      alt="Khan Academy logo"
                      src={khan}
                    />
                    }
                  >
                    <Meta
                      title="Khan Academy"
                      description="Leverage online courses and lesson material."
                    />
                  </Card>,
                </a>
              </Col>
              <Col sm={12} md={12} lg={6} xl={6}>
                <a href='https://classroom.google.com/u/0/h' target='_blank' rel="noreferrer">
                  <Card
                    style={{ width: 200 }}
                    cover={
                      <img
                      alt="Google classroom logo"
                      src={classroom}
                      />
                    }
                  >
                    <Meta
                      title="Google Classroom"
                      description="Organize student work."
                    />
                  </Card>,
                </a>
              </Col>
              <Col sm={12} md={12} lg={6} xl={6}>
                <a href='https://apps.google.com/meet/' target='_blank' rel="noreferrer">
                  <Card
                    style={{ width: 200 }}
                    cover={
                      <img
                      alt="Google Meet logo"
                      src={meet}
                      />
                    }
                  >
                    <Meta
                      title="Google Meet"
                      description="Meet with your mentee."
                    />
                  </Card>,
                </a>
              </Col>
              <Col sm={12} md={12} lg={6} xl={6}>
                <a href='https://www.facebook.com/groups/villagementors' target='_blank' rel="noreferrer">
                  <Card
                    style={{ width: 200 }}
                    cover={
                      <img
                      alt="Facebook logo"
                      src={facebook}
                      />
                    }
                  >
                    <Meta
                      title="VBB Mentors"
                      description="Join the Village Book Builders mentor Facebook group."
                    />
                  </Card>,
                </a>
              </Col>
          </Row>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
  token: state.authToken,
  user: state.user
  };
};

export default connect(mapStateToProps, actions)(Dashboard);
