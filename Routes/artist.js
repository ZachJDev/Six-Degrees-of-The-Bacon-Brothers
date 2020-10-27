const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const API = require('../lastFmAPI.json')

/* Get artist info
*  Get top Albums
*  Get top Tags
*  Get Similar Artists
*  needs: artist(param)
*/
router.get('/:artist', (req, res, next) => {
    console.log('Handling Artist Search')
   req.reqType ='artist'
   req.promises = [];
   // artist info
   req.promises.push(fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${req.params.artist}&api_key=${API.key}&format=json`))
   // top albums
   req.promises.push(fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${req.params.artist}&api_key=${API.key}&format=json`))
   // top tags
   req.promises.push(fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=${req.params.artist}&api_key=${API.key}&format=json`))
   // similar artists
   req.promises.push(fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${req.params.artist}&api_key=${API.key}&format=json`))
    next()
})

module.exports = router;