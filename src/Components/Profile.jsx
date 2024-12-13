import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { BiIdCard } from "react-icons/bi";
import { FaPencil } from "react-icons/fa6";
import "../Styles/Profile.css";
import PawIcon from "../Components/PawIcon";

const Profile = ({ user, onLogout, setUser }) => {
  const [editingFields, setEditingFields] = useState([]); // Track fields being edited
  const [newData, setNewData] = useState({});
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
    if (!editingFields.includes(field)) {
      setEditingFields([...editingFields, field]); // Add field to editing list
      setNewData({ ...newData, [field]: "" }); // Initialize new data for this field
    }
  };

  const handleChange = (field, value) => {
    setNewData({ ...newData, [field]: value }); // Update new data for the field
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...newData };

    fetch(`http://127.0.0.1:8000/user/${user.user_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (response.ok) {
          setUserData({ ...userData, ...newData });
          setUser(updatedUser);
          setMessage("Adatok sikeresen módosítva!");
          setEditingFields([]); // Clear editing list
          setNewData({}); // Clear new data
        } else {
          setMessage("Hiba történt az adatok mentése során.");
        }
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
        {/* Full Name */}
        <div className="input-box">
          <label className="field-label">Név</label>
          <div className="input-row">
            <BiIdCard className="icon-left" />
            <input
              type="text"
              value={userData.fullname}
              disabled
              placeholder="Teljes név"
            />
            <FaPencil
              className="icon-right"
              onClick={() => handleEdit("fullname")}
            />
          </div>
        </div>
        {editingFields.includes("fullname") && (
          <input
            className="edit-field"
            type="text"
            value={newData.fullname || ""}
            placeholder="Új teljes név"
            onChange={(e) => handleChange("fullname", e.target.value)}
          />
        )}

        {/* Username */}
        <div className="input-box">
          <label className="field-label">Felhasználónév</label>
          <div className="input-row">
            <FaUser className="icon-left" />
            <input
              type="text"
              value={userData.username}
              disabled
              placeholder="Felhasználónév"
            />
            <FaPencil
              className="icon-right"
              onClick={() => handleEdit("username")}
            />
          </div>
        </div>
        {editingFields.includes("username") && (
          <input
            className="edit-field"
            type="text"
            value={newData.username || ""}
            placeholder="Új felhasználónév"
            onChange={(e) => handleChange("username", e.target.value)}
          />
        )}

        {/* Email */}
        <div className="input-box">
          <label className="field-label">Email</label>
          <div className="input-row">
            <FaEnvelope className="icon-left" />
            <input
              type="email"
              value={userData.email}
              disabled
              placeholder="Email"
            />
            <FaPencil
              className="icon-right"
              onClick={() => handleEdit("email")}
            />
          </div>
        </div>
        {editingFields.includes("email") && (
          <input
            className="edit-field"
            type="email"
            value={newData.email || ""}
            placeholder="Új email"
            onChange={(e) => handleChange("email", e.target.value)}
          />
        )}

        {/* Password */}
        <div className="input-box">
          <label className="field-label">Jelszó</label>
          <div className="input-row">
            <FaLock className="icon-left" />
            <input
              type="password"
              value={userData.password}
              disabled
              placeholder="Jelszó"
            />
            <FaPencil
              className="icon-right"
              onClick={() => handleEdit("password")}
            />
          </div>
        </div>
        {editingFields.includes("password") && (
          <input
            className="edit-field"
            type="password"
            value={newData.password || ""}
            placeholder="Új jelszó"
            onChange={(e) => handleChange("password", e.target.value)}
          />
        )}
      </div>

      <div className="button-container">
        <button className="logout-btn" onClick={onLogout}>
          Kijelentkezés
        </button>
        {editingFields.length > 0 && (
          <button className="save-btn" onClick={handleSave}>
            Mentés
          </button>
        )}
      </div>
      {message && <p className="message">{message}</p>}
      <PawIcon />
    </div>
  );
};

export default Profile;
