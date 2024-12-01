import React, { useState, useEffect } from 'react';
import '../Styles/Login.css';
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useNavigate} from 'react-router-dom';

const Login = (props) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('login-register');
        return () => document.body.classList.remove('login-register');
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://127.0.0.1:8000/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
            }),
        })
            .then((response) => response.json().then(data => ({ status: response.status, body: data })))
            .then((data) => {
                if (data.status === 200) {
                    setMessage(data.body.message);
                    props.setLoggedin(true);
                    navigate('/menu');
                    // Itt kezelheted a sikeres bejelentkezést (pl. átirányítás)
                    // Példa:
                    // localStorage.setItem('user_id', data.body.user_id);
                    // navigate('/dashboard');
                } else {
                    setMessage(data.body.error || 'Hiba történt a bejelentkezés során!');
                }
            })
            .catch((error) => {
                setMessage("Hiba történt a bejelentkezés során!");
            });
    };

    return (
        <div className="login-container">
            <h2>Bejelentkezés</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <input
                        type="email"
                        name="email"
                        placeholder="E-mail cím"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <FaEnvelope className="icon" />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        name="password"
                        placeholder="Jelszó"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
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
                        <button
                            type="button"
                            onClick={() => navigate('/register')}
                            style={{ background: 'none', border: 'none', color: 'indianred', cursor: 'pointer' }}
                        >
                            Regisztráljon!
                        </button>
                    </p>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
