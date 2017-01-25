var jsonServer = require('json-server');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');
var jwtToken = require('jsonwebtoken');
var config = require('./config');


/*
function generateToken(email, password) {
  var payload = { email: email, password:password };
  return jwtToken.sign(payload, config.token.secret, {
    expiresIn: config.token.expires
  });
}
*/
function generateToken(id) {
    var payload = { id: id };
    return jwtToken.sign(payload, config.token.secret, {
        expiresIn: config.token.expires
    });
}


function extractToken(header) {
    return header.split(' ')[1];
}

// Returns an Express server
var server = jsonServer.create();

// Returns an Express router
var router = jsonServer.router('./db.json');
var db = router.db; // See lowdb on GitHub for documentation if needed


// Set default middlewares (logger, static, cors and no-cache)
server.use(jsonServer.defaults());
server.use(bodyParser.json());

server.use(jwt({
    secret: config.token.secret
}).unless(function (req) {
    var url = req.originalUrl;
    //console.log('URL', url);
    var usersRE = /^\/users(.*)?$/;

    return (
        url === '/signup' ||
        url === '/login'
        // || (usersRE).test(url)
    );
}));

server.post('/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    console.log(`input email ${email} input pass ${password}`);

    // const user = db('users').find({ email: email });

    // if (user !== undefined && user.password === password) {
    //     const token = generateToken(user.id);
    //     res.send({ token: token, user: { id: user.id, name: user.name, email: user.email }, error: null });
    // } else {
    //     res.send({ token: null, user: null, error: 'No such user' });
    //     //res.sendStatus(404);
    // }

    res.send({ token: 'sdfsdf', user: { name: email, email: email }, error: null });
});


server.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
    }
});


server.use(router);
server.listen(3100);