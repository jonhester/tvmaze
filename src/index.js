import request from 'request';

let get = (url) => {
  return new Promise ( (resolve, reject) => {

    request.get({url:url, json:true}, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

class TVMaze {

  constructor(url = "http://api.tvmaze.com/") {
    this.APIURL = url;
  }

  findShow(searchString) {
    return get(this.APIURL + 'search/shows/?q=' + searchString);
  }

  getShow(tvMazeId) {
    return get(this.APIURL + 'shows/' + tvMazeId);
  }

  getEpisodes(tvMazeId) {
    return get(this.APIURL + 'shows/' + tvMazeId + "/episodes");
  }

}

export default TVMaze;
