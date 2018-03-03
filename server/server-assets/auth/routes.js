var router = require('express').Router();
var Users = require('../models/user');

var errorMessage = {error: 'Invalid User'};

//here is were the user can sign up for the website and the database will hash
//the password and save the information
router.post('/api/user/register', (req, res)=>{
    req.body.password = Users.generateHash(req.body.password)
    Users.create(req.body).then(user =>{
        if(!user){
            return res.status(401).send(errorMessage)
        }
        user.password = null;
        req.session.uid = user._id;
        console.log('Successfully Registered', user);
        res.send(user)
    })
    .catch(err => res.status(401).send(errorMessage))
});

//this verifies users login information with whats saved in the database.
router.post('/api/user/login', (req, res)=>{
    Users.findOne({email: req.body.email}).then(user =>{
        if(!user){
            return res.status(401).send(errorMessage)
        }
        if(!user.validatePassword(req.body.password)){
            return res.status(401).send(errorMessage)
        }
        user.password = null;
        req.session.uid = user._id
        res.send({message: 'Success', user})
    })
});

//this will check the users session id to make sure its valid and will 'authenticate' it
router.get('/api/user/authenticate', (req, res)=>{
    Users.findById(req.session.uid).then(user =>{
        if(!user){
            return res.status(401).send({error: 'Login to Continue'})
        }
        user.password = null;
        return res.status(200).send(user)
    })
    .catch(err =>{ return res.status(500).send({error: 'Error Authenticating'})})
});

//this will delete the users session id, so they can 'logout'
router.delete('/api/user/logout', (req, res)=>{
    req.session.destroy()
    res.send('Successfully Logged Out!')
});

module.exports = router;