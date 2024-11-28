import React, { useState, useEffect } from 'react';
import '../Styles/Login.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const [action, setAction] = useState('');
    const navigate = useNavigate(); // Initialize navigate function

    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        // Add the class to the body when the component mounts
        document.body.classList.add('login-register');
        // Remove the class from the body when the component unmounts
        return () => document.body.classList.remove('login-register');
    }, []);

    const loginLink = () => {
        setAction('');
    };    

    return (
        <div className="login-container">
            <h2>Bejelentkezés</h2>
            <form>
                <div className="input-box">
                    <input type="text" placeholder="Felhasználónév" required />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Jelszó" required />
                    <FaLock className="icon" />
                </div>
                <div className="remember-forgot">
                    <label>
                        <input type="checkbox" />
                        Emlékezz rám
                    </label>
                    <a href="#">Elfelejtett jelszó?</a>
                </div>
                <button type="submit">Bejelentkezés</button>
                <div className="register-link">
                    <p>
                        Nincs még fiókja?{' '}
                        <button onClick={() => navigate('/register')}>Regisztráljon!</button>
                    </p>
                </div>
            </form>
        </div>
    );
};
export default Login;
