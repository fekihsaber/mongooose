const express = require('express');
const connectDB = require('./database');
const personController = require('./controller');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Define a simple route for the home page
app.get('/', (req, res) => {
    res.send('Welcome to the Mongoose App');
});

// Route to create and save a single person
app.get('/create-person', (req, res) => {
    personController.createAndSavePerson((err, data) => {
        if (err) return res.status(500).send(err);
        res.send(data);
    });
});

// Route to create many people
app.get('/create-many-people', (req, res) => {
    const arrayOfPeople = [
        { name: 'Alice', age: 30, favoriteFoods: ['Pizza'] },
        { name: 'Bob', age: 25, favoriteFoods: ['Sushi'] },
        { name: 'Charlie', age: 35, favoriteFoods: ['Steak'] },
        { name: 'Diana', age: 28, favoriteFoods: ['Salad'] },
        { name: 'Eve', age: 22, favoriteFoods: ['Pasta'] },
    ];
    personController.createManyPeople(arrayOfPeople, (err, data) => {
        if (err) return res.status(500).send(err);
        res.send(data);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
