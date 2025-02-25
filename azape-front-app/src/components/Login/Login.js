import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api.js';
import { useAuth } from '../../context/AuthContext'
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await login(email, password);

      if (response.status) {
        const { token, profile } = response.data; 

        authLogin(token, profile); 
        localStorage.setItem("user", JSON.stringify(profile));

        navigate('/dashboard');
      } else {
        setError('Credenciais inválidas.');
      }
    } catch (error) {
      setError('Erro ao tentar realizar login. Tente novamente.');
    }
  };


  return (
    <div className="login-container">
      <div className="login-left">
        <img src="/az_suite_logo.png" alt="Logo Az Suite" />
        {error && <p>{error}</p>}
        <div className="input-container">
          <div className="div-input">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="div-input">
            <label>Senha</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="material-icons password-toggle-icon"
                onClick={togglePasswordVisibility}>
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </div>
          </div>
          <div className="esqueci-senha-label div-input">
            <a href="/">Esqueci a senha</a>
          </div>
          <div className="div-input">
            <button onClick={handleLogin}>Entrar</button>
          </div>
        </div>
      </div>
      <div className="login-right">
        <img src="/login_right.png" alt="Background Login" />
      </div>
      <div className="footer-login">
        ® Desenvolvido por Azape
      </div>
    </div>

  );
};

export default Login;