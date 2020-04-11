const express = require('express');
const router = express.Router();
const rp = require("request-promise")
const config = require("../../config.json")
const WPAPI = require('wpapi');
const wp = new WPAPI(config.wordpress);

router.get('/', (req, res) => {
  res.send('API Works!')
});
router.post('/', async (req, res) => {})
router.get('/success', (req, res) => {});
module.exports = router;
