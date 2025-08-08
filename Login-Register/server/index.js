const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Employeemodel = require('./models/Employee');



const app = express();
app.use(express.json());
app.use(cors());


app.post('/login', (req, res) => {
    const { email, password } = req.body;
    Employeemodel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("Success");
            } else {
                res.json("Incorrect Password");
            }
        }else{
            res.json("User not found");
        }
    });
});

app.post('/register', (req, res) => {
    Employeemodel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err));
})


mongoose.connect("mongodb://localhost:27017/BookNet");
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
