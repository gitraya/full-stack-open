require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const defaultPersons = require("./persons.json");
const app = express();

morgan.token("body", (req, res) =>
  req.method === "POST" ? JSON.stringify(req.body) : ""
);

app.use(cors());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.static("build"));

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

app.get("/info", async (request, response) => {
  const date = new Date();
  const persons = await Person.find({}).exec();
  const info = `<p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`;
  response.send(info);
});

app.get("/api/persons", async (request, response) => {
  const persons = await Person.find({}).exec();
  response.json(persons);
});

app.post("/api/persons", async (request, response, next) => {
  try {
    const body = request.body;

    if (!body.name || !body.number) {
      return response.status(400).json({ error: "name or number missing" });
    }

    const personExist = await Person.findOne({ name: body.name }).exec();
    if (personExist) {
      return response.status(400).json({ error: "name must be unique" });
    }

    const person = await Person.create({
      name: body.name,
      number: body.number,
    });

    response.json(person);
  } catch (error) {
    next(error);
  }
});

app.get("/api/persons/:id", async (request, response, next) => {
  try {
    const person = await Person.findById(request.params.id).exec();

    if (!person) return response.status(404).end();

    response.json(person);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/persons/:id", async (request, response, next) => {
  try {
    const person = await Person.findByIdAndRemove(request.params.id).exec();

    if (!person) return response.status(404).end();

    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.put("/api/persons/:id", async (request, response, next) => {
  try {
    const body = request.body;
    const person = {
      name: body.name,
      number: body.number,
    };

    const updatedPerson = await Person.findByIdAndUpdate(
      request.params.id,
      person,
      { new: true }
    ).exec();

    response.json(updatedPerson);
  } catch (error) {
    next(error);
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
