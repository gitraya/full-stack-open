import { useState } from "react";
import InputGroup from "./InputGroup";

const PersonForm = ({ onSubmitPerson, persons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNewNameChange = (event) => setNewName(event.target.value);
  const handleNewNumberChange = (event) => setNewNumber(event.target.value);
  const handleAddPerson = (event) => {
    event.preventDefault();
    let personObject = { name: newName.trim(), number: newNumber.trim() };
    if (!personObject.name || !personObject.number) return;

    const personExists = persons.find(({ name }) => name === personObject.name);
    let isUpdate = false;
    if (personExists) {
      const confirmUpdate = window.confirm(
        `${personObject.name} is already added to phonebook, replace the old number with a new one?`
      );

      if (!confirmUpdate) return;

      personObject = { ...personExists, number: personObject.number };
      isUpdate = confirmUpdate;
    }

    onSubmitPerson(personObject, isUpdate);
    setNewName("");
    setNewNumber("");
  };

  return (
    <form onSubmit={handleAddPerson}>
      <InputGroup
        id="name"
        label="name:"
        type="text"
        value={newName}
        onChange={handleNewNameChange}
      />
      <InputGroup
        id="number"
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
