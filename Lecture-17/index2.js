const express = require("express");
const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const User = require("./model/user"); 
// Create
app.post("/user", async (req, res) => {
    let name = req.body.name; 
    let rollno = req.body.rollno;

    let studentData = {
        name: name,
        rollno: rollno,
        date: Date.now()
    };

    let newStudent = new User(studentData); 
    await newStudent.save();

    res.json({
        success: true,
        message: "Student added successfully",
        data: newStudent
    });
});

// Read all
app.get("/user", async (req, res) => {
    let allUsers = await User.find();
    res.json({
        success: true,
        message: "All data fetched successfully",
        data: allUsers
    });
});

// Read single
app.get("/user/:id", async (req, res) => {
    let id = req.params.id;
    let singleUser = await User.findById(id); 
    res.json({
        success: true,
        message: "Student fetched successfully",
        data: singleUser
    });
});

mongoose.connect('mongodb://127.0.0.1:27017/studdb')
    .then(() => console.log('Connected!'));

app.listen(1427, () => {
    console.log("Server started");
});