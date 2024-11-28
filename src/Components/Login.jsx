import React, { useState, useEffect } from 'react';
import '../Styles/Login.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

const LoginRegister = () => {

    const [action, setAction] = useState('');

    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin); // Váltás bejelentkezés és regisztráció között
    };    

    useEffect(() => {
        // Add the class to the body when the component mounts
        document.body.classList.add('login-register');
        // Remove the class from the body when the component unmounts
        return () => document.body.classList.remove('login-register');
    }, []);

    const registerLink = () => {
        setAction(' active');
    };

    const loginLink = () => {
        setAction('');
    };

    return (
        <div className={`wrapper${action}`}>
            {isLogin ? (
                <div className="form-box login">
                    <form>
                        <h1>Bejelentkezés</h1>
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
                                <a href="#" onClick={toggleForm}>
                                    Regisztráljon!
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="form-box register">
                    <form>
                        <h1>Regisztráció</h1>
                        <div className="input-box">
                            <input type="text" placeholder="Teljes név" required />
                            <FaUser className="icon" />
                        </div>
                        <div className="input-box">
                            <input type="text" placeholder="Felhasználónév" required />
                            <FaUser className="icon" />
                        </div>
                        <div className="input-box">
                            <input type="email" placeholder="Email" required />
                            <FaEnvelope className="icon" />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Jelszó" required />
                            <FaLock className="icon" />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Jelszó újra" required />
                            <FaLock className="icon" />
                        </div>
                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" />
                                Elfogadom az általános szerződési feltételeket
                            </label>
                        </div>
                        <button type="submit">Regisztráció</button>
                        <div className="register-link">
                            <p>
                                Van már fiókja?{' '}
                                <a href="#" onClick={toggleForm}>
                                    Bejelentkezés
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default LoginRegister;