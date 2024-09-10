import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addLike } from '../Api/allApi';

function LikePost({ id, initialLiked, initialLikeCount }) {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  useEffect(() => {
    // Optionally, you can fetch the initial like count if it's not passed as a prop
  }, []);

  const toggleLike = () => {
    const header = {
      "Content-Type": "application/json",
      "Authorization": `token ${sessionStorage.getItem("token")}`
    };

    addLike(id, header).then(res => {
      console.log(res.data);
      
      setLiked(!liked);
      setLikeCount(likeCount + (liked ? -1 : 1));
      
      toast.success(liked ? 'Like removed' : 'Liked');
      
      
      setTimeout(() => {
        window.location.reload();
      }, 100); 
    }).catch(err => {
      console.error(err);
      toast.error('Failed to update like');
    });
  };

  return (
    <div>
      <Button
        className='btn btn-outline-danger'
        onClick={toggleLike}
        style={{ height: '40px', marginLeft: '10px', background: 'transparent', border: 'transparent' }}
      >
        <i className="fa-solid fa-heart"></i> {initialLiked} 
      </Button>
    </div>
  );
}

export default LikePost;
