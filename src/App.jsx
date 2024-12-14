import React, { useState } from 'react';
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
import Profile from './Components/Profile.jsx';
import Pets from './Components/Pets.jsx';
import './Styles/App.css';
import './Styles/Transitions.css';

function App() {
  const location = useLocation();

  
  const [loggedIn, setLoggedin] = useState(false);
  const [user, setUser] = useState(null);

  
  const handleLogin = (userData) => {
    fetch(`http://127.0.0.1:8000/user/${userData.user_id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user data");
        }
      })
      .then((data) => {
        setLoggedin(true);
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  
  const handleLogout = () => {
    setLoggedin(false);
    setUser(null); 
  };

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.pathname}
        timeout={500}
        classNames="fade"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu loggedIn={loggedIn} setLoggedin={setLoggedin} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking loggedIn={loggedIn} />} />
          <Route
            path="/login"
            element={<Login loggedIn={loggedIn} setLoggedin={setLoggedin} onLogin={handleLogin} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/sitters" element={<Sitters />} />
          <Route
            path="/profile"
            element={
              <Profile
                user={user}
                setUser={setUser}
                onLogout={handleLogout}
              />
            }
          />
          <Route
            path="/pets"
            element={
              <Pets
              user={user}
              setUser={setUser}
              />
            }
          />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );}
export default App;
