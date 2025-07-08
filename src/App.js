// Importing all of the components and hooks needed.
import { useState, useEffect } from 'react';
import AboutMe from './AboutMe';
import TechnologyList from './TechnologyList';
import SoftSkills from './SoftSkills';
import StarRailCharacters from './StarRailCharacters';
import { technologies, skills } from './data';

export default function App() {
  const [showAboutMe, setShowAboutMe] = useState(false);
  const displayAboutMe = () => {
    setShowAboutMe(!showAboutMe);
  };
  // Creates a new object containing the input for a new tech to be added.
  const [newTech, setNewTech] = useState({
  name: '',
  created: '',
  usage: ''
  });
  const [techList, setTechList] = useState(technologies);
  // A state to keep track of the current time. (To help keep track of what time it is while developing).
  const [time, setTime] = useState(new Date());

  useEffect(() => {
  const intervalId = setInterval(() => {
    setTime(new Date());
  }, 1000);
  return () => clearInterval(intervalId);
  }, []);
  // This handles the tech input for new tech being added to the list of tech.
  function manageChange(e) {
    const { name, value } = e.target;
    setNewTech(prev => ({ ...prev, [name]: value }));
  }

  // Adds new tech when all fields are filled in.
  function addTech(e) {
    e.preventDefault();
    if (!newTech.name || !newTech.created || !newTech.usage) return;
    setTechList(others => [...others, { ...newTech, created: Number(newTech.created) }]);
    setNewTech({ name: '', created: '', usage: '' });
  }
    return (
    <div className="App" style={{ maxWidth: '700px', margin: '2rem auto', fontFamily: 'monospace' }}>
      <p>Current time: {time.toLocaleTimeString()}</p>
      <h1>Hello! I'm Eoin Francis</h1>
      <button onClick={displayAboutMe}>
        {showAboutMe ? "Hide About Me" : "Show About Me"}
      </button>
        {showAboutMe && <AboutMe />}
        <h2>Technologies I Enjoy Using</h2>
        <form onSubmit={addTech}>
        <input
          type="text"
          name="name"
          placeholder="Technology Name e.g. Java, C++ etc."
          value={newTech.name}
          onChange={manageChange}
        />
        <input
          type="number"
          name="created"
          placeholder="Year Created"
          value={newTech.created}
          onChange={manageChange}
        />
        <input
          type="text"
          name="usage"
          placeholder="Usage e.g. HTML is used for structuring web pages."
          value={newTech.usage}
          onChange={manageChange}
        />
        <button type="submit">Add a Technology</button>
        </form>
      <TechnologyList items={techList} />
        <h2>My Soft Skills</h2>
          <SoftSkills items={skills} />
      <StarRailCharacters />
      </div>
  );
}