const express = require("express");
const API = require("../lastFmAPI.json");
const router = express.Router();
const fetch = require("node-fetch");

/* Get Album information,
   get top tags.
   Needs: artist (query), album (param)
*/

router.get("/:album", (req, res, next) => {
  console.log('Handling Album Search')
  req.reqType = "album";
  req.promises = [];
  // Get album info
  req.promises.push(
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=album.getInfo&api_key=${API.key}&artist=${req.query.artist}&album=${req.params.album}&format=json`
    )
  );
  // Get top tags
  req.promises.push(
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=album.gettoptags&artist=${req.query.artist}&album=${req.params.album}&api_key=${API.key}&format=json`
    )
  );
    next();
});


module.exports = router;
