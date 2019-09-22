// This is based on https://github.com/spotify/web-api-auth-examples

const request = require("request");
const querystring = require("querystring");
const fs = require("fs");

const client_id = "client_id";
const client_secret = "client_secret";

// request authorization
const authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    "Authorization": "Basic " + (new Buffer(client_id + ":" + client_secret).toString("base64"))
  },
  form: {
    grant_type: "client_credentials"
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
      console.log("running authed request")
      var options = {
        url: url,
        headers: {
          "Authorization": "Bearer " + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          callback(body);
        } else {
          throw (error);
        }
      });
    }
  });
}


const url_builder = function(song_artist) {
  if (("track" in song_artist) == false || ("artist" in song_artist) == false) {
    throw new Error("no artist or track information: " + song_artist);
  }
  var base_url = "https://api.spotify.com/v1/search?query=";
  var options = {
    "type": "track",
    "offset": 0,
    "limit": 5
  };

  const query = {
    ...song_artist,
    ...options
  };

  var query_str = querystring.stringify(query);
  var url = base_url + query_str;
  return url;
};


const get_top_x = function(body, callback, top_x = 3) {
  if (typeof body !== "undefined" && body) {
    if ("tracks" in body && "items" in body.tracks) {
      console.log("running get_top_x")
      var limited = body.tracks.items.slice(0, top_x);

      var local_results = [];
      limited.forEach(function(item) {
        var fmt = {
          "artists": item.artists.forEach(function(a) {
            return {
              "name": a.name,
              "type": a.type,
            }
          }),
          "name": item.name,
          "type": item.track,
          "uri": item.uri
        }
        local_results.push(fmt)
      });

      var top_x_tracks = {
        "top_3": local_results
      };
      callback(top_x_tracks);

    } else {
      throw new Error("no tracks or items found in body")
    }
  } else {
    throw new Error("search response is undefined")
  }

};


const save_search_results = function(file_name, top_3_songs) {
  fs.writeFile(file_name, top_3_songs, function(err) {
    if (err) {
      throw (err);
    }
    console.log("The file " + file_name + " was saved!");
  });
};


const appender = function(global_results, top_x) {
  console.log("running appender")
  console.log(global_results)
  global_results.push(top_x);
};


// writer is an input because that'll be easier to test
const do_search_requests = function(input_file, writer) {
  var contents = fs.readFileSync(input_file);
  var jsonContent = JSON.parse(contents);
  var global_results = [];
  jsonContent.forEach(function(line) {
    var url = url_builder(line);
    // TODO this should happen after internal callbacks returned
    authed_request(url, function(body) {
      get_top_x(body, function(top_x) {
        appender(global_results, top_x);
      })
    });
  });
  writer(global_results);
}



module.exports = {
  url_builder: url_builder,
  get_top_x: get_top_x,
  save_search_results: save_search_results,
  do_search_requests: do_search_requests
};

// create playlist related functions