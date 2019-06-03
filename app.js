const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())

/*
* CONFIG bodyParser
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

const filmeRoute = require('./app/app.routes')

app.use('/', filmeRoute)

app.get('/', function (req, res) {
    res.send(`API Server online - port ${port}`)
})

app.listen(port, function (req, res) {
    console.log(`Umbler app listening on port ${port}`)
})