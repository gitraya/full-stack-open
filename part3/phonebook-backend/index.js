const express = require("express");
const defaultPersons = require("./persons.json");
const PORT = 3001;
const app = express();

app.use(express.json());

let persons = defaultPersons;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const generateId = (data = []) => {
  const maxId = data.length > 0 ? Math.max(...data.map((n) => n.id)) : 0;
  return getRandomInt(maxId + 1, maxId + 1000);
};

app.get("/info", (request, response) => {
  const date = new Date();
  const info = `<p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`;
  response.send(info);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ error: "name or number missing" });
  }

  const personExist = persons.find((person) => person.name === body.name);
  if (personExist) {
    return response.status(400).json({ error: "name must be unique" });
  }

  const person = {
    id: generateId(persons),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  response.json(person);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (!person) return response.status(404).end();

  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
