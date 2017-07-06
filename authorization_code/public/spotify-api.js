var spotifyApi = function (serverBasePath, access_token) {

  var authHeader = { 'Authorization': 'Bearer ' + access_token } 

  var getArtistRelatedArtists = function(artistId) {
    var url = serverBasePath + '/artists/' + artistId + '/related-artists';
    return $.ajax({
        url: url
    })
  };

  var getArtistTopTracks = function(artistId, country) {
    var url = serverBasePath + '/artists/' + artistId + '/top-tracks';
    return $.ajax({
        url: url,
        data: {
            country: country
        }
    })
  };

  var getArtist = function(artistId) {
    var url = serverBasePath + '/artists/' + artistId;
    return $.ajax({
        url: url,
        headers: authHeader
    })
  };

  var getArtists = function(artistIds) {
    var url = serverBasePath + '/artists?ids=' + artistIds;
    return $.ajax({
        url: url
    })
  };

  var searchArtists = function(q, params) {
    var url = serverBasePath + '/search';
    var data = params
    data['q'] = q
    data['type'] = 'artist'

    return $.ajax({
        url: url,
        data: data
    })
  };

  return {
    getArtistRelatedArtists: getArtistRelatedArtists,
    getArtist: getArtist,
    getArtists: getArtists,
    searchArtists: searchArtists,
    getArtistTopTracks: getArtistTopTracks,
  }

};
