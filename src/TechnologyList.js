export default function TechnologyList({ items }) {
  return (
    <ul>
      {items.map((tech, index) => (
        <li key={index}>
          <strong>{tech.name}</strong> (Created: {tech.created}) — {tech.usage}
        </li>
      ))}
    </ul>
  );
}