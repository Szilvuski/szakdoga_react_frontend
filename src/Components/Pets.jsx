import React, { useState, useEffect } from 'react';
import '../Styles/Pets.css';
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import HomeIcon from "../Components/HomeIcon";

const Pets = ({ user }) => {
    const [pets, setPets] = useState([]);
    const [formData, setFormData] = useState({
        type: '',
        petName: '',
        age: '',
        chip_id: '',
        specialNeeds: '',
        user_id: user?.user_id || null // Use user_id from the prop
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        // Ensure user exists before making API calls
        if (user?.user_id) {
            fetch(`http://127.0.0.1:8000/pet?user_id=${user.user_id}`)
                .then(response => response.json())
                .then(data => setPets(data))
                .catch(error => console.error("Error fetching pets:", error));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user?.user_id) {
            setMessage("Felhasználói azonosító hiányzik, nem lehet menteni!");
            return;
        }

        // Validate chip ID
        if (!/^\d{14,}$/.test(formData.chip_id)) {
            setMessage('A chip azonosító minimum 14 számjegyből kell álljon!');
            return;
        }

        // Add a new pet
        fetch(`http://127.0.0.1:8000/pet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...formData, user_id: user.user_id }) // Include user_id explicitly
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Hiba történt a kisállat mentésekor');
                }
                return response.json();
            })
            .then(data => {
                setMessage('Kisállat sikeresen hozzáadva!');
                setPets([...pets, data]); // Add the new pet to the list
                setFormData({ type: '', petName: '', age: '', chip_id: '', specialNeeds: '', user_id: user.user_id });
            })
            .catch(error => setMessage(error.message));
    };

    const handleDeletePet = (pet_id) => {
      if (window.confirm("Biztosan törölni szeretné ezt a kisállatot?")) {
        fetch(`http://127.0.0.1:8000/pet/${pet_id}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Hiba történt a kisállat törlésekor');
            }
            setPets(pets.filter(pet => pet.pet_id !== pet_id)); // Remove pet from the list
            setMessage('Kisállat sikeresen törölve!');
          })
          .catch(error => setMessage(error.message));
      }
    };

    return (
        <div className="pets-container">
            <h2>Kisállatok kezelése</h2>
            <form onSubmit={handleSubmit} className="add-pet-form">
                <div className="dropdown-container">
                    <select
                        name="type"
                        className="dropdown"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Kérlek válassz fajtát</option>
                        <option value="kutya">Kutya</option>
                        <option value="macska">Macska</option>
                        <option value="nyuszi">Nyuszi</option>
                        <option value="tengeri malac">Tengeri malac</option>
                        <option value="egyéb">Egyéb</option>
                    </select>
                </div>
                <div className="input-box">
                    <input
                        type="text"
                        name="petName"
                        placeholder="Az állat neve"
                        value={formData.petName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-box">
                    <input
                        type="number"
                        name="age"
                        placeholder="Az állat életkora"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-box">
                    <input
                        type="text"
                        name="chip_id"
                        placeholder="Chip azonosító"
                        value={formData.chip_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-box">
                    <textarea
                        name="specialNeeds"
                        placeholder="Különleges igények"
                        value={formData.specialNeeds}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button type="submit" className="add-pet-btn">
                    <FaPlusCircle /> Mentés
                </button>
            </form>
            {message && <p className="message">{message}</p>}
            <h3>Rögzített kisállataim</h3>
            {pets.length === 0 ? (
                <p>Önnek még nincs rögzített kisállata.</p>
            ) : (
                <ul className="pet-list">
                    {pets.map((pet) => (
                        <li key={pet.pet_id} className="pet-item">
                            <span>{pet.type} - {pet.petName} ({pet.age} éves)</span>
                            <span>Chip: {pet.chip_id}</span>
                            <span>Különleges igények: {pet.specialNeeds}</span>
                            <button onClick={() => handleDeletePet(pet.pet_id)} className="delete-pet-btn">
                                <FaTrashAlt /> Törlés
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <HomeIcon />
        </div>
    );
};

export default Pets;