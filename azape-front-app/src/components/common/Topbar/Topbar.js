import React, { useState, useRef, useEffect } from 'react';
import './Topbar.css';
import { useAuth } from "../../../context/AuthContext";

const Topbar = () => {
    const { user, logout } = useAuth();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const profileTriggerRef = useRef(null);
    const profileMenuRef = useRef(null);
    const notificationsTriggerRef = useRef(null);
    const notificationsMenuRef = useRef(null);

    const handleLogout = () => {
        logout();
        setShowProfileMenu(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showProfileMenu &&
                !profileTriggerRef.current?.contains(event.target) &&
                !profileMenuRef.current?.contains(event.target)) {
                setShowProfileMenu(false);
            }

            if (showNotifications &&
                !notificationsTriggerRef.current?.contains(event.target) &&
                !notificationsMenuRef.current?.contains(event.target)) {
                setShowNotifications(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showProfileMenu, showNotifications]);

    return (
        <header className="topbar">
            <div className="topbar-content">
                <div className="profile-info">
                    <div style={{display: 'flex', alignContent: 'center'}}
                        ref={notificationsTriggerRef}
                        onClick={() => setShowNotifications(!showNotifications)}>
                        <span
                            style={{ fontSize: "16px", marginRight: "5px" }}
                            className="material-icons notifications-icon"
                        >
                            notifications
                        </span>
                        <span>Avisos</span>
                    </div>
                    {showNotifications && (
                        <div className="notifications-menu" ref={notificationsMenuRef}>
                            <p>Não há notificações</p>
                        </div>
                    )}
                </div>

                <div className="profile-info">
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        <span style={{ fontSize: "14px" }}>Olá,</span>
                        <span style={{ fontSize: "19px", fontWeight: "800" }}> {user?.name?.split(" ")[0] || "Usuário"}</span>
                    </div>

                    <div
                        className="perfil-icone"
                        ref={profileTriggerRef}
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                    >
                        <span className="material-icons person-icon">person</span>
                    </div>

                    {showProfileMenu && (
                        <div className="profile-menu" ref={profileMenuRef}>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Topbar;