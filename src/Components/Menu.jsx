import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
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

const Menu = (props) => {

  const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10];

  console.log(props.loggedIn)

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = (e) => {
    if (!e.target.closest(".user-icon-container")) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);
  
  return(
    <div className="menu">
      <h1>Kérjük válasszon az alábbi lehetőségek közül</h1>
      <h2>logged state : {props.loggedIn? "loggedIn" : "notLoggedIn"}</h2>
      <ul>
          <li><Link to="/about">Rólunk</Link></li>
          <li><Link to="/contact">Kapcsolat</Link></li>
          <li><Link to="/booking">Foglalás</Link></li>
          <li><Link to="/services">Szolgáltatások</Link></li>
          <li><Link to="/sitters">Szittereink</Link></li>
      </ul>

      {/* User Icon and Dropdown */}
      <div className="user-icon-container">
        <FaUser className="user-icon" onClick={toggleDropdown} />
        {(showDropdown && props.loggedIn==false) &&(
          <div className="dropdown-menu">
            <Link to="/login">Bejelentkezés</Link>
            <Link to="/register">Regisztráció</Link>
          </div>
        )}
        {(showDropdown && props.loggedIn) &&(
          <div className="dropdown-menu">
            <Link to="/menu" onClick={() => props.setLoggedin(false)}>Kijelentkezés</Link>
          </div>
        )}
      </div>

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