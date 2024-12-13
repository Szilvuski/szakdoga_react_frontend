import React, { useState, useEffect } from 'react';

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState({ name: '', type: '' });

  useEffect(() => {
    // GET kérés a kisállatok lekéréséhez
    fetch('/api/pets')
      .then(response => response.json())
      .then(data => setPets(data));
  }, []);

  const handleAddPet = (e) => {
    e.preventDefault();
    // POST kérés új kisállat hozzáadásához
    fetch('/api/pets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPet),
    }).then(response => {
      if (response.ok) {
        alert('Kisállat sikeresen hozzáadva!');
        setPets([...pets, newPet]);
        setNewPet({ name: '', type: '' });
      }
    });
  };

  return (
    <div>
      <h2>Rögzített kisállataim</h2>
      {pets.length === 0 ? (
        <p>Önnek még nincs rögzített kisállata.</p>
      ) : (
        <ul>
          {pets.map((pet, index) => (
            <li key={index}>{pet.name} - {pet.type}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleAddPet}>
        <label>
          Kisállat neve:
          <input
            type="text"
            name="name"
            value={newPet.name}
            onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
          />
        </label>
        <label>
          Típusa:
          <input
            type="text"
            name="type"
            value={newPet.type}
            onChange={(e) => setNewPet({ ...newPet, type: e.target.value })}
          />
        </label>
        <button type="submit">Hozzáadás</button>
      </form>
    </div>
  );
};

export default Pets;
