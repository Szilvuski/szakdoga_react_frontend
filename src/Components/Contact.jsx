import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Contact.css';
import contact1 from '../assets/contact1.jpeg';
import contact2 from '../assets/contact2.jpeg';

const Contact = () => {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        // Fetch API hívás az adminisztrátorok adatainak lekérésére
        fetch('http://127.0.0.1:8000/user')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Hiba történt az adatok lekérésekor');
                }
                return response.json();
            })
            .then(data => {
                // Szűrés: csak azokat a usereket mutatjuk, akiknek role_id = 1 és nem Arady Szilvia
                const filteredAdmins = data.filter(
                    user => user.role_id === 1 && user.fullname !== 'Arady Szilvia'
                );
                setAdmins(filteredAdmins);
            })
            .catch(error => console.error('Hiba:', error));
    }, []);

    return (
        <div className="contact-container">
            <img src={contact1} alt="Decoration Left" className="contact-image left" />
            <img src={contact2} alt="Decoration Right" className="contact-image right" />
            <h1>Kapcsolat</h1>
            <p>
                Csapatunk lelkes kisállat szitterekből, elkötelezett szakemberekből és profi rendszertervező- és fejlesztő tagokból áll, akiknek mindennapos feladat a szolgáltatások magas minőségben történő biztosítása Ön és kisállata számára.
            </p>
            <p>
                Nézzen szét az oldalunkon bátran! A{' '}
                <Link to="/menu" style={{ color: 'indianred', textDecoration: 'none' }}>főoldalra</Link> visszalépve pontos tájékoztatást kaphat a szolgáltatásokról, valamint szitter csapatunk bemutatkozóját is megtekintheti.
            </p>
            <p>
                Amennyiben bármely kérdésére nem kapott választ a megadott menüpontokból, azonnali kapcsolatfelvételhez keresse rendszerünk első számú megálmodóját és tervezőjét az alábbi elérhetőségeken:
            </p>
            <p>
                <strong>Arady Szilvia</strong><br />
                <strong>Telefon:</strong> +36201234567<br />
                <strong>E-mail:</strong> arady.szilvia@example.com
            </p>
            <p>Egyéb, adminisztráció jellegű kérdésekkel pedig forduljon az alábbi kollégáink bármelyikéhez:</p>
            {admins.length > 0 ? (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Név</th>
                            <th>E-mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin, index) => (
                            <tr key={index}>
                                <td>{admin.fullname}</td>
                                <td>{admin.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Adatok betöltése...</p>
            )}
        </div>
    );
};

export default Contact;
