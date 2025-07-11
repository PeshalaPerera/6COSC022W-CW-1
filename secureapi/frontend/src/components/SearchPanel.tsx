import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const SearchPanel = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const { refreshUsage } = useAuth();
  
  useEffect(() => {
    const key = localStorage.getItem("api_key");
    setApiKey(key);
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.error("Please enter a country name.");
      return;
    }

    const encodedName = encodeURIComponent(query.trim());

    const baseUrl = import.meta.env.VITE_BASE_URL

    await toast.promise(
      axios.get(`${baseUrl}/countries/${encodedName}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "x-api-key": apiKey || "",
        },
      }),
      {
        loading: "Searching country...",
        success: (res) => {
          setResult(res.data);
          refreshUsage();
          return `Found ${res.data.country_name}`;
        },
        error: (err) => {
          setResult(null);
          return err?.response?.data?.detail || "Search failed.";
        },
      }
    );
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Country Search</h2>
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Enter country name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleSearch} style={styles.button}>
            Search
          </button>
        </div>

        {result && (
          <div style={styles.result}>
            <img src={result.flag} alt="Flag" style={styles.flag} />
            <h3>{result.country_name}</h3>
            <p>
              <strong>Capital:</strong> {result.capital}
            </p>
            <p>
              <strong>Currency:</strong> {result.currencies.join(", ")}
            </p>
            <p>
              <strong>Languages:</strong> {result.languages.join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    padding: "2rem",
    borderRadius: "16px",
    backdropFilter: "blur(4px)",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
  },
  container: {
    maxWidth: "600px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
    color: "#178b93",
  },
  input: {
    flex: 1,
    padding: "0.75rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  button: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#178b93",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "1rem",
  },
  result: {
    marginTop: "2rem",
    border: "1px solid #ccc",
    padding: "1.5rem",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
  },
  flag: {
    width: "100px",
    borderRadius: "6px",
    marginBottom: "1rem",
  },
};

export default SearchPanel;
