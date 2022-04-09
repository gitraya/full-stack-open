const Person = ({ person, onDeleteClick }) => {
  const { name, number } = person;
  return (
    <div>
      <span>
        {name} {number}
      </span>{" "}
      <button type="button" onClick={onDeleteClick}>
        delete
      </button>
    </div>
  );
};

const Persons = ({ persons = [], onDeletePerson }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    {persons.map((person) => (
      <Person
        person={person}
        key={person.id}
        onDeleteClick={onDeletePerson(person)}
      />
    ))}
  </div>
);

export default Persons;
