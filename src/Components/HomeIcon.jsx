import React from "react";
import { IoHomeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../Styles/HomeIcon.css";

const HomeIcon = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/menu");
    };

    return (
        <div className="home-icon-container" onClick={handleClick}>
            <IoHomeSharp className="home-icon" />
        </div>
    );
};

export default HomeIcon;
