import React from 'react';
import { Button } from 'react-bootstrap';
import { delUser } from '../Api/allApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function DeleteUser() {
    const navigate = useNavigate();

    const deleteUser=()=>{
        const header = {
            "Content-Type": "application/json",
            "Authorization": `token ${sessionStorage.getItem("token")}`
        };
        delUser(header).then(res=>{
            toast.success('Account deleted')
            navigate('/')
        })



    }

  return (
    <div>
         <Button
                className="btn btn-outline-danger"
                onClick={deleteUser}
                style={{
                    all:'unset'
                  }}
            >
                <i className="fa-solid fa-gear me-3"></i>Delete Account
            </Button>

    </div>
  )
}

export default DeleteUser