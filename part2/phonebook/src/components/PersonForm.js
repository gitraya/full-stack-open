import { useState } from "react";
import InputGroup from "./InputGroup";

const PersonForm = ({ onSubmit, persons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNewNameChange = (event) => setNewName(event.target.value);
  const handleNewNumberChange = (event) => setNewNumber(event.target.value);
  const handleAddPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName.trim(), number: newNumber.trim() };
    if (!newPerson.name || !newPerson.number) return;

    const personExists = persons.find(({ name }) => name === newPerson.name);
    if (personExists) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }

    onSubmit(newPerson);
    setNewName("");
    setNewNumber("");
  };

  return (
    <form onSubmit={handleAddPerson}>
      <InputGroup
        label="name:"
        type="text"
        value={newName}
        onChange={handleNewNameChange}
      />
      <InputGroup
        label="number:"
        type="tel"
        value={newNumber}
        onChange={handleNewNumberChange}
      />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
