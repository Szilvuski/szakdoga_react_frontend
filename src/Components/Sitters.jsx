import React, { useEffect, useState } from 'react';
import '../Styles/Sitters.css';
import man1 from '../assets/man1.jpg';
import man2 from '../assets/man2.jpg';
import man3 from '../assets/man3.jpg';
import woman1 from '../assets/woman1.jpg';
import woman2 from '../assets/woman2.jpg';
import woman3 from '../assets/woman3.jpg';
import woman4 from '../assets/woman4.jpg';
import woman5 from '../assets/woman5.jpg';
import woman6 from '../assets/woman6.jpg';
import woman7 from '../assets/woman7.jpg';

const Sitters = () => {
    const [sitters, setSitters] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/sitter')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Hiba történt az adatok lekérésekor');
                }
                return response.json();
            })
            .then(data => {
                // Assign images randomly or based on specific rows
                const images = data.map((sitter, index) => {
                    if (index === 0) return { ...sitter, image: man1 }; // Row 1
                    if (index === 1) return { ...sitter, image: man2 }; // Row 2
                    if (index === 2) return { ...sitter, image: woman2 }; // Row 3
                    if (index === 3) return { ...sitter, image: woman1 }; // Row 4
                    if (index === 4) return { ...sitter, image: woman4 }; // Row 5
                    if (index === 5) return { ...sitter, image: woman5 }; // Row 6
                    if (index === 6) return { ...sitter, image: woman6 }; // Row 7
                    if (index === 7) return { ...sitter, image: woman3 }; // Row 8    
                    if (index === 8) return { ...sitter, image: woman7 }; // Row 9
                    if (index === data.length - 1) return { ...sitter, image: man3 }; // Row 10 - last row
                });
                setSitters(images);
            })
            .catch(error => console.error('Hiba:', error));
    }, []);

    return (
        <div className="sitters-container">
            <h1 className="sitters-title">Szittereink</h1>
            <p>Az alábbiakban tekintheted meg, hogy szolgáltatásainkat mely kisállat szitterek munkájával tudod igénybe venni.</p>
            <p>Jó nézelődést!</p>
            <table className="sitters-table">
                <thead>
                    <tr>
                        <th>Kép</th>
                        <th>Név</th>
                        <th>Leírás</th>
                        <th>Körzet</th>
                    </tr>
                </thead>
                <tbody>
                    {sitters.length > 0 ? (
                        sitters.map((sitter, index) => (
                            <tr key={index}>
                                <td>
                                    <img
                                        src={sitter.image}
                                        alt={`${sitter.sitterName} képe`}
                                        className="sitter-image"
                                    />
                                </td>
                                <td>{sitter.sitterName}</td>
                                <td>{sitter.description}</td>
                                <td>{sitter.location}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Adatok betöltése...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Sitters;
