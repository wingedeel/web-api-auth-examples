//replace with configured servers uri
var serverBasePath = 'https://api.spotify.com/v1'; //"http://localhost:10000";
var spotifyApi;
var spotifyEnabled = false;
var userCountry;

const displayResults = (data) => {
  
    let resultsSection = document.getElementById('resultsSection');

    // Remove <ul> if it already exists
    ul = document.getElementById('resultsList');
    if (ul !== null) resultsSection.removeChild(ul);

    // If we have results create a new <ul>
    // Append it to the 'resultsSection'
    ul = document.createElement('ul');
    ul.id = 'resultsList';
    ul.className = 'results-list';
    resultsSection.append(ul)

    // Add relevant <li> tags to it
    return data.artists.map(function(person) { // Map through the results and for each run the code below
      let li = document.createElement('li'); //  Create the elements we need
      let p = document.createElement('p');
      p.innerHTML = `${person.name} `
                    //`${person.last_name}` + ' | ' + 
                    //`${person.email} ` + ' | ' + 
                    //`${person.gender} `
      let span = document.createElement('span');
      //img.src = author.picture.medium;  // Add the source of the image to be the src of the img element
      span.innerHTML = `${person.name}`
      //li.onclick = function() {
      //    handleItemSelect(person);
      //}
      li.appendChild(p);
      //li.appendChild(span);
      ul.appendChild(li);
    })
}
/* -----------------  
  INITIALISATION
  ----------------- */

// Get references to DOM elements
const input = document.getElementById('textInput');
const submitBtn = document.getElementById('submitBtn');


function handleSubmit(e) {
  if (spotifyEnabled) {
  var artist = encodeURIComponent(input.value.toLowerCase()).trim();
  console.log('artist selected ', artist);
  // Hardcoded artist id of 'Elvis Presley'
          // Retrieve artist
         //var artistId = '43ZHCT0cAZBISjO8DG9PnE';
         //spotifyApi.getArtist(artistId).then(showArtist);

          // Retrieve related artists
         ///spotifyApi.getArtistRelatedArtists(artistId).then(showRelatedArtists);
    spotifyApi.searchArtists(
                artist,
                userCountry
                ).then(function (data) {

                  // Get  artist id
                  var artistId = data.artists.items[0].id;
                  console.log('artistId ' ,  artistId);
                  spotifyApi.getArtistRelatedArtists(artistId).then((data)=>{

                    // Get related artists
                    console.log('related artists ' , data);

                    // Display related artists
                    displayResults(data)
                  })
                //if (data.artists && data.artists.items.length) {
                //    initRootWithArtist(data.artists.items[0]);
                //}
    });

  }
}


// Set event handlers
submitBtn.onclick = handleSubmit;


window.addEventListener('load', function () {
  console.log('WINDOW LOAD')

  // Get user's country code
  $.ajax({
            url: "https://freegeoip.net/json/"
        }).done(function (data) {
            if (data.country_code) {
                userCountry = data.country_code;
                console.log('user country ', userCountry)
            }
        });

    // Init results container
    // Init form
    var formArtist = document.getElementById('searchForm');
        formArtist.addEventListener('submit', function (e) {
          console.log('submit!')
            showCompletion = false;
            e.preventDefault();
            var search = document.getElementById('textInput');
            currentApi.searchArtists(
                search.value.trim(),
                userCountry
                ).then(function (data) {
                  console.log('searchArtist', data)
                //if (data.artists && data.artists.items.length) {
                //    initRootWithArtist(data.artists.items[0]);
                //}
            });

        }, false);
})



function makeRequest() {

  console.log('MAKE REQUEST')

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
            spotifyEnabled = true;
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

          } else {
             
          }


        }

};


function showArtist (artist) {
    console.log('retrieved artist ', artist)
}

function showRelatedArtists (artists) {
  console.log('retrieved related artists ', artists)
}

 makeRequest();
