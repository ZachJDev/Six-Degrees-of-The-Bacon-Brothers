const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const API = require('../lastFmAPI.json');

/* Get tag Top Albums
*  get tag Top artists
*  get tag similar tags
*  Needs: tag (param)
*/

router.get('/', (req, res, next) => {
    req.reqType = 'initial';
    req.promises = [];
    req.promises.push(
        fetch(
          `https://ws.audioscrobbler.com/2.0/?method=album.getInfo&api_key=${API.key}&artist=${req.query.artist1}&album=${req.query.album1}&format=json`
        )
      );
      req.promises.push(
        fetch(
          `https://ws.audioscrobbler.com/2.0/?method=album.getInfo&api_key=${API.key}&artist=${req.query.artist2}&album=${req.query.album2}&format=json`
        )
      );
    next();
})

module.exports = router;