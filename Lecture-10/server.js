const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.post("/addUser", (req, res) => {
  const newUser = {
    username: req.body.username,
    password: req.body.password,
  };

  fs.readFile("./users.txt", "utf-8", (err, data) => {
    let users = [];
    if (!err && data) {
      users = JSON.parse(data);
    }

    users.push(newUser);

    fs.writeFile("./users.txt", JSON.stringify(users, null, 2), (err) => {
      //if (err) return res.status(500).send({ message: "Error saving user" });
    res.send("User registered successfully!");
    });
  });
});

app.listen(2557, () => {
  console.log("Server started");
});