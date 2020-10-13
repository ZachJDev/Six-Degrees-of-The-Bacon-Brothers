const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const API = require('../lastFmAPI.json');

/* Get tag Top Albums
*  get tag Top artists
*  get tag similar tags
*  Needs: tag (param)
*/

router.get('/:tag', (req, res, next) => {
    req.reqType = 'tag';
    req.promises = [];
    req.promises.push(fetch(`https://ws.audioscrobbler.com/2.0/?method=tag.getInfo&tag=${req.params.tag}&api_key=${API.key}&format=json`))
    req.promises.push(fetch(`https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=${req.params.tag}&api_key=${API.key}&format=json`))
    req.promises.push(fetch(`https://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${req.params.tag}&api_key=${API.key}&format=json`))
    req.promises.push(fetch(`https://ws.audioscrobbler.com/2.0/?method=tag.getsimilar&tag=${req.params.tag}&api_key=${API.key}&format=json`))
    next();
})

module.exports = router;