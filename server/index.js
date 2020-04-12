const express = require('express')
const consola = require('consola')
const helmet = require("helmet");
const {
  Nuxt,
  Builder
} = require('nuxt')
const app = express()
// Import and Set Nuxt.js options
const nuxtConfig = require('../nuxt.config.js')
nuxtConfig.dev = process.env.NODE_ENV !== 'production'
//Applications
app.use(helmet());
app.use(helmet.hidePoweredBy({
  setTo: 'PHP 4.2.0'
}))
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
//路由好朋友捏
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);
//config
const config = require("../config.json")
//auth
app.use((req, res, next) => {

  // -----------------------------------------------------------------------
  // authentication middleware

  const {
    auth
  } = config

  // parse login and password from headers
  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

  // Verify login and password are set and correct
  if (login && password && login === auth.username && password === auth.password) {
    // Access granted...
    return next()
  }

  // Access denied...
  res.set('WWW-Authenticate', 'Basic realm="401"') // change this
  res.status(401).send('Authentication required.') // custom message

  // -----------------------------------------------------------------------

})
//nuxt
async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(nuxtConfig)

  const {
    host,
    port
  } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
