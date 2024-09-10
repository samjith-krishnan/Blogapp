import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Link, useParams } from 'react-router-dom';
import { getCustomerDetail } from '../Api/allApi';
import Nav from 'react-bootstrap/Nav';
import './Post.css';
import LikePost from './LikePost';

function Post() {
  const [getuserDetails, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = () => {
    const header = {
      "Content-Type": "application/json",
      "Authorization": `token ${sessionStorage.getItem("token")}`
    };
    getCustomerDetail(id, header)
      .then(res => {
        setDetails(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching details: ", error);
        setError("Failed to load post details.");
        setLoading(false);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="container">
        {getuserDetails ? (
          <>
            <h1 className='d-flex justify-content-center mt-3 mb-3'>{getuserDetails.title}</h1>

            <Nav variant="tabs" defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link href="/" style={{ backgroundColor: 'white', color: 'black' }}>Blog</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href={`/${getuserDetails.id}/comment`}>Comments</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link style={{backgroundColor:'transparent',border:'transparent'}} href={`/home`}>Home</Nav.Link>
              </Nav.Item>
            </Nav>

            <div className="row gap-5 mt-3 mb-2">
              <div className="col-8 image-div" style={{
                backgroundImage: `url(${getuserDetails.image || 'fallback-image-url'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '400px',
              }}>
              </div>

              <div className="col-3 author-detail">
                <div className="profile row container mt-3">
                  <div className='col-2' style={{
                    backgroundImage: `url(${getuserDetails.author.dp || 'fallback-image-url'})`,
                    backgroundSize: 'cover',
                    border: '1px solid black',
                    height: '60px',
                    width: '60px',
                    borderRadius: '30px'
                  }}>
                  </div>
                  <div className="col name mt-3">
                    <h4>{getuserDetails.author.user}</h4>
                  </div>
                </div>

                <div className="row mt-5">
                  <p>{getuserDetails.author.bio}</p>
                </div>
              </div>
            </div>
            <LikePost id={getuserDetails.id} initialLiked={getuserDetails.like_count} />
            <div className="row blog mt-2">
              <div className='d-flex gap-3'>
                
                <p className='blogg'>{getuserDetails.blog}</p>
              </div>
            </div>
          </>
        ) : (
          <h4>No data available</h4>
        )}
      </div>
    </div>
  );
}

export default Post;
