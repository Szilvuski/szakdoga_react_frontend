import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Home from './Components/Home.jsx';
import Menu from './Components/Menu.jsx';
import About from './Components/About.jsx';
import Contact from './Components/Contact.jsx';
import Booking from './Components/Booking.jsx';
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';
import Services from './Components/Services.jsx';
import Sitters from './Components/Sitters.jsx';
import './Styles/App.css';
import './Styles/Transitions.css';
import { useState } from 'react';

function App() {

  const location = useLocation();
  const [loggedIn, setLoggedin] = useState(false);

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.pathname} // Animáció alapja az útvonal
        timeout={500}
        classNames="fade"
      >
        <Routes>      
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu loggedIn={loggedIn} setLoggedin={setLoggedin} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking loggedIn={loggedIn}/>} />
          <Route path="/login" element={<Login loggedIn={loggedIn} setLoggedin={setLoggedin}/>}  />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/sitters" element={<Sitters />} />      
      </Routes>
      </CSSTransition>
    </TransitionGroup>    
  );
}

export default App;