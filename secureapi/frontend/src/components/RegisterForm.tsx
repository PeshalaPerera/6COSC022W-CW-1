import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-hot-toast";

const RegisterForm = ({
  switchView,
}: {
  switchView: (view: string) => void;
}) => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/auth/register", form);
      toast.success(`Registered!\n API Key: ${res.data.api_key}`, {
        duration: 4000,
        position: "top-right",
      });
      setTimeout(() => switchView("login"), 4000);
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>SIGN UP</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputWrapper}>
          <FaUser style={styles.icon} />
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputWrapper}>
          <FaEnvelope style={styles.icon} />
          <input
            name="email"
            placeholder="E-mail"
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputWrapper}>
          <FaLock style={styles.icon} />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          CREATE ACCOUNT
        </button>
      </form>
      <p style={styles.switchText}>
        Already have an account?{" "}
        <span
          onClick={() => switchView("login")}
          style={{
            color: "#007bff",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Login here
        </span>
      </p>
    </div>
  );
};

const styles = {
  card: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 0 12px rgba(0,0,0,0.1)",
    textAlign: "center" as const,
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "1.5rem",
  },
  form: { display: "flex", flexDirection: "column" as const, gap: "1rem" },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "0.6rem 0.75rem",
    backgroundColor: "#f4f6f8",
  },
  icon: { marginRight: "0.5rem", color: "#666" },
  input: {
    flex: 1,
    border: "none",
    background: "transparent",
    outline: "none",
    fontSize: "1rem",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#178b93",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
  switchText: { marginTop: "1rem", fontSize: "0.9rem" },
};

export default RegisterForm;
