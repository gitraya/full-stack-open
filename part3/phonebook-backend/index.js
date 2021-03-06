require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const app = express();

morgan.token("body", (req) =>
  req.method === "POST" ? JSON.stringify(req.body) : ""
);

app.use(cors());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.static("build"));

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
    const { name, number } = request.body;

    const person = await Person.create({ name, number });

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
    const { name, number } = request.body;

    const updatedPerson = await Person.findByIdAndUpdate(
      request.params.id,
      { name, number },
      { new: true, runValidators: true, context: "query" }
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
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
