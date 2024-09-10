import React, { useEffect, useState } from 'react';
import './Comment.css';
import Header from '../components/Header';
import Nav from 'react-bootstrap/Nav';
import { useNavigate, useParams } from 'react-router-dom';
import { addComment, getComment } from '../Api/allApi';
import { toast } from 'react-toastify';

function Comment() {
   
    const { id } = useParams();  // Correct placement of useParams
    const [commentData, setCommentData] = useState({ comment: "" });
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = () => {
        getComment(id).then(res => {
            console.log(res.data); 
            setComments(res.data);
        }).catch(err => {
            console.error("Error fetching comments:", err);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const header = {
            "Content-Type": "application/json",
            "Authorization": `token ${sessionStorage.getItem("token")}`
        };
       

        if (!commentData.comment) {
            toast.warning('Invalid data');
        } else {
            addComment(id, header, commentData).then(res => {
                console.log(res.data);
                toast.success('Comment added');
                setCommentData({ comment: "" });
                fetchComments();  // Refresh comments after adding a new one
            }).catch(err => {
                console.error("Error adding comment:", err);
            });
        }
    };

    return (
        <div>
            <Header />
            <div className="container">
                <h1 className="d-flex justify-content-center mt-3 mb-3"></h1>

                <Nav variant="tabs" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link href={`/post/${id}`} style={{ backgroundColor: 'transparent',color:'black'}}>Blog</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/comment" style={{ backgroundColor: 'white', color: 'black' }}>
                            Comments
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                <Nav.Link style={{backgroundColor:'transparent',border:'transparent'}} href={`/home`}>Home</Nav.Link>
              </Nav.Item>
                </Nav>

                <div className="comment">
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <div key={index} className="row inner container">
                                <div className="col-8">
                                    <h6 className="mt-2">{comment.user}</h6>
                                    <p className="mt-3">{comment.comment}</p>
                                </div>
                                <div className="col-4">
                                    <p className="d-flex justify-content-end" style={{ fontSize: 'small' }}>{comment.date}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h6 className='ms-3 mt-4'>No comments yet</h6>
                    )}
                </div>
            </div>
            <div className="footer">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Type to comment"
                        value={commentData.comment}
                        onChange={(e) => setCommentData({ comment: e.target.value })}
                    />
                    <button type="submit">
                        <i className="fa-solid fa-circle-arrow-up fa-xl"></i>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Comment;
