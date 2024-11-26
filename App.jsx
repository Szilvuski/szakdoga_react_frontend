import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Home from './Components/Home.jsx';
import Menu from './Components/Menu.jsx';
import About from './Components/About.jsx';
import Contact from './Components/Contact.jsx';
import Booking from './Components/Booking.jsx';
import LoginRegister from './Components/LoginRegister.jsx';
import Services from './Components/Services.jsx';
import Sitters from './Components/Sitters.jsx';
import './Styles/App.css';
import './Styles/Transitions.css';

function App() {

  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} timeout={500} classNames="fade">
        <Routes>      
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/loginregister" element={<LoginRegister />} />
          <Route path="/services" element={<Services />} />
          <Route path="/sitters" element={<Sitters />} />      
      </Routes>
      </CSSTransition>
    </TransitionGroup>    
  );
}

export default App;