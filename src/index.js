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
    const currentLimit = parseInt(limit, 10) || 20;

    function quickSort(a, b) {
      return b.weight - a.weight;
    }

    function sortShowsByWeight(shows) {
      let sortedShows = shows;
      if (sortedShows && sortedShows.length > 0) {
        sortedShows = sortedShows.sort(quickSort).slice(0, currentLimit);
      }
      return sortedShows;
    }

    return rp({ url: `${this.APIURL}shows`, json: true })
      .then(sortShowsByWeight);
  }
}

export default TVMaze;
