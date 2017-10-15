const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

var session;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'userDB'

});

db.connect((err) => {
    if (err) {
        throw  err;
    }
    console.log('MySql connected')
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(sessions({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, '../out')));
app.set('views', path.join(__dirname, '../out '));


app.get('/', (req, res) => {
    res.sendFile(`${process.cwd()}/out/test.html`);
});


app.post('/', (req, res) => {

    let sqlUsers = `INSERT INTO users (name,phone,email,latitude, longitude) VALUES('${req.body.username}', '${req.body.phone}', '${req.body.email}', '${req.body.lat}', '${req.body.long}' )`;
    db.query(sqlUsers, (err, result) => {
        if (err) {
            throw  err;
        }
        else {
            console.log('success');
        }

    });

});

app.listen(3000, () => {
    console.log('server is running');
});

