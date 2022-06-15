const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = encodeURIComponent(process.argv[2]);
const url = `mongodb://fullstack:${password}@cluster0-shard-00-00.qz0se.mongodb.net:27017,cluster0-shard-00-01.qz0se.mongodb.net:27017,cluster0-shard-00-02.qz0se.mongodb.net:27017/phonebook?ssl=true&replicaSet=atlas-b887v8-shard-0&authSource=admin&retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const main = async () => {
  try {
    await mongoose.connect(url);

    if (process.argv.length > 3) {
      const [, , , name, number] = process.argv;

      if (!number) {
        console.log("number is missing");
        process.exit(1);
      }

      const person = await Person.create({ name, number });

      console.log(`added ${person.name} number ${person.number} to phonebook`);
    } else {
      const persons = await Person.find({});

      console.log("phonebook:");

      if (persons.length <= 0) {
        console.log("no results");
      } else {
        persons.forEach((person) => {
          console.log(`${person.name} ${person.number}`);
        });
      }
    }

    mongoose.connection.close();
  } catch (error) {
    console.error(error);
  }
};

main();
