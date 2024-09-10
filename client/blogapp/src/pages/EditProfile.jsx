import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { editProfile } from '../Api/allApi';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';

function EditProfile() {
    const { username } = useParams();
    const navigate = useNavigate();
    const [getProfile, setProfile] = useState({
        bio: "",
        dp: null
    });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getDataProfile = (e) => {
        e.preventDefault();
        const header = {
            "Content-Type": "multipart/form-data",
            "Authorization": `token ${sessionStorage.getItem("token")}`
        };
        const { bio, dp } = getProfile;
        if (!dp || !bio) {
            toast.error('All fields are required');
        } else {
            const profData = new FormData();
            profData.append('dp', dp);
            profData.append('bio', bio);

            editProfile(header, profData).then(res => {
                console.log(res.data);
                toast.success('Profile Updated successfully');
                handleClose();
                navigate(`/profile/${username}`);
                // Refresh the page to show updated profile
                window.location.reload();
            }).catch(err => {
                console.error(err);
                toast.error('Failed to Update profile');
            });
        }
    }

    return (
        <div>
            <Button onClick={handleShow}>
                <i className="fa-solid fa-pencil"></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={getDataProfile}>
                        <Form.Group className="mb-3 me-3">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter bio"
                                value={getProfile.bio}
                                onChange={(e) => setProfile({ ...getProfile, bio: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 me-3">
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control
                                type="file"
                                placeholder="Upload dp"
                                onChange={(e) => setProfile({ ...getProfile, dp: e.target.files[0] })}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Save Profile
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default EditProfile;
