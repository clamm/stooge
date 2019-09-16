// This is based on https://github.com/spotify/web-api-auth-examples

var request = require('request'); // "Request" library

var client_id = 'client_id'; // Your client id
var client_secret = 'client_credentials'; // Your secret

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

// possibly add 2nd callback for error
const authed_request = function(url, callback) {
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      var token = body.access_token;
      // console.log(token)

      var options = {
        url: url,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, callback);
    }
  });
}


const url_builder = function(song, artist) {
  // function that escape special characters: encode url component
  // 'https://api.spotify.com/v1/search?query=track%3AHot+N+Cold+artist%3AKaty+Perry&type=track&offset=0&limit=20'
  var url = song + artist
  return url
};


const get_body_upon_success = function(error, response, body) {
  if (!error && response.statusCode === 200) {
    // console.log(body);
    return body;
  } else {
    return {};
  }
};


const get_top_x = function(body) {
  // navigate through results
  // return top 3 songs
  body[0]
  return {
    "artist": "",
    "song": "",
    "top_3": []
  }
};


const save_search_results = function(file_name, top_3_songs) {
  // save to file
  top_3_songs
};


// writer is an input because that'll be easier to test
const do_search_requests = function(input_file, writer) {
  var the_file = require(input_file)
  var result = []
  for (var line in the_file) {
    var url = url_builder(line["song"], line["artist"])
    var body = authed_request(url, get_body_upon_success)
    var top_x = get_top_x(body)
    result.push(top_x)
  }
  writer(result)
}



module.exports = url_builder, save_search_results, do_search_requests;

// create playlist related functions