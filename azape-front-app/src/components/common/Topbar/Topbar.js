import React from 'react';
import { useAuth } from "../../../context/AuthContext";

const Topbar = () => {
    const { user } = useAuth();
    return (
        <header className="topbar">
            <div className="topbar-content">
                <div className="profile-info">
                    <span style={{fontSize:"16px", marginRight:"5px"}} className="material-icons notifications-icon">notifications</span>
                    <span>Avisos</span>
                </div>
                <div className="profile-info">
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        <span style={{fontSize:"14px"}}>Olá,</span>
                        <span style={{fontSize:"19px", fontWeight:"800"}}> {user?.name?.split(" ")[0] || "Usuário"}</span>
                    </div>

                    <div className="perfil-icone">
                        <span className="material-icons person-icon">person</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
