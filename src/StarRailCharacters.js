import { useEffect, useState } from 'react';

export default function StarRailCharacters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Get character data from local JSON file.
    fetch('/starrail-characters.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCharacters(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filters character list based on user input. It also checks if each character contains the user's search term.
  const filteredCharacters = characters.filter((char) =>
  char.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  // Real time feedback when searching for characters matching the user's input.
  if (loading) return <p>Loading characters…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Star Rail Characters (Local JSON)</h2>
      <input
        type="text"
        placeholder="Search characters..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
      {filteredCharacters.length === 0 ? (
  <p>No characters found.</p>
) : (
  // Lists characters and displays their relevant details (Name, Gender and Path).
  <ul>
    {filteredCharacters.map((char, idx) => (
      <li key={idx}>
        <strong>{char.name}</strong> — Gender: {char.gender}, Path: {char.path}.
      </li>
    ))}
  </ul>
)}
    </div>
  );
}