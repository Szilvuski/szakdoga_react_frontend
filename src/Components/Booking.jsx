import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Booking.css';
import HomeIcon from "../Components/HomeIcon";

const Booking = ({ loggedIn, setLoggedin }) => {
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [services, setServices] = useState([
        { id: 1, name: "Walking Service" },
        { id: 2, name: "Pet Sitting" },
        { id: 3, name: "Grooming Service" },
    ]);
    const [sitters, setSitters] = useState([
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
    ]);
    const [formData, setFormData] = useState({
        serviceId: "",
        startDate: "",
        endDate: "",
        petName: "",
        sitterId: "",
    });

    useEffect(() => {
        if (loggedIn && localStorage.getItem("redirectTo") === "booking") {
            setShowOptions(false);
            localStorage.removeItem("redirectTo"); // Clear the flag
        }
    }, [loggedIn]);

    const handleOptionSelection = (option) => {
        if (option === "browse") {
            if (!loggedIn) {
                navigate("/menu");
            } else {
                alert("Feel free to browse our services!");
            }
        } else if (option === "login") {
            localStorage.setItem("redirectTo", "booking");
            navigate("/login");
        } else if (option === "booking") {
            setShowOptions(false);
            setShowForm(true);
        }
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!loggedIn) {
            alert("Please log in before booking!");
            navigate('/login');
        } else {
            alert("Booking successfully submitted!");
            // Add API call logic here
        }
    };

    return (
        <div className="booking-container">
            {!loggedIn && showOptions && (
                <>
                    <h2 className="booking-title">Foglalási lehetőségek</h2>
                    <h1>Kérjük válassz az alábbi lehetőségek közül!</h1>
                    <div className="button-group">
                        <button
                            onClick={() => handleOptionSelection("browse")}
                            className="booking-button"
                        >
                            Később szeretnék foglalni, most csak nézelődöm
                        </button>
                        <button
                            onClick={() => handleOptionSelection("login")}
                            className="booking-button"
                        >
                            Most szeretnék foglalni, bejelentkezem!
                        </button>
                    </div>
                </>
            )}

            {loggedIn && !showForm && (
                <>
                    <h2 className="booking-title">A foglalási oldalra érkeztél</h2>
                    <p>Reméljük a főoldal menüpontjaiból már körültekintően tájékozódtál a foglalási lehetőségekről, árakról, valamint szittereinkről.</p>
                    <p>Az alábbi gombra kattintva kezdheted meg a foglalás beküldésének folyamatát.</p>
                    <button
                        onClick={() => handleOptionSelection("booking")}
                        className="booking-button"
                    >
                        Tovább a foglalási űrlaphoz
                    </button>
                </>
            )}

            {showForm && (
                <form
                    onSubmit={handleFormSubmit}
                    className="booking-form"
                >
                    <h3>Foglalási űrlap</h3>
                    <div className="form-group">
                        <label>Szolgáltatás:</label>
                        <select
                            name="serviceId"
                            value={formData.serviceId}
                            onChange={handleFormChange}
                            required
                        >
                            <option value="">Válassz szolgáltatást</option>
                            {services.map((service) => (
                                <option key={service.id} value={service.id}>
                                    {service.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Mikortól:</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleFormChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Meddig:</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleFormChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Állat neve:</label>
                        <input
                            type="text"
                            name="petName"
                            value={formData.petName}
                            onChange={handleFormChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Szitter:</label>
                        <select
                            name="sitterId"
                            value={formData.sitterId}
                            onChange={handleFormChange}
                            required
                        >
                            <option value="">Válassz szittert</option>
                            {sitters.map((sitter) => (
                                <option key={sitter.id} value={sitter.id}>
                                    {sitter.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="submit-button">
                        Foglalás beküldése
                    </button>
                </form>
            )}
            <HomeIcon />
        </div>
    );
};

export default Booking;
