var expressSession = require('express-session');
var mongoStore = require('connect-mongodb-session')(expressSession);

var store = new mongoStore({
    uri: 'mongodb://music:test@ds153198.mlab.com:53198/vue-music',
    collection: 'Sessions'
});

store.on('error', function(err){
    console.log('SESSION ERROR')
});

var session = expressSession({
    secret: 'Mu$ic 1s th3 133$t!!',
    cookie: {
        maxAge: (1000 * 60 * 60 * 24 * 7)* 52
    },
    store,
    resave: true,
    saveUninitialized: true
});

module.exports = session;