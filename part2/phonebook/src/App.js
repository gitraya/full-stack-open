import "./index.css";
import { useEffect, useState } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
const defaultNotification = { message: null, isError: false };

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [notification, setNotification] = useState(defaultNotification);

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleFilterChange = (event) => setFilterQuery(event.target.value);

  const setNewNotification = (message, isError) => {
    setNotification({ message, isError });
    setTimeout(() => {
      setNotification(defaultNotification);
    }, 5000);
  };

  const handleSubmitPerson = (personObject, isUpdate = false) => {
    if (isUpdate) {
      personService
        .update(personObject.id, personObject)
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            )
          );
          setNewNotification(`Updated ${personObject.name}`, false);
        })
        .catch((error) => {
          setPersons(persons.filter((person) => person.id !== personObject.id));
          setNewNotification(
            `Information of ${personObject.name} has already been removed from server`,
            true
          );
        });
    } else {
      personService
        .create(personObject)
        .then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
      setNewNotification(`Added ${personObject.name}`, false);
    }
  };

  const handleDeletePerson = (deletedPerson) => () => {
    const confirmDelete = window.confirm(`Delete ${deletedPerson.name}`);

    if (confirmDelete) {
      personService.remove(deletedPerson.id).then(() => {
        const filteredPersons = persons.filter(
          (person) => person.id !== deletedPerson.id
        );
        setPersons(filteredPersons);
      });
      setNewNotification(`Deleted ${deletedPerson.name}`, false);
    }
  };

  const filterPersons = (person) =>
    person.name.toLowerCase().includes(filterQuery.toLowerCase());
  const personsToShow = filterQuery ? persons.filter(filterPersons) : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification.message}
        isError={notification.isError}
      />
      <Filter onChange={handleFilterChange} value={filterQuery} />
      <h3>Add a new</h3>
      <PersonForm onSubmitPerson={handleSubmitPerson} persons={persons} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} onDeletePerson={handleDeletePerson} />
    </div>
  );
};

export default App;
