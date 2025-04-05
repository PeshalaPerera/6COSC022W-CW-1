import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountrySearch = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [apiKey, setApiKey] = useState<string | null>(null);

  // Load API key from localStorage on component mount
  useEffect(() => {
    const key = localStorage.getItem('api_key');
    setApiKey(key);
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const encodedName = encodeURIComponent(query.trim());
      const res = await axios.get(`http://localhost:8000/countries/${encodedName}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'x-api-key': apiKey || '',
        },
      });
      setResult(res.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Search failed.');
      setResult(null);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🌍 Country Search</h2>
      <input
        type="text"
        placeholder="Enter country name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSearch} style={styles.button}>Search</button>

      {error && <p style={styles.error}>{error}</p>}

      {result && (
        <div style={styles.result}>
          <img src={result.flag} alt="Flag" style={styles.flag} />
          <h3>{result.country_name}</h3>
          <p><strong>Capital:</strong> {result.capital}</p>
          <p><strong>Currency:</strong> {result.currencies.join(', ')}</p>
          <p><strong>Languages:</strong> {result.languages.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '2rem',
    maxWidth: '600px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#178b93',
  },
  input: {
    padding: '0.75rem',
    width: '80%',
    marginRight: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#178b93',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '1rem',
  },
  result: {
    marginTop: '2rem',
    border: '1px solid #ccc',
    padding: '1.5rem',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  },
  flag: {
    width: '100px',
    borderRadius: '6px',
    marginBottom: '1rem',
  },
};

export default CountrySearch;
