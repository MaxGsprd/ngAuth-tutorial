// Api allowing to register users in the MongoDB database.

const express = require('express');
const jwt = require('jsonwebtoken');
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

/**
 * VERIFY ToKEN Method
 * check the token in the request headers.
 */
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request man !');
    }
    let token = req.headers.authorization.split(' ')[1] // get the content in token (index 1 in arr)
    if (token === null || token === 'null') {
        return res.status(401).send('Unauthorized request brah !');
    }
    let payload = jwt.verify(token, 'secretKey'); // this method return the token only if valid
    if (!payload) {
        return res.status(401).send('Unauthorized request goddamn !');
    }
    req.userId = payload.subject;
    next();
}

router.get('/', (req, res) => {
    res.send('Hello again but from API route');
});

/**
 * REGISTER METHOD
 * Extract the userData from the request object, 
 * convert it into the model Mongoose understand 
 * if no error found, init a payload object with the registeredUser._id as a key (subject by convention)
 * then we create a token with jwt.sign(). Finally we send the token.
 */
router.post('/register', (req,res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((err, registeredUser)=> {
        if (err) {
            console.log(err);
        } else {
            let payload = { subject: registeredUser._id};
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token});
            // this syntax is an object with a key "token".
            // {token: {let token value}}
        }
    })
})

/**
 * LOGIN METHOD
 * extract user info from request & then check if user email exist in db 
 * by using the findOne method from Mongoose module.
 * if no error found, if checks are valid, create a payload, init a token and send it to db.
 */
router.post('/login', (req,res) => {
    let userData = req.body;
    User.findOne({email: userData.email}, (err, user) => {  
        if (err) {
            console.log(err);
        } else {
            if (!user) {  // if no user is found
                res.status(401).send('Invalid email');
            } else {
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid password')
                } else {
                    let payload = {subject: user._id}
                    let token = jwt.sign(payload, 'secretKey');
                    res.status(200).send({token});
                }
            }
        }
    })
});


/**
 * Api methods that fetch hard-coded events list object 
 */
router.get('/events', (req, res) => {
    let events = [
        {
            "_id":"1",
            "name": "Japan Expo",
            "description": "lorem ipsum",
            "date": "2020-06-23T18:25:43.511Z"
        },
        {
            "_id":"2",
            "name": "Ocktober Fest",
            "description": "lorem ipsum",
            "date": "2020-06-23T18:25:43.511Z"
        },
        {
            "_id": 3,
            "name": "Astro Expo",
            "description": "lorem ipsum",
            "date": "2020-06-23T18:25:43.511Z"
        },
        {
            "_id":"4",
            "name": "Math Expo",
            "description": "lorem ipsum",
            "date": "2020-06-23T18:25:43.511Z"
        },
        {
            "_id":"5",
            "name": "Salon du Bourget",
            "description": "lorem ipsum",
            "date": "2020-06-23T18:25:43.511Z"
        },
        {
            "_id":"6",
            "name": "Salon du mariage",
            "description": "lorem ipsum",
            "date": "2020-06-23T18:25:43.511Z"
        },
        {
            "_id":"7",
            "name": "Salon de l'auto",
            "description": "lorem ipsum",
            "date": "2020-06-23T18:25:43.511Z"
        },
        {
            "_id":"8",
            "name": "Salon de l'agriculture",
            "description": "lorem ipsum",
            "date": "2020-06-23T18:25:43.511Z"
        },
    ]
    res.json(events)
});


router.get('/special', verifyToken, (req, res) => {
    let events = [
        {
            "_id":"1",
            "name": "Japan Expo",
            "description": "lorem ipsum",
            "date": "2020-06-23T18:25:43.511Z"
        },
        {
            "_id":"2",
            "name": "Japan Expo",
            "description": "lorem ipsum",
            "date": "2020-06-23T18:25:43.511Z"
        },
        {
            "_id": 3,
            "name": "Japan Expo",
            "description": "lorem ipsum",
            "date": "2020-06-23T18:25:43.511Z"
        },
        {
            "_id":"4",
            "name": "Math Expo",
            "description": "lorem ipsum",
            "date": "2020-06-23T18:25:43.511Z"
        },
        {
            "_id":"5",
            "name": "Salon du Bourget",
            "description": "lorem ipsum",
            "date": "2020-06-23T18:25:43.511Z"
        },
        {
            "_id":"6",
            "name": "Salon du mariage",
            "description": "lorem ipsum",
            "date": "2020-06-23T18:25:43.511Z"
        },
        {
            "_id":"7",
            "name": "Salon de l'auto",
            "description": "lorem ipsum",
            "date": "2020-06-23T18:25:43.511Z"
        },
        {
            "_id":"8",
            "name": "Salon de l'agriculture",
            "description": "lorem ipsum",
            "date": "2020-06-23T18:25:43.511Z"
        },
    ]
    res.json(events)
});

module.exports = router;