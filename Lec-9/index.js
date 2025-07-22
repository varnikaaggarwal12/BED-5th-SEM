const express = require("express");
const app = express();
app.use(express.json());
app.post("/home", (req, res) => {
    const jsondata = req.body;
    console.log(jsondata);
    res.send({ message: 'JSON received successfully', data: jsondata });
})

app.listen(2557,()=> {
    console.log("server started 2557");
})
