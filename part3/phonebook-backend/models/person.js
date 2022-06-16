const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then(() => console.log("connected to MongoDB"))
  .catch((error) => console.log("error connection to MongoDB:", error.message));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: [true, "Name is required"],
    validate: {
      validator: async (name) => {
        const person = await mongoose.models.Person.findOne({ name }).exec();
        return Promise.resolve(!person);
      },
      message: "Name must be unique",
    },
  },
  number: {
    type: String,
    minlength: 8,
    required: [true, "Phone number is required"],
    validate: {
      validator: (v) => /^\d{2,3}-\d{5,}$/.test(v),
      message: "{VALUE} is not a valid phone number!",
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
