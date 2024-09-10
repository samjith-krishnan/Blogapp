import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {  userLiked } from '../Api/allApi';
import Header from '../components/Header';
import { Col, Row, Card, Button } from 'react-bootstrap';
import Bgcolor from './Bgcolor';


function UserLiked() {
  const logOut=()=>{
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('username')
    toast.success('logout success')
    navigate('/')


  }
    const [getLiked,setLiked]=useState({})
    useEffect(()=>{
        getLikedPost()
    })
    const getLikedPost=()=>{
        const header = {
            "Content-Type": "application/json",
            "Authorization": `token ${sessionStorage.getItem("token")}`
          };

          userLiked(header).then(res=>{
            setLiked(res.data)

          })
    }

  return (
    <div>
        <div className="container mt-5">
        <Row>
          <Col md={3}>
          <div className="menu mt-4" id='prof'>
              <ul>
              <li className="menu-list list-group-item">
                  <Link to="/home"><i className="fa-solid fa-house me-3"></i>Home</Link>
                </li>

                

                <li className="menu-list">
                <i className="fa-solid fa-heart me-2"></i> <Link to={'/user/liked'}>liked Post</Link>
                </li>

                <li className="menu-list">
                  <Bgcolor/>
                </li>

                <li className="menu-list">
                  <Button style={{
                    all:'unset'
                  }} onClick={logOut}><i className="fa-solid fa-gear me-3"></i>logout</Button>
                </li>
              </ul>
            </div>
          </Col>

          <Col md={6}>
           

            <div className="user-detail mt-1">
              {getLiked.length > 0 ? (
                getLiked.map((item, index) => (
                  <Card className="post mt-4" key={item.id || index}>
                    <Card.Body className='d-flex justify-content-between align-items-center'>
                      <Card.Title>{item.title}</Card.Title>
                      <Link to={`/post/${item.id}`} className="btn btn-outline-primary" style={{
                        height: '40px',
                        width:'120px'
                      }}>View Post</Link>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <h4 className='mt-4 text-center'>No liked post</h4>
              )}
            </div>
          </Col>

          
        </Row>
      </div>
    </div>
  )
}

export default UserLiked