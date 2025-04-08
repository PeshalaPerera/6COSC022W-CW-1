import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AdminPanel = () => {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${baseURL}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to fetch admin data");
      }
    };

    if (token) fetchUsers();
  }, [token]);

  return (
    <>
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "600",
          color: "#f9f9f9",
        }}
      >
        Admin Dashboard
      </h2>
      {error && <p style={styles.error}>{error}</p>}

      {users.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>API Key</th>
              <th>Usage Count</th>
              <th>Last Used</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.api_key}</td>
                <td>{user.api_key_usage_count}</td>
                <td>
                  {user.api_key_last_used
                    ? new Date(user.api_key_last_used).toLocaleString()
                    : "Never"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No user data found.</p>
      )}
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "2rem",
    maxWidth: "1000px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
    color: "#178b93",
  },
  error: {
    color: "red",
    marginTop: "1rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "1rem",
  },
  th: {
    backgroundColor: "#f4f4f4",
    textAlign: "left",
    padding: "0.75rem",
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "0.75rem",
    borderBottom: "1px solid #ddd",
  },
};

export default AdminPanel;
