const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 3000

app.use(cors())

/*
* CONFIG bodyParser
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get('/', function (req, res) {
    res.send('api works')
})

app.listen(port, function () {
    console.log(`api works on port ${port}`)
})

module.exports = app