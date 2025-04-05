import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/auth/login', form);
      const token = res.data.access_token;
      setToken(token);
      alert('Login successful!');
      navigate('/dashboard');
    } catch (err: any) {
      alert(typeof err.response?.data?.detail === 'string' 
        ? err.response.data.detail 
        : JSON.stringify(err.response?.data || 'Login failed'));
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Left Panel */}
      <div style={styles.leftPanel}>
        <h1 style={styles.logo}>SecureAPI</h1>
        <h2 style={styles.welcome}>Welcome Back!</h2>
        <p style={styles.description}>
          Login to your SecureAPI account and explore secure access to
          country data.
        </p>
        <button style={styles.knowMore}>Know More</button>
      </div>

      {/* Right Panel */}
      <div style={styles.rightPanel}>
        <h2 style={styles.title}>Login to Your Account</h2>
        <p style={styles.subtitle}>Welcome back! Please login to continue.</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.switchText}>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  leftPanel: {
    flex: 1,
    background: 'linear-gradient(to bottom right, #1c8274, #178b93)',
    color: '#fff',
    padding: '4rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
  },
  welcome: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  description: {
    fontSize: '1rem',
    maxWidth: '80%',
    marginBottom: '2rem',
    lineHeight: '1.5',
  },
  knowMore: {
    padding: '0.75rem 1.5rem',
    backgroundColor: 'transparent',
    border: '2px solid white',
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  rightPanel: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: '4rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: '2rem',
    color: '#178b93',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '350px',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#178b93',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  switchText: {
    marginTop: '1rem',
    fontSize: '0.9rem',
  },
};

export default Login;
