import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { BiIdCard } from "react-icons/bi";
import { FaPencil } from "react-icons/fa6";
import "../Styles/Profile.css";

const Profile = ({ user, onLogout, setUser }) => {
  const [editingField, setEditingField] = useState(null);
  const [newData, setNewData] = useState("");
  const [message, setMessage] = useState(""); // Feedback message
  const [userData, setUserData] = useState({
    fullname: user?.fullname || "John Doe",
    username: user?.username || "johndoe123",
    email: user?.email || "john.doe@example.com",
    password: "****", // Masked password
  });

  useEffect(() => {
    if (user) {
      setUserData({
        fullname: user.fullname || "John Doe",
        username: user.username || "johndoe123",
        email: user.email || "john.doe@example.com",
        password: "****", // Masked password
      });
    }
  }, [user]);

  const handleEdit = (field) => {
    setEditingField(field);
    setNewData(""); // Reset the input field
    setMessage(""); // Clear any previous messages
  };

  const handleChange = (e) => {
    setNewData(e.target.value);
  };

  const handleSave = () => {
    if (!newData) {
      setMessage("Az új mező nem lehet üres!");
      return;
    }

    const updatedUser = { ...user, [editingField]: newData };


    fetch(`http://127.0.0.1:8000/user/${user.user_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (response.ok) {
          setUserData((prevData) => ({
            ...prevData,
            [editingField]: newData,
          }));
          setUser(updatedUser);
          setMessage("Adatok sikeresen módosítva!");
      } else {
        setMessage("Hiba történt az adatok mentése során.");
      }
      setEditingField(null); // Exit editing mode
    })
      .catch((error) => {
        console.error("Error updating user data:", error);
        setMessage("Hiba történt az adatok mentése során.");
      });
  };

  return (
    <div className="profile-container">
      <div className="user-id-display">
        <p>ID: {user?.user_id}</p>
        </div>
      <h2>Személyes adatok</h2>      
      <p>Szükség esetén az alábbi mezőkben tudod szerkeszteni személyes adataidat.</p>
      <div className="profile-form">
      <div className="input-box">
          <BiIdCard className="icon-left" />
          <input
            type="text"
            value={editingField === "fullname" ? newData : userData.fullname}
            disabled={editingField !== "fullname"}
            placeholder="Teljes név"
            onChange={handleChange}
          />
          <FaPencil
            className="icon-right"
            onClick={() => handleEdit("fullname")}
          />
        </div>
        {editingField === "fullname" && (
          <button className="save-btn" onClick={handleSave}>
            Mentés
          </button>
        )}

      <div className="input-box">
          <FaUser className="icon-left" />
          <input
            type="text"
            value={editingField === "username" ? newData : userData.username}
            disabled={editingField !== "username"}
            placeholder="Felhasználónév"
            onChange={handleChange}
          />
          <FaPencil
            className="icon-right"
            onClick={() => handleEdit("username")}
          />
        </div>
        {editingField === "username" && (
          <button className="save-btn" onClick={handleSave}>
            Mentés
          </button>
        )}

          <div className="input-box">
          <FaEnvelope className="icon-left" />
          <input
            type="email"
            value={editingField === "email" ? newData : userData.email}
            disabled={editingField !== "email"}
            placeholder="Email"
            onChange={handleChange}
          />
          <FaPencil
            className="icon-right"
            onClick={() => handleEdit("email")}
          />
        </div>
        {editingField === "email" && (
          <button className="save-btn" onClick={handleSave}>
            Mentés
          </button>
        )}

        <div className="input-box">
          <FaLock className="icon-left" />
          <input
            type="password"
            value={editingField === "password" ? newData : userData.password}
            disabled={editingField !== "password"}
            placeholder="Jelszó"
            onChange={handleChange}
          />
          <FaPencil
            className="icon-right"
            onClick={() => handleEdit("password")}
          />
        </div>
        {editingField === "password" && (
          <button className="save-btn" onClick={handleSave}>
            Mentés
          </button>
        )}
      </div>
      <button className="logout-btn" onClick={onLogout}>
        Kijelentkezés
      </button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Profile;
