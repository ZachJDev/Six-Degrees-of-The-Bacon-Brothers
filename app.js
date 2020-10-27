const express = require('express');

const albumRoute = require('./Routes/album')
const artistRoute = require('./Routes/artist')
const tagRoute = require('./Routes/tag')
const PORT = process.env.HTTP_PORT || 4001;
const app = express();


/*
    The basic flow of the server is thus:
    the request comes through with the target of album,
    artist, or tag (based on the beginning of the path).
    each of the routes is essentially the same: it sets the reqType
    to the target, then adds the predetermined Last.fm API requests
    as promises on the req.promises array. after the 
    on to the req.promises array. the promise-resolver middleware JSONs 
    each of the API responses and passes it to the final resolver, which 
    responds to the request with a new object containing the reqType and each of the 
    json'd API responses.

    There is also a route for initial searches, which returns the starting
    and target albums.
*/
app.use('/album', albumRoute);
app.use('/artist', artistRoute);
app.use('/tag', tagRoute);


// Promise-Resolver Middleware
app.use('/', (req, res, next) => {
  console.log(req.originalUrl)
  if(req.promises.length > 0){
    Promise.all(req.promises)
    .then((pr) => {
      return Promise.all(
        pr.map((response) => {
            console.log(response.status)
            if(response.status === 200) return response.json();
        })
      );
    })
    .then((info) => {
        req.data = info;
        // console.log(info)
        next();
    });
  } else {
    console.log("empty")
  }
})

app.use('/', (req, res, next) => {
  // Handles artists and albums, as they do not appear in every
  // request type.
  let artists = null;
  let albums = null;
  if(req.reqType !== 'album'){
    artists = req.data[3].similarartists || req.data[3].topartists;
    albums =  req.data[2].topalbums ||  req.data[2].albums
  } 

  // req.data is an array of the resolved promises from
  // the initial fetches. Below I extract the data I'm looking
  // for from the correct spot in the array.
   req.normalized = {
    info: req.data[0].tag || req.data[0].artist || req.data[0].album,
    tags: req.data[1].toptags || req.data[2].similartags,
    albums,
    artists
  }
  next();
})

// Final response-sender
app.use('/', (req, res) => {
  console.log(req.normalized)
    res.json(Object.assign({type: req.reqType}, req.normalized))
})

app.listen(PORT, () => {
    console.log(`now listening on port ${PORT}.`)
})