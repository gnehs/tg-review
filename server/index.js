const express = require('express')
const consola = require('consola')
const helmet = require("helmet");
const {
  Nuxt,
  Builder
} = require('nuxt')
const app = express()
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
// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host,
    port
  } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
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
