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
  if(req.promises.length > 0){
    Promise.all(req.promises)
    .then((pr) => {
      return Promise.all(
        pr.map((res) => {
            console.log(res.status)
            if(res.status === 200) return res.json();
        })
      );
    })
    .then((info) => {
        req.data = info;
      next();
    });
  } else {
    console.log("empty")
  }
})

// Final response-sender
app.use('/', (req, res) => {
    res.json(Object.assign({type: req.reqType}, ...req.data))
})

app.listen(PORT, () => {
    console.log(`now listening on port ${PORT}.`)
})