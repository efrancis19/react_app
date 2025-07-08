export default function SoftSkills({ items }) {
    return (
        <ul>
            {items.map((skill, index) => (
                <li key={index}>
                    <strong>{skill.name}</strong>
                </li>
            ))}
        </ul>
    );
}