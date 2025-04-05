import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/auth/register', form);
      alert(`Registration successful!\n\n API Key:\n${res.data.api_key}`);
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Registration failed');
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Left Panel */}
      <div style={styles.leftPanel}>
        <h1 style={styles.logo}>SecureAPI</h1>
        <h2 style={styles.welcome}>Welcome to...</h2>
        <p style={styles.description}>
          A secure middleware that connects users to country data powered by RestCountries API.
        </p>
        <button style={styles.knowMore}>Know More</button>
      </div>

      {/* Right Panel */}
      <div style={styles.rightPanel}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Welcome! Please register to access the platform.</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            style={styles.input}
          />
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
          <button type="submit" style={styles.button}>Register</button>
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    display: 'flex',
    height: '100vh',
    width: '100vw', // Fixes black section
    fontFamily: 'Arial, sans-serif',
    flexWrap: 'wrap',
  },
  leftPanel: {
    flex: 1,
    minWidth: '300px',
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
    transition: 'all 0.2s ease-in-out',
  },
  rightPanel: {
    flex: 1,
    minWidth: '300px',
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
    backgroundColor: '#111',
    color: '#fff',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#178b93',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.2s',
  },
};

export default Register;
