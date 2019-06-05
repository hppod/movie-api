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

const ActorRoutes = require('./app/routes/actor')
const DirectorRoutes = require('./app/routes/director')
const MovieRoutes = require('./app/routes/movie')
const RRRoutes = require('./app/routes/rr')
const UserRoutes = require('./app/routes/user')
const WriterRoutes = require('./app/routes/writer')
const Authentication = require('./app/auth/auth')

app.get('/', function (req, res) {
    res.send('api works')
})

app.post('/login', Authentication)

app.use('/', ActorRoutes)
app.use('/', DirectorRoutes)
app.use('/', MovieRoutes)
app.use('/', RRRoutes)
app.use('/', UserRoutes)
app.use('/', WriterRoutes)

app.listen(port, function () {
    console.log(`api works on port ${port}`)
    console.log(`Filmow API ||| Curso de Angular`)
})

module.exports = app