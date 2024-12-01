import React from 'react';
import { useNavigate } from 'react-router-dom';

const Booking = (props) => {
    const navigate = useNavigate();

    // Check if the user is logged in
    if (!props.loggedIn) {
        // Redirect to the login page if not logged in
        navigate('/login');
        return null; // Prevent rendering the component
    }

    // If logged in, show the booking poll
    const handleBooking = () => {
        alert("Thank you for booking!");
        // Additional booking logic can go here
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Welcome to the Booking Page</h2>
            <p>Would you like to make a booking?</p>
            <button onClick={handleBooking} style={{ marginRight: '10px' }}>
                Yes, Book Now
            </button>
            <button onClick={() => alert("Booking canceled")}>
                No, Maybe Later
            </button>
        </div>
    );
};

export default Booking;
