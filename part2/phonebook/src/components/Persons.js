const Person = ({ person }) => {
  const { name, number } = person;
  return (
    <span>
      {name} {number}
    </span>
  );
};

const Persons = ({ persons }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    {persons.map((person) => (
      <Person person={person} key={person.id} />
    ))}
  </div>
);

export default Persons;
