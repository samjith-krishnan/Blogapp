import React, { useEffect, useState } from 'react';
import './Comment.css';
import Header from '../components/Header';
import Nav from 'react-bootstrap/Nav';
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import { getMessage, sentMessage } from '../Api/allApi';

function Messages() {
    const { id } = useParams();
    const [messageData, setCommentData] = useState([]);
    const [getMessageSent, setMessageSent] = useState({ message: '', img: null });

    useEffect(() => {
        fetchMessage();
    }, []);

    const fetchMessage = () => {
        const header = {
            "Content-Type": "application/json",
            "Authorization": `token ${sessionStorage.getItem("token")}`
        };

        getMessage(header, id).then(res => {
            console.log(res.data);
            setCommentData(res.data);
        }).catch(err => {
            console.error("Error fetching messages:", err);
            toast.error("Failed to load messages");
        });
    };

    const handleSubmitt = (e) => {
        e.preventDefault();
    
        const header = {
            "Authorization": `token ${sessionStorage.getItem("token")}`
        };
    
        const { message, img } = getMessageSent;
    
        if (!message) {
            toast.error('Please enter a message');
            return;
        }
    
        const messg = new FormData();
        messg.append('message', message);
        if (img) messg.append('img', img);
    
        sentMessage(header,id,messg).then(res => {
            console.log(res.data);
            toast.success('Message sent');
            fetchMessage();  // Refresh messages after sending
        }).catch(err => {
            console.error("Error sending message:", err);
            toast.error('Failed to send message');
        });
    };
    

    return (
        <div>
            <Header />
            <div className="container">
                <h1 className="d-flex justify-content-center mt-3 mb-3">Messages</h1>

                <Nav variant="tabs" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link href='' style={{ backgroundColor: 'transparent', color: 'black' }}>Messages</Nav.Link>
                    </Nav.Item>
                </Nav>

                <div className="message">
                    {messageData.length > 0 ? (
                        messageData.map((message, index) => (
                            <div className="row inner container" key={index}>
                                <div className="col-8">
                                    <h6 className="mt-2">{message.sender}</h6>
                                    <p className="mt-3">{message.message}</p>
                                </div>
                                <div className="col-4">
                                    <p className="d-flex justify-content-end" style={{ fontSize: 'small' }}>{message.created_at}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h6 className='ms-3 mt-4'>No messages yet</h6>
                    )}
                </div>
            </div>
            <div className="footer">
                <form onSubmit={handleSubmitt}>
                    <input
                        type="text"
                        placeholder="Type a message"
                        value={getMessageSent.message}
                        onChange={(e) => setMessageSent({ ...getMessageSent, message: e.target.value })}
                    />
                    
                    <button type="submit">
                        <i className="fa-solid fa-circle-arrow-up fa-xl"></i>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Messages;
