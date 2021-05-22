import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import {
    CalendarOutlined,
    FormOutlined,
    HomeOutlined,
    LogoutOutlined,
    UserOutlined,
  } from '@ant-design/icons';
  import { Avatar, Menu } from 'antd';
  import { Link, NavLink } from 'react-router-dom';

  import logo from '../images/vbb-picture-logo.png'

  const SidebarMenu = ({ user, logOut }) => {
    return (
      <>
        <Menu mode="inline" defaultSelectedKeys={['1']}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '2rem 1rem',
            }}
          >
            <Avatar style={{ color: '#FF914D' }} icon={<UserOutlined />} />
            <div style={{ fontSize: '.75rem', padding: '1rem' }}>
              { user.lastName || 'Mentor'}
            </div>
          </div>
          {/* All links are currently pointing to home until we confirm menu items */}
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <NavLink to="/">Home</NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <NavLink to="/">Profile</NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<FormOutlined />}>
            <NavLink to="/booking/">Schedule</NavLink>
          </Menu.Item>
          <Menu.Item key="6" icon={<CalendarOutlined />}>
            <a href="https://calendar.google.com/calendar/r" target='_blank' rel="noreferrer" >Calendar</a>
          </Menu.Item>
          <Menu.Item key="8" icon={<LogoutOutlined />}>
            <Link onClick={ logOut }>Logout</Link>
          </Menu.Item>
        </Menu>
        <div>
          <img
            style={{ padding: '2rem 1rem' }}
            src={ logo }
            alt='VBB logo'
            width="100"
          />
        </div>
      </>
    );
  }

  const mapStateToProps = (state) => {
    return {
    user: state.user
    };
  };

  export default connect(mapStateToProps, actions)(SidebarMenu);