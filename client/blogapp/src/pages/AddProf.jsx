
import Header from '../components/Header';
import { Link, Navigate } from 'react-router-dom';
import './Profile.css';

import { Card, Col, Row } from 'react-bootstrap';

import Bgcolor from './Bgcolor';


import './Home.css'
import Profile from './Profile';
import AddProfile from './Addprofile';


function AddProf() {
  return (
    <div>
        <Profile/>
      <div className="container mt-5">
        <Row>
          <Col md={3}>
            <div className="menu" id="left-menu">
              <ul className="list-group">
                <li className="menu-list list-group-item">
                  <Link to="/home"><i className="fa-solid fa-house me-3"></i>Home</Link>
                </li>
                <li className="menu-list list-group-item">
                  <Link to="/explore"><i className="fa-regular fa-compass me-3"></i>Explore</Link>
                </li>
                <li className="menu-list list-group-item">
                  <Link to="/notifications"><i className="fa-solid fa-bell me-3"></i>Notification</Link>
                </li>
                <li className="menu-list list-group-item">
                  <Link to="/messages"><i className="fa-regular fa-message me-3"></i>Message</Link>
                </li>
                <li className="menu-list list-group-item">
                  <Bgcolor/>
                </li>
                <li className="menu-list list-group-item">
                  <Link to="/settings"><i className="fa-solid fa-gear me-3"></i>Settings</Link>
                </li>
              </ul>
            </div>
          </Col>

          <Col md={6}>
            
            
          </Col>

          <Col md={3} className="d-none d-md-block">
            <div className="menu mt-5">
              <div className="user-profile p-3">
                <div className="profile-picture" style={{
                
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '100px',
                  width: '100px',
                  borderRadius: '50%',
                  margin: '0 auto'
                }}>
                  <div className='edit-icon'><AddProfile/></div>
                </div>
                
              </div>
            </div>
          </Col>
        </Row>
      </div>

     
    </div>
  )
}

export default AddProf