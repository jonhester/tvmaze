# tvmaze
Node wrapper for tvmaze that returns promises

## Installation
```
npm install tvmaze --save
```

## Usage

```js
var TVMaze = require('tvmaze');

var tvm = new TVMaze();

// Search for a show
tvm.findShow('futurama').then( function (shows) {
  console.log(shows);
});

// Get a show by tvmaze id
tvm.getShow(538).then( function (show) {
  console.log(show);
});

// Get episodes for a show by tvmaze id
tvm.getEpisodes(538).then( function (episodes) {
  console.log(episodes);
});

// Get specific episode for a show by tvmaze episode id
tvm.getEpisodeById(49411).then( function (episode) {
  console.log(episode);
});

// Get a show by tvmaze id and include cast
tvm.getShow(538, ['cast']).then( function (show) {
  console.log(show);
});

// Get a show by tvmaze id and include cast and episodes
tvm.getShow(538, ['cast', 'episodes']).then( function (show) {
  console.log(show);
});
```