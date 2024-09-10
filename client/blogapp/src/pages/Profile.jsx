import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';
import { addPost, addProfile, getDetail, logUser } from '../Api/allApi'; // Import logUser
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { Card, Col, Row } from 'react-bootstrap';
import Deletepost from './Deletepost';
import Bgcolor from './Bgcolor';
import EditProfile from './EditProfile';
import AddProfile from './Addprofile';
import DeleteUser from './DeleteUser';

function Profile() {
  const navigate=useNavigate()
  const uname = sessionStorage.getItem('username');

  // State to store logged-in user's profile data
  const [userProfile, setUserProfile] = useState({
    dp: null,
    username: '',
    bio: ''
  });

  const [getNewpost, setNewPost] = useState({
    title: '', image: null, blog: ''
  });

  const [detail, setDetail] = useState([]);

  const baseUrl = 'http://localhost:8000';
  const imageUrl = userProfile.dp ? `${baseUrl}${userProfile.dp}` : null;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchUserProfile();
    fetchUserPosts();
  }, []);

  // Function to fetch logged-in user's profile details
  const fetchUserProfile = () => {
    const header = {
      "Content-Type": "application/json",
      "Authorization": `token ${sessionStorage.getItem("token")}`
    };

    logUser(header).then(res => {
      setUserProfile(res.data); // Set the fetched user profile data in userProfile state
      
      
    }).catch(err => {
      console.error(err);
      toast.error('Failed to fetch user profile details');
    });
  };

  // Function to fetch user posts
  const fetchUserPosts = () => {
    const header = {
      "Content-Type": "application/json",
      "Authorization": `token ${sessionStorage.getItem("token")}`
    };
    getDetail(header).then(res => {
      setDetail(res.data);
    }).catch(err => {
      console.error(err);
      toast.error('Failed to fetch posts');
    });
  };

  const formSub = (e) => {
    e.preventDefault();
    const header = {
      "Content-Type": "multipart/form-data",
      "Authorization": `token ${sessionStorage.getItem("token")}`
    };
    const { title, blog, image } = getNewpost;
    if (!title || !blog || !image) {
      toast.error('All fields are required');
    } else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("blog", blog);
      formData.append("image", image);

      addPost(header, formData).then(res => {
        setShow(false);
        setNewPost({ title: '', image: null, blog: '' }); 
        toast.success('Post added successfully!');
        fetchUserPosts();  
      }).catch(err => {
        console.error(err);
        
        toast.error('Failed to add post');
      });
    }
  };
  const handleProf = () => {
    navigate(`/addprof/${uname}`); 
  };
  const handlePostDelete = (deletedPostId) => {
    setDetail(detail.filter(post => post.id !== deletedPostId));
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
                <li className="menu-list ms-3">
                <i className="fa-solid fa-heart me-2"></i> <Link to={'/user/liked'}>liked Post</Link>
                </li>
                <li className="menu-list list-group-item">
                  <Bgcolor/>
                </li>
                <li className="menu-list list-group-item">
                  <DeleteUser/>
                </li>
              </ul>
            </div>
          </Col>

          <Col md={6}>
            <div className="user-detail mt-1">
              {
                detail.length > 0 ?
                  detail.map((item, index) => (
                    <Card className="post mt-4" key={item.id || index}>
                      <Card.Body className='align-items-center'>
                        <Card.Title>{item.title}</Card.Title>
                        <div className='d-flex'>
                          <Link to={`/post/${item.id}`} className="btn btn-outline-primary" style={{ height: '40px', marginLeft: '380px' }}>View Post</Link>
                          <Deletepost id={item.id} onDelete={handlePostDelete} />
                        </div>
                      </Card.Body>
                    </Card>
                  ))
                  :
                  <h4 className='mt-4 text-center'>Add a post to see it here</h4>
              }
            </div>
            <div className="add-icon">
              <Button variant="primary" className="butn-add ms-auto" onClick={handleShow}><i className="fa-solid fa-plus text"></i></Button>
            </div>
          </Col>

          <Col md={3} className="d-none d-md-block">
            <div className="menu mt-5">
              <div className="user-profile p-3">
                <div className="profile-picture"  onClick={handleProf}  style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '100px',
                  width: '100px',
                  borderRadius: '50%',
                  margin: '0 auto'
                }}>
                  
                </div>
                <div className='edit-icon'><AddProfile /><div style={{
                  marginTop:'-27px',
                  zIndex:"revert-layer"
                }}><EditProfile/></div>
                </div>
                <h4 className="text-center mt-3">{userProfile.user}</h4><hr />
                <p className='mb-1'>{userProfile.bio}</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formSub}>
            <Form.Group className="mb-3 me-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter title" 
                value={getNewpost.title}
                onChange={(e) => setNewPost({ ...getNewpost, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3 me-3">
              <Form.Label>Blog Content</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Write your blog here..."
                value={getNewpost.blog}
                onChange={(e) => setNewPost({ ...getNewpost, blog: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3 me-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control 
                type="file"
                onChange={(e) => setNewPost({ ...getNewpost, image: e.target.files[0] })}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Save Post
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Profile;
