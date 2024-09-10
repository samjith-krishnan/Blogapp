import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getOther } from '../Api/allApi';
import Header from '../components/Header';
import { Col, Row, Card, Button } from 'react-bootstrap';


function Others() {
  const [profile, setProfile] = useState({
    dp: null, username: '',id:''
  });

  const baseUrl = 'http://localhost:8000';
  const imageUrl = `${baseUrl}${profile.dp}`;

  // Initialize getNext as an empty array to avoid null errors
  const [getNext, setNext] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getOtheruser();
  }, []);

  const getOtheruser = () => {
    const header = {
      "Content-Type": "application/json",
      "Authorization": `token ${sessionStorage.getItem("token")}`
    };

    getOther(id, header).then(res => {
      if (res.data.length > 0) {
        setProfile(res.data[0].author);
        console.log(res.data[0].author);
      }
      console.log(res.data);
      setNext(res.data); // This will be an array, so no need to check for length here
    }).catch(error => {
      console.error("Error fetching details: ", error);
    });
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <Row>
          <Col md={3}>
            <div className="menu" id="left-menu">
              <ul className="list-group">
                <li className="menu-list list-group-item">
                  <Link to="/home"><i className="fa-solid fa-house me-3"></i>Home</Link>
                </li>
               
               
                <li className="menu-list list-group-item">
                  <Link to="/theme"><i className="fa-solid fa-palette me-3"></i>Theme</Link>
                </li>
                <li className="menu-list list-group-item">
                  <Link to="/settings"><i className="fa-solid fa-gear me-3"></i>Settings</Link>
                </li>
              </ul>
            </div>
          </Col>

          <Col md={6}>
            <div className='dp d-flex align-items-center p-3'>
              <div className="d-flex justify-content-center align-items-center">
                <div className="prof" style={{
                  backgroundImage: `url(${imageUrl})`
                }}>
                </div>
              </div>

              <div className="ms-4">
                <h4>{profile.user}</h4>
              </div>
            </div>

            <div className="user-detail mt-1">
              {getNext.length > 0 ? (
                getNext.map((item, index) => (
                  <Card className="post mt-4" key={item.id || index}>
                    <Card.Body className='d-flex justify-content-between align-items-center'>
                      <Card.Title>{item.title}</Card.Title>
                      <Link to={`/post/${item.id}`} className="btn btn-outline-primary" style={{
                        height: '40px'
                      }}>View</Link>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <h4 className='mt-4 text-center'>Add a post to see it here</h4>
              )}
            </div>
          </Col>

          <Col md={3} className="d-none d-md-block">
           
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Others;
