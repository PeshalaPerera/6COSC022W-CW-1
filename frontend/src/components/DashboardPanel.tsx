import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const DashboardPanel = () => {
  const { token, logout } = useContext(AuthContext);
  const [user, setUser] = useState<any>(null);
  const [usage, setUsage] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
  
      try {
        const [userRes, usageRes] = await Promise.all([
          axios.get("http://localhost:8000/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8000/auth/usage", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        console.log("📦 usage response:", usageRes.data);
        setUser(userRes.data);
        localStorage.setItem("api_key", userRes.data.api_key);
        setUsage(Array.isArray(usageRes.data) ? usageRes.data : []);
      } catch (err) {
        console.error("🔥 Failed to fetch data", err);
        alert("Failed to fetch data. Logging out.");
        logout();
      }
    };
  
    fetchData();
  }, [token]);

  if (!token) return null;

  if (!user) return <div style={styles.loading}>Loading user info...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>👋 Welcome, {user.username}!</h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>API Key:</strong> {user.api_key}
      </p>
      <button onClick={logout} style={styles.logoutBtn}>
        Logout
      </button>

      <h3 style={styles.usageTitle}>📈 Recent API Usage</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Endpoint</th>
            <th>Method</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(usage) && usage.length > 0 ? (
            usage.map((entry, idx) => (
              <tr key={idx}>
                <td>{entry.endpoint}</td>
                <td>{entry.method}</td>
                <td>{new Date(entry.timestamp).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>
                No usage data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "2rem",
    maxWidth: "800px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
    color: "#178b93",
  },
  logoutBtn: {
    marginTop: "1rem",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  usageTitle: {
    marginTop: "3rem",
    fontSize: "1.5rem",
    color: "#178b93",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "1rem",
  },
  loading: {
    textAlign: "center",
    marginTop: "4rem",
    fontSize: "1.2rem",
  },
};

export default DashboardPanel;
