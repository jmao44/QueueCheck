const express = require('express')
const app = express()

var md5 = require('md5')
var AWS = require('aws-sdk')

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
require('dotenv').config()

let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
    "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient()


app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.post('/login', (req, res) => {
    const email = req.body.email
    const password = md5(req.body.password)

    let params = {
        TableName: "User",
        Key: {
            "Email": email,
        }
    }
    docClient.get(params, function (err, data) {
        if (err) {
            console.log("User::Login::error - " + JSON.stringify(err, null, 2))
            res.redirect('/login')
        } else {
            let dbPass = data.Item.MD5_Encrypted_Password
            if (dbPass == password) {
                console.log("Login successful")
                res.redirect('/home')
            } else {
                console.log("User::Login::error - password doesn't match.")
                res.redirect('/login')
            }
        }
    })
    return false
})

app.get('/home', (req, res) => {
    res.render('home.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', (req, res) => {
    const email = req.body.email
    const fname = req.body.firstName
    const lname = req.body.lastName
    const password = req.body.password
    const hashedPassword = md5(password)

    let user = {
        "Email": email,
        "First_Name": fname,
        "Last_Name": lname,
        "MD5_Encrypted_Password": hashedPassword
    }
    let params = {
        TableName: "User",
        Item: user
    }
    docClient.put(params, function (err, data) {
        if (err) {
            console.log("User::save::error - " + JSON.stringify(err, null, 2))
            res.redirect('/register')
        } else {
            console.log("User::save::success")
            res.redirect('/home')
        }
    })
})

app.listen(3000)