import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const DashboardPanel = () => {
  const { token, user, usage } = useContext(AuthContext);

  if (!token) return null;
  if (!user) return <div style={styles.loading}>Loading user info...</div>;

  return (
    <div>
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "600",
          color: "#f9f9f9",
        }}
      >
        👋 Welcome, {user.username}!
      </h2>
      <p
        style={{
          fontSize: "1.3rem",
          lineHeight: "1.8",
          maxWidth: "500px",
          margin: "0 auto",
          color: "#f0f0f0",
          fontWeight: 500,
        }}
      >
        <strong>Email:</strong> {user.email}
      </p>
      <p
        style={{
          fontSize: "1.3rem",
          lineHeight: "1.8",
          maxWidth: "500px",
          margin: "0 auto",
          color: "#f0f0f0",
          fontWeight: 500,
        }}
      >
        <strong>API Key:</strong> {user.api_key}
      </p>
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
    color: "#fff",
  },
  usageTitle: {
    marginTop: "3rem",
    fontSize: "1.5rem",
    color: "#000",
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
