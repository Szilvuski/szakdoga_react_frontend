import "../Styles/PawIcon.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import { MdOutlinePets } from "react-icons/md";

const PawIcon = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/pets");
    };

    return (
        <div className="paw-icon-container" onClick={handleClick}>
            <MdOutlinePets className="paw-icon" />
        </div>
    );
};

export default PawIcon;