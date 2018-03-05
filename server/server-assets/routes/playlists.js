var router = require('express').Router();
var Playlists = require('../models/playlist');
var Users = require('../models/user');

//gets all of your songs in your playlist
router.get('/api/mytunes/:userId/playlist', (req, res, next) => {
    req.params.userId = req.session.uid;
    Playlists.find({ 'userId': req.params.userId }).then(playlist => {
        if (!playlist) {
            res.status(400).send({ error: 'Invalid User' })
        }
        return res.send(playlist)
    })
        .catch(next)
});

//this creates/adds to your playlist
router.post('/api/mytunes/:userId/playlist', (req, res, next) => {
    req.params.userId = req.session.uid;
    Users.findById(req.session.uid).then(user => {
        Playlists.create(req.body).then(playlist => {
            res.send(playlist)
        })
            .catch(next)
    })
        .catch(next)
});

//this will allow you to edit the 'song', will be used to increment and decrement the count
router.put('/api/myTunes/:userId/playlist/:songId', (req, res, next) => {
    req.params.userId = req.session.uid;
    Users.findById(req.session.uid).then(user =>{
        Playlists.findByIdAndUpdate(req.params.songId, req.body).then(playlist => {
            return res.send(playlist)
        })
    })
        .catch(next)
})

//delete a song from your playlist
router.delete('/api/mytunes/:userId/playlist/:songId', (req, res, next) => {
    req.params.userId = req.session.uid;
    req.params.songId = req.body._id;
    Users.findById(req.session.uid).then(user =>{
        Playlists.findByIdAndRemove(req.params.songId).then(playlist => {
            return res.send('Song Successfully Removed')
        })
    })
        .catch(next)
});

module.exports = router;