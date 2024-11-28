import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Menu.css';

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

const Menu = () => {

  const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10];
  
  return(
    <div className="menu">
      <h1>Kérjük válasszon az alábbi lehetőségek közül</h1>
      <ul>
          <li><Link to="/about">Rólunk</Link></li>
          <li><Link to="/contact">Kapcsolat</Link></li>
          <li><Link to="/booking">Foglalás</Link></li>
          <li><Link to="/loginregister">Bejelentkezés</Link></li>
          <li><Link to="/services">Szolgáltatások</Link></li>
          <li><Link to="/sitters">Szittereink</Link></li>
      </ul>
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

export default Menu;