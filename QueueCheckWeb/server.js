const express = require('express')
const app = express()

var path = require('path')

var md5 = require('md5')
var AWS = require('aws-sdk')

var microtime = require('microtime')

app.set('view-engine', 'pug')
app.use(express.urlencoded({ extended: false }))
// app.use("/js", express.static(path.join(__dirname, 'public/js')))

require('dotenv').config()

let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
    "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient()
let currentUser = ""

const descriptions = require('./description')
const { hrtime } = require('process')

app.get('/', (req, res) => {
    // res.render('index.ejs')
    res.render('index.pug')
})

app.get('/login', (req, res) => {
    res.render('login.pug')
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
                currentUser = email
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
    let params = {
        TableName: "Location",
    }

    let coordMaps = []
    let waitTimes = {}

    docClient.scan(params, function (err, data) {
        if (err) {
            console.log("ERROR " + JSON.stringify(err, null, 2))
        } else {
            console.log("Getting location coordinates from DynamoDB")
            const locationArray = data.Items

            for (i = 0; i < locationArray.length; i++) {
                let loc = locationArray[i]
                let id = loc.Location_ID
                let name = loc.Name
                let lat = loc.Latitude
                let lon = loc.Longitude
                let wt = loc.Wait_Time

                let map = {
                    id: id,
                    name: name,
                    coord: {
                        lat: lat,
                        lon: lon
                    }
                }
                coordMaps.push(map)
                waitTimes[id] = wt
            }

            let wvDescrip = descriptions.wvDescrip
            let libDescrip = descriptions.libDescrip
            let naDescrip = descriptions.naDescrip

            res.render('home.pug', { coordMaps: coordMaps, wvDescrip: wvDescrip, libDescrip: libDescrip, naDescrip: naDescrip, waitTimes: waitTimes })
        }
    })

})

app.post('/home', (req, res) => {
    let locationID = parseInt(req.body.button)
    let estimateTime = req.body.waitTime
    let currentTimestamp = microtime.now() / 1000000

    console.log(locationID)
    console.log(estimateTime)
    console.log(microtime.now() / 1000000)

    let estimation = {
        "Location_ID": locationID,
        "Time_Submitted": currentTimestamp,
        "Est_Minutes": estimateTime,
        "User_Email": currentUser
    }
    let params = {
        TableName: "Estimation",
        Item: estimation
    }
    docClient.put(params, function (err, data) {
        if (err) {
            console.log("Estimation::save::error - " + JSON.stringify(err, null, 2))
            res.redirect('/home')
        } else {
            console.log("Estimation::save::success")
            res.redirect('/home')
        }
    })
})

app.get('/register', (req, res) => {
    res.render('register.pug')
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
            currentUser = email
            res.redirect('/home')
        }
    })
})

app.listen(3000)