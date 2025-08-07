const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// POST route to register a user
app.post('/register', (req, res) => {
    const { name, email, roll } = req.body;
    const newUser = { name, email, roll };

    // Read existing data
    const filePath = path.join(__dirname, 'users.json');
    let users = [];

    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        users = data ? JSON.parse(data) : [];
    }

    // Add new user and save
    users.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    res.send('User added successfully!');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});