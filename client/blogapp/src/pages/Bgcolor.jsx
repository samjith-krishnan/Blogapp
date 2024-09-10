import React, { useState } from 'react'
import { Button } from 'react-bootstrap';


function Bgcolor() {
    const [isBlack, setIsBlack] = useState(false);
    const toggleColor = () => {
      const newColor = isBlack ? 'hsl(252,40%,95%)' : '#222831';
      setIsBlack(!isBlack);
      document.body.style.backgroundColor = newColor;
      
    };
  return (
    <div>
        <Button onClick={toggleColor} style={{
                    all:'unset'
                  }}><i className="fa-solid fa-palette me-3"></i>Theme</Button>
    </div>
  )
}

export default Bgcolor