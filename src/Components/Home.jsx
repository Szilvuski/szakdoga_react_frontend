import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Home.css';

import image1 from '../assets/illustrations/image1.png';
import image2 from '../assets/illustrations/image2.png';
import image3 from '../assets/illustrations/image3.png';
import image4 from '../assets/illustrations/image4.png';
import image5 from '../assets/illustrations/image5.png';
import image6 from '../assets/illustrations/image6.png';
import image7 from '../assets/illustrations/image7.png';
import image8 from '../assets/illustrations/image8.png';
import image9 from '../assets/illustrations/image9.png';
import image10 from '../assets/illustrations/image10.png';


const Home = () => {
  const navigate = useNavigate();

  const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10];

  return (
    <div className="background">
      <h1>Üdvözöllek a kisállat szitter weboldalamon!</h1>
      <button onClick={() => navigate('/menu')}>Kezdés</button>
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`illustration ${index + 1}`}  
          className="random-illustration"        
        />
      ))}
    </div>
  );
};

export default Home;