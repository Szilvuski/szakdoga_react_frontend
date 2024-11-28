import React, { useState } from 'react';
import '../Styles/Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Jelszó megerősítés ellenőrzése
        if (formData.password !== formData.confirmPassword) {
            setMessage('A jelszavak nem egyeznek!');
            return;
        }

        // Fetch API hívás
        fetch('http://127.0.0.1:8000/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullname: formData.fullname,
                username: formData.username,
                email: formData.email,
                password: formData.password
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Hiba történt a regisztráció során');
            }
            return response.json();
        })
        .then(data => {
            setMessage(data.message || 'Regisztráció sikeres!');
        })
        .catch(error => {
            setMessage(error.message);
        });
    };

    return (
        <div className="register-container">
            <h2>Regisztráció</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="fullname"
                    placeholder="Teljes név"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Felhasználónév"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Jelszó"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Jelszó újra"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Regisztráció</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
