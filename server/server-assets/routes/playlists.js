var router = require('express').Router();
var Playlists = require('../models/playlist');
var Users = require('../models/user');

//gets all of your songs in your playlist
router.get('/api/mytunes/playlist', (req, res, next) => {
    Playlists.find({ 'user': req.params.user }).then(playlist => {
        if (!playlist) {
            res.status(400).send({ error: 'Invalid User' })
        }
        return res.send(playlist)
    })
        .catch(next)
});

//this creates/adds to your playlist
router.post('/api/mytunes/playlist', (req, res, next) => {
    req.body.userId = req.session.uid;
    Playlists.create(req.body).then(playlist => {
        res.send(playlist)
    })
        .catch(next)
});

//this will allow you to edit the 'song', will be used to increment and decrement the count
router.put('/api/myTunes/playlist/:songId', (req, res, next)=>{
    req.params.songId = req.body._id;
    Playlists.findByIdAndUpdate(req.params.songId).then(playlist =>{
        return res.send('Successfully Promoted Song!')
    })
})

//delete a song from your playlist
router.delete('/api/mytunes/playlist/:songId', (req, res, next) => {
    Playlists.findByIdAndRemove(req.params.songId).then(playlist => {
        return res.send('Song Successfully Removed')
    })
        .catch(next)
});

module.exports = router;