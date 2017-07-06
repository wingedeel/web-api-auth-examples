//replace with configured servers uri
var serverBasePath = 'https://api.spotify.com/v1'; //"http://localhost:10000";
var spotifyApi;



function makeRequest() {

        /**
         * Obtains parameters from the hash of the URL
         * @return Object
         */
        function getHashParams() {
          var hashParams = {};
          var e, r = /([^&;=]+)=?([^&;]*)/g,
              q = window.location.hash.substring(1);
          while ( e = r.exec(q)) {
             hashParams[e[1]] = decodeURIComponent(e[2]);
          }
          return hashParams;
        }

        var params = getHashParams();

        var access_token = params.access_token,
            refresh_token = params.refresh_token,
            error = params.error;

        if (error) {
          alert('There was an error during the authentication');
        } else {
          if (access_token) {

            spotifyApi = new spotifyApi(serverBasePath, access_token);

/*
            // Make a call to Spotify for my credentials
            $.ajax({
                url: 'https://api.spotify.com/v1/me',
                headers: {
                  'Authorization': 'Bearer ' + access_token
                },
                success: function(response) {
                  console.log('get my credentials: ', response);
                }
            });
*/

          // Grab an artist -  hardcoded id of 'Elvis Presley'
          var artistId = '43ZHCT0cAZBISjO8DG9PnE';


          function gotArtist (artist) {
            console.log('got artist ', artist)
          }
          
          spotifyApi.getArtist(artistId, access_token).then(gotArtist);


          } else {
             
          }


        }

};

 makeRequest();
