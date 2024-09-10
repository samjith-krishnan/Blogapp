import React from 'react';
import { Button } from 'react-bootstrap';
import { deletePost } from '../Api/allApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Deletepost({ id, onDelete }) {
    const navigate = useNavigate();
    const uname = sessionStorage.getItem('username');

    const deleteData = () => {
        const header = {
            "Content-Type": "application/json",
            "Authorization": `token ${sessionStorage.getItem("token")}`
        };
        deletePost(id, header).then(res => {
            console.log(res.data);
            toast.success('Post deleted');
            onDelete(id); // Call the parent function to update state
        });
    };

    return (
        <div>
            <Button
                className="btn btn-outline-danger"
                onClick={deleteData}
                style={{ height: '40px', marginLeft: '10px', background: 'transparent' }}
            >
                Delete
            </Button>
        </div>
    );
}

export default Deletepost;
