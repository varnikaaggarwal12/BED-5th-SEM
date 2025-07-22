const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

const FILE_PATH = "./users.txt";

// Ensure users.txt exists
if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, "[]", "utf-8");
}

// ✅ GET route to add/register a new user via query params
// Example: http://localhost:2557/register_user?name=Shail&rollno=2410997322
app.get("/register_user", (req, res) => {
    const name = req.query.name;
    const rollno = req.query.rollno;

    if (!name || !rollno) {
        return res.status(400).send({ message: "Both name and rollno are required" });
    }

    fs.readFile(FILE_PATH, "utf-8", (err, data) => {
        let allUsers = [];
        if (!err && data.trim()) {
            allUsers = JSON.parse(data);
        }

        // Check for duplicate rollno
        const exists = allUsers.find(user => user.rollno === rollno);
        if (exists) {
            return res.status(409).send({ message: "User with this roll number already exists" });
        }

        const newUser = { name, rollno };
        allUsers.push(newUser);

        fs.writeFile(FILE_PATH, JSON.stringify(allUsers, null, 2), (err) => {
            if (err) {
                return res.status(500).send({ message: "Error saving user" });
            }
            res.send({ message: "User registered successfully", data: newUser });
        });
    });
});

// ✅ GET route to fetch all users
app.get("/users_data", (req, res) => {
    fs.readFile(FILE_PATH, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send({ message: "Failed to read users file" });
        }

        let users = [];
        if (data.trim()) {
            users = JSON.parse(data);
        }

        res.send({ message: "Data fetched successfully", users });
    });
});

// Start the server
app.listen(2557, () => {
    console.log("✅ Server started on port 2557");
});
