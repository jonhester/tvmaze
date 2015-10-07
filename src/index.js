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

const EMBED = 'embed[]=';

class TVMaze {

  constructor(url = 'http://api.tvmaze.com/') {
    this.APIURL = url;
  }

  findShow(searchString) {
    return get(this.APIURL + 'search/shows/?q=' + searchString);
  }

  getShow(tvMazeId, embed) {
    let extra = '';

    if (embed) {
      extra = '?' + EMBED + embed.join('&' + EMBED);
    }

    return get(this.APIURL + 'shows/' + tvMazeId + extra);
  }

  getEpisodes(tvMazeId) {
    return get(this.APIURL + 'shows/' + tvMazeId + '/episodes');
  }

  getCast(tvMazeId) {
    return get(this.APIURL + 'shows/' + tvMazeId + '/cast');
  }

  getUpdates() {
    return get(this.APIURL + 'updates/shows');
  }

}

export default TVMaze;
