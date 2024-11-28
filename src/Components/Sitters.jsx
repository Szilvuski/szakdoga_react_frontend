import React, {useEffect, useState} from 'react';
import '../Styles/Sitters.css';

const Sitters = () => {
    const [sitters, setSitters] = useState([]);

    useEffect(() => {
        // Fetch API hívás a Django backendhez
        fetch('http://127.0.0.1:8000/sitter')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Hiba történt az adatok lekérésekor');
                }
                return response.json();
            })
            .then(data => setSitters(data))
            .catch(error => console.error('Hiba:', error));
    }, []);

    return (
        <div className="sitters-container">
            <h1>Szittereink</h1>
            {sitters.length > 0 ? (
                sitters.map((sitter, index) => (
                    <div key={index} className="sitter-card">
                        <h2>{sitter.sitterName}</h2>
                        <p>{sitter.description}</p>
                        <p><strong>Elsődlegesen megbízásokat vállalnak:</strong> {sitter.location} területén belül</p>
                    </div>
                ))
            ) : (
                <p>Adatok betöltése...</p>
            )}
        </div>
    );
};

export default Sitters;