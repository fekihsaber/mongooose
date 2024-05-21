const mongoose = require('mongoose');

// Define the schema for the Person model
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    favoriteFoods: { type: [String], required: true }
});

// Create and export the Person model

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
