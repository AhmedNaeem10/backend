const express = require('express')
var cors = require('cors')

const loginController = require('./components/loginController')
const signupController = require('./components/signupController')

const app = express()

app.use(express.json());
app.use(cors({
    // origin to be changed depending upon the front end server
    origin: 'http://localhost:3000',
    credentials: true
}));

// giving access to frontend server
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
  });

app.use(express.urlencoded({ extended: false }));

app.listen(4000, (req, res)=>{
    console.log("listening at port 4000...")
})

app.post('/login', loginController.login)
app.post('/signup', signupController.signup)
