import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Booking.css';
import HomeIcon from "../Components/HomeIcon";

const Booking = ({ loggedIn, user }) => {
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [services, setServices] = useState([]);
    const [sitters, setSitters] = useState([]);
    const [pets, setPets] = useState([]);
    const [formData, setFormData] = useState({
        service_id: "",
        startDate: "",
        endDate: "",
        pet_id: "",
        sitter_id: "",
        user_id: user?.user_id || null,
        totalCost: 0,
        status: "pending",
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (loggedIn && localStorage.getItem("redirectTo") === "booking") {
            setShowOptions(false);
            localStorage.removeItem("redirectTo");
        }
    }, [loggedIn]);

    useEffect(() => {
        if (loggedIn) {
            // Fetch services
            fetch('http://127.0.0.1:8000/service')
                .then(response => response.json())
                .then(data => setServices(data))
                .catch(error => console.error("Error fetching services:", error));

            // Fetch sitters
            fetch('http://127.0.0.1:8000/sitter')
                .then(response => response.json())
                .then(data => setSitters(data))
                .catch(error => console.error("Error fetching sitters:", error));

            // Fetch user's pets
            if (user?.user_id) {
                fetch(`http://127.0.0.1:8000/pet?user_id=${user.user_id}`)
                    .then(response => response.json())
                    .then(data => setPets(data))
                    .catch(error => console.error("Error fetching pets:", error));
            }
        }
    }, [loggedIn, user]);

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

    const calculateTotalCost = () => {
        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);

        if (endDate > startDate && formData.service_id) {
            const selectedService = services.find(service => service.id === parseInt(formData.service_id));
            if (selectedService) {
                const days = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1; // Include both start and end days
                return days * selectedService.price;
            }
        }
        return 0;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!loggedIn) {
            alert("Please log in before booking!");
            navigate('/login');
            return;
        }

        // Calculate total cost
        const totalCost = calculateTotalCost();

        // Submit booking
        fetch('http://127.0.0.1:8000/reservation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                service_id: formData.service_id,
                startDate: formData.startDate,
                endDate: formData.endDate,
                pet_id: formData.pet_id,
                sitter_id: formData.sitter_id,
                user_id: user.user_id,
                status: formData.status,
                totalCost: totalCost,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Hiba történt a foglalás beküldése során.");
                }
                return response.json();
            })
            .then(data => {
                setMessage("Foglalás sikeresen beküldve!");
                setFormData({
                    service_id: "",
                    startDate: "",
                    endDate: "",
                    pet_id: "",
                    sitter_id: "",
                    totalCost: 0,
                    status: "pending",
                });
            })
            .catch(error => setMessage(error.message));
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
                <form onSubmit={handleFormSubmit} className="booking-form">
                    <h3>Foglalási űrlap</h3>
                    <div className="form-group">
                        <label>Szolgáltatás</label>
                        <select
                            name="service_id"
                            value={formData.service_id}
                            onChange={handleFormChange}
                            required
                        >
                            <option value="">Válasszon szolgáltatást</option>
                            {services.map((service) => (
                                <option key={service.service_id} value={service.service_id}>
                                    {service.serviceName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Mikortól</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleFormChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Meddig</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleFormChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Melyik kisállathoz kívánja igénybe venni a szolgáltatást?</label>
                        <select
                            name="pet_id"
                            value={formData.pet_id}
                            onChange={handleFormChange}
                            required
                        >
                            <option value="">Válasszon kisállatot</option>
                            {pets.map((pet) => (
                                <option key={pet.pet_id} value={pet.pet_id}>
                                    {pet.petName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Szitter</label>
                        <select
                            name="sitter_id"
                            value={formData.sitter_id}
                            onChange={handleFormChange}
                            required
                        >
                            <option value="">Válassz szittert</option>
                            {sitters.map((sitter) => (
                                <option key={sitter.id} value={sitter.id}>
                                    {sitter.sitterName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="submit-button">
                        Foglalás beküldése
                    </button>
                    {message && <p className="message">{message}</p>}
                </form>
            )}
            <HomeIcon />
        </div>
    );
};

export default Booking;
