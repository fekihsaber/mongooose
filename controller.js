const Person = require('./models/person');

// Create and save a single person
const createAndSavePerson = (done) => {
    const newPerson = new Person({
        name: 'John',
        age: 25,
        favoriteFoods: ['Pizza', 'Burger']
    });

    newPerson.save((err, data) => {
        if (err) return done(err);
        return done(null, data);
    });
};

// Create many people
const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, people) => {
        if (err) return done(err);
        return done(null, people);
    });
};

// Find people by name
const findPeopleByName = (personName, done) => {
    Person.find({ name: personName }, (err, people) => {
        if (err) return done(err);
        return done(null, people);
    });
};

// Find a single person by favorite food
const findOneByFood = (food, done) => {
    Person.findOne({ favoriteFoods: food }, (err, person) => {
        if (err) return done(err);
        return done(null, person);
    });
};

// Find a person by ID
const findPersonById = (personId, done) => {
    Person.findById(personId, (err, person) => {
        if (err) return done(err);
        return done(null, person);
    });
};

// Find, edit, and then save a person
const findEditThenSave = (personId, done) => {
    Person.findById(personId, (err, person) => {
        if (err) return done(err);
        person.favoriteFoods.push('Hamburger');
        person.save((err, updatedPerson) => {
            if (err) return done(err);
            return done(null, updatedPerson);
        });
    });
};

// Find and update a person by name
const findAndUpdate = (personName, done) => {
    const ageToSet = 20;
    Person.findOneAndUpdate(
        { name: personName },
        { age: ageToSet },
        { new: true },
        (err, updatedPerson) => {
            if (err) return done(err);
            return done(null, updatedPerson);
        }
    );
};

// Remove a person by ID
const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, removedPerson) => {
        if (err) return done(err);
        return done(null, removedPerson);
    });
};

// Remove many people with a specific name
const removeManyPeople = (done) => {
    Person.remove({ name: 'Mary' }, (err, result) => {
        if (err) return done(err);
        return done(null, result);
    });
};

// Query and filter people
const queryChain = (done) => {
    Person.find({ favoriteFoods: 'burritos' })
        .sort('name')
        .limit(2)
        .select('-age')
        .exec((err, data) => {
            if (err) return done(err);
            return done(null, data);
        });
};

module.exports = {
    createAndSavePerson,
    createManyPeople,
    findPeopleByName,
    findOneByFood,
    findPersonById,
    findEditThenSave,
    findAndUpdate,
    removeById,
    removeManyPeople,
    queryChain
};
