let express = require("express"),
  bp = require("body-parser"),
  cors = require("cors"),
  server = express(),
  session = require('./server-assets/auth/session'),
  port = 3000;

require("./server-assets/db/mlab-config");

let authRoutes = require('./server-assets/auth/routes');
let playlistRoutes = require('./server-assets/routes/playlists');

var whitelist = ['http://localhost:8080'];
var corsOptions = {
    origin: function(origin, callback){
        var originIsWhiteListed = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhiteListed);
    },
    credentials: true
};

server.use(cors(corsOptions));
server.use(session);
server.use(bp.json());
server.use(bp.urlencoded({ extended: true }));
server.use(authRoutes);

server.use('*', (req,res,next)=>{
  if(!req.session.uid){
    return res.status(401).send({error: 'PLEASE LOGIN TO CONTINUE'})
  }
  next();
});

server.use(playlistRoutes);

server.use("*", (error, req, res, next) => {
    res.status(400).send(error);
  });
  
server.listen(port, () => {
    console.log("the server is running... Port:", port);
  });