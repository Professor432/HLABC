import React, { useState } from 'react';
import './styles.css'; // Ensure this is correctly pointing to your CSS file
import myImage from './images/logo.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log(data);

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user._id); // Store user _id locally
        localStorage.setItem('role', data.user.role);
        localStorage.setItem('email', data.user.email);
        alert('Login successful');
        navigate('/home');
      } else {
        throw new Error('Token not received');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      alert('Login failed');
    }
  };

  return (
    <div className="flex-wrapper">
      <main className="main">
        <div className="container">
          <div className="login-container">
            <section className="logo-section">
              <img src={myImage} alt="logo" />
            </section>
            <div className="divider"></div>
            <section className="login-form-section">
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="log">Sign in</button>
              </form>
              <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
            </section>
          </div>
        </div>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 HL-ABC. All rights reserved.</p>
          <p>Contact us at <a href="mailto:info@yourcompany.com">mail here</a></p>
        </div>
      </footer>
    </div>
  );
};

export default Login;