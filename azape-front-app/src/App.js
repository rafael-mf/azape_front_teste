import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import './styles/global.css';

const App = () => (
  <Routes> {}
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/" element={<Login />} />
  </Routes>
);

export default App;