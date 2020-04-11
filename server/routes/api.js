const express = require('express');
const router = express.Router();
const rp = require("request-promise")
const config = require("../../config.json")
const WPAPI = require('wpapi');
const wp = new WPAPI(config.wordpress);

router.get('/', (req, res) => {
  res.send('API Works!')
});
router.get('/posts', async (req, res) => {
  let posts = await wp.posts().status(['pending']).perPage(100)
  res.send(posts)
});
router.get('/categories', async (req, res) => {
  let result = await wp.categories().perPage(100)
  let categories = {}
  result.map(x => categories[x.id] = x.name)
  res.send(categories)
});

router.post('/', async (req, res) => {})
router.get('/success', (req, res) => {});
module.exports = router;
