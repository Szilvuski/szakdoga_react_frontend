import React, { useEffect, useState } from 'react';
import '../Styles/Services.css';
import HomeIcon from "../Components/HomeIcon";

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/service') // Adjust endpoint if needed
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching services data');
                }
                return response.json();
            })
            .then(data => {
                const formattedData = data.map(service => ({
                    ...service,
                    price: `${parseInt(service.price, 10)} Ft`, // Remove decimals
                    petType: service.petType === 'N/A (nem állatspecifikus)' ? 'Nem állatspecifikus' : service.petType, // Adjust text
                }));
                setServices(formattedData);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="sitters-container">
            <h1 className="sitters-title">Szolgáltatásaink</h1>
            <p className="services-description">
                <p>Kedves látogató!</p> <p>Az alábbi oldalon tekintheted meg igénybe vehető szolgáltatásainkat. Reméljük, hogy valamelyik elnyeri a tetszésed, és megtalálod köztük kisállatod számára a legmegfelelőbbet.</p>
                <p>Kellemes nézelődést!</p>
            </p>
            <table className="sitters-table">
                <thead>
                    <tr>
                        <th>Szolgáltatás megnevezése</th>
                        <th>Leírás</th>
                        <th>Ár</th>
                        <th>Időtartam/nap</th>
                        <th>Kisállat típus</th>
                    </tr>
                </thead>
                <tbody>
                    {services.length > 0 ? (
                        services.map((service, index) => (
                            <tr key={index}>
                                <td>{service.serviceName}</td>
                                <td>{service.description}</td>
                                <td>{service.price}</td>
                                <td>{service.duration}</td>
                                <td>{service.petType}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">Adatok betöltése...</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <HomeIcon />
        </div>
    );
};

export default Services;
