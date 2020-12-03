// Api allowing to register users in the MongoDB database.

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');

// db connection
const db = "mongodb+srv://root:root@cluster0.uvq9y.mongodb.net/users?retryWrites=true&w=majority";
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(err) {
        console.log('Error' + err);
    } else {
        console.log('connected to MongoDB');
    }
})

router.get('/', (req, res) => {
    res.send('Hello again but from API route');
});

/**
 * Extract the userData from the request object, 
 * convert it into the model Mongoose understand 
 * and then save the user in the database
 */
router.post('/register', (req,res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((err, registeredUser)=> {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send(registeredUser);
        }
    })
})

module.exports = router;