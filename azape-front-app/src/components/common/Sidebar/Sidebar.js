import React from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <img src="/az_suite_logo.png" alt="Logo Az Suite" />
            </div>
            <nav>
                <ul>
                    <button onClick={() => navigate('/dashboard')}>
                        <span className="material-icons bar-chart-icon">bar_chart</span>
                        Dashboard
                    </button>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
