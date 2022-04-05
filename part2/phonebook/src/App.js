import { useState } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filterQuery, setFilterQuery] = useState("");

  const handleFilterChange = (event) => setFilterQuery(event.target.value);
  const handleAddPerson = (newPerson) =>
    setPersons((prev) => [...prev, { ...newPerson, id: prev.length + 1 }]);

  const filterPersons = (person) =>
    person.name.toLowerCase().includes(filterQuery.toLowerCase());
  const personsToShow = filterQuery ? persons.filter(filterPersons) : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} value={filterQuery} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={handleAddPerson} persons={persons} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
