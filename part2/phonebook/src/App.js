import { useEffect, useState } from "react";
import axios from "axios";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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
