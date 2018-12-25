require('dotenv').config()

module.exports = {

  reporting(req, res, next) {
    console.log('==================')
    if(req.connection.remoteAddress.slice(0, 7) === '::ffff:') console.log(`${req.connection.remoteAddress.slice(7)} sliced`)
    else console.log(req.connection.remoteAddress)
    console.log(new Date().toLocaleDateString('en-US'),'-',new Date().toLocaleTimeString('en-US'))
    console.log(' ')
    console.log('HEADERS')
    console.log(req.headers)
    console.log(req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'] : 'No proxy')
    console.log(' ')
    console.log('REQ.BODY')
    console.log(req.body)
    console.log(' ')
    console.log('REQ.QUERY')
    console.log(req.query)
    next()
  },

  verifySite(req, res, next) {
    if(req.headers.secrethandshake === process.env.REACT_APP_SECRET) {
      console.log('authorized api hit')
      next()
    } else {
      console.log('unauthorized api hit')
      res.send('not authorized')
    }
  },

}
