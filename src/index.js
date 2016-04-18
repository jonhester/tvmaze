import rp from 'request-promise';

const EMBED = 'embed[]=';

class TVMaze {

  constructor(url = 'http://api.tvmaze.com/') {
    this.APIURL = url;
  }

  findShow(searchString) {
    return rp({ url: `${this.APIURL}search/shows/?q=${searchString}`, json: true });
  }

  getShow(tvMazeId, embed) {
    let extra = '';

    if (embed) {
      extra = `?${EMBED}${embed.join(`&${EMBED}`)}`;
    }

    return rp({ url: `${this.APIURL}shows/${tvMazeId}${extra}`, json: true });
  }

  getEpisodes(tvMazeId) {
    return rp({ url: `${this.APIURL}shows/${tvMazeId}/episodes`, json: true });
  }

  getEpisodeById(tvMazeEpisodeId) {
    return rp({ url: `${this.APIURL}episodes/${tvMazeEpisodeId}`, json: true });
  }

  getCast(tvMazeId) {
    return rp({ url: `${this.APIURL}shows/${tvMazeId}/cast`, json: true });
  }

  getUpdates() {
    return rp({ url: `${this.APIURL}updates/shows`, json: true });
  }

  getPopulars(limit) {
    limit = parseInt(limit) || 20;
    return rp({ url: `${this.APIURL}shows`, json: true })
      .then(function(shows) {
        if (shows && shows.length > 0) {
          shows = shows.sort(function(a,b) { return b.weight - a.weight}).slice(0, limit);
        }
        return shows;
      });
  }
}

export default TVMaze;
