require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const logger = require('morgan')
const methodOverride = require('method-override')
const cors = require('cors')

const routerMain = require('./server/router')
const routerPersonal = require('./server/routerPersonal')
const controller = require('./server/controller')

const app = express()
const PORT = 6001

app.set('superSecret', process.env.SECRET)
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'client/build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(cors())

app.use(controller.reporting)
// app.use(controller.verifySite)

app.use('/personal2272', routerPersonal)
app.use('/api', routerMain)

app.get('*', (req, res) => {
  res.sendStatus(404)
})

app.post('*', (req, res) => {
  res.sendStatus(404)
})

app.put('*', (req, res) => {
  res.sendStatus(404)
})

app.delete('*', (req, res) => {
  res.sendStatus(404)
})

app.patch('*', (req, res) => {
  res.sendStatus(404)
})

app.options('*', (req, res) => {
  res.sendStatus(404)
})

app.listen(PORT, () => {
  console.log(`Server up and listening on port ${PORT}, in ${app.get('env')} mode.`);
});

module.exports = app;
