import React from 'react';
import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16.5px" }}>
                <a href="/dashboard" style={{ textDecoration: "underline" }}>Termos de Uso</a>
                <a href="/dashboard" style={{ textDecoration: "underline" }}>Política de Privacidade</a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16.5px" }}>
                <img src="/az_logo_mini.png" alt="Logo Az" style={{ height: "24px" }} />
                <p style={{ margin: 0 }}>® Desenvolvido por Azape</p>
            </div>
        </footer>

    );
};

export default Footer;