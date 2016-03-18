import rp from 'request-promise';

const EMBED = 'embed[]=';

class TVMaze {

  constructor(url = 'http://api.tvmaze.com/') {
    this.APIURL = url;
  }

  findShow(searchString) {
    return rp({url: this.APIURL + 'search/shows/?q=' + searchString, json:true});
  }

  getShow(tvMazeId, embed) {
    let extra = '';

    if (embed) {
      extra = '?' + EMBED + embed.join('&' + EMBED);
    }

    return rp({url: this.APIURL + 'shows/' + tvMazeId + extra, json:true});
  }

  getEpisodes(tvMazeId) {
    return rp({url: this.APIURL + 'shows/' + tvMazeId + '/episodes', json:true});
  }

  getEpisodeById(tvMazeEpisodeId) {
    return rp({url: this.APIURL + 'episodes/' + tvMazeEpisodeId, json:true})
  }

  getCast(tvMazeId) {
    return rp({url: this.APIURL + 'shows/' + tvMazeId + '/cast', json:true});
  }

  getUpdates() {
    return rp({url: this.APIURL + 'updates/shows', json:true});
  }

}

export default TVMaze;
