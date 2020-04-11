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
  let result = await wp.categories().perPage(30)
  let categories = {}
  result.map(x => categories[x.id] = x.name)
  res.send(categories)
});

router.post('/post', async (req, res) => {
  let {
    action,
    id
  } = req.body
  if (action == 'delete') {
    await wp.posts().id(id).delete()
  }
  if (action == 'publish') {
    await wp.posts().id(id).update({
      status: 'publish'
    })
  }
  res.json({
    success: true
  })
})
router.get('/success', (req, res) => {});
module.exports = router;
