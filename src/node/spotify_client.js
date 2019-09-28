// This is based on https://github.com/spotify/web-api-auth-examples

const request = require("request");
const querystring = require("querystring");
const fs = require("fs");

const client_id = "";
const client_secret = "";


const authed_request = ( { url } ) => {
  console.log("start authed_request");

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

  return new Promise((resolve, reject) => {
    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {

        // use the access token to access the Spotify Web API
        const token = body.access_token;
        console.log("get auth token");
        // console.log(token)

        const options = {
          url,
          headers: {
            "Authorization": "Bearer " + token
          },
          json: true
        };
        resolve({ options });
      } else {
        reject(error);
      }
    });
  });
};


const makeGetRequest = ({ options }) => {
  return new Promise((resolve, reject) => {
    request.get(options, (error, response, body) => {
      console.log("run authorized get request against API");
      if (!error && response.statusCode === 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
};


const url_builder = (song_artist) => {
  if (("track" in song_artist) == false || ("artist" in song_artist) == false) {
    throw new Error("no artist or track information: " + song_artist);
  }
  const base_url = "https://api.spotify.com/v1/search?query=";
  const options = {
    "type": "track",
    "offset": 0,
    "limit": 5
  };

  const query = {
    ...song_artist,
    ...options
  };

  const query_str = querystring.stringify(query);
  return base_url + query_str;
};


const get_top_x = (body) => {
  const top_x = 3;
  if (body) {
    if ("tracks" in body && "items" in body.tracks) {
      console.log("running get_top_x");
      const limited = body.tracks.items.slice(0, top_x);

      let local_results = [];
      limited.forEach((item) => {
        const fmt = {
          "artists": item.artists.forEach((a) => {
            return {
              "name": a.name,
              "type": a.type,
            }
          }),
          "name": item.name,
          "uri": item.uri
        }
        local_results.push(fmt);
      });

      const top_x_tracks = {
        "top_3": local_results
      };
      return Promise.resolve(top_x_tracks);

    } else {
      return Promise.resolve({ "meta": "no tracks or items found in body" });
    }
  } else {
    return Promise.resolve({ "meta": "search response is undefined"});
  }
};


const save_search_results = (file_name, top_3_songs) => {
  fs.writeFile(file_name, JSON.stringify(top_3_songs), (err) => {
    if (err) {
      throw (err);
    }
    console.log("The file " + file_name + " was saved!");
  });
};


const append_to_global_results = (global_results, top_x) => {
  console.log("running append_to_global_results with global_results:");
  console.log(global_results);
  console.log("and top_3:");
  console.log(top_x);
  global_results.push(top_x);
};


const getEntriesPerSong = (url) => {
  return authed_request({ url }).then(makeGetRequest).then(get_top_x);
}


// writer is an input because that'll be easier to test
const do_search_requests = async (input_file, writer) => {
  console.log("read input file");
  const contents = fs.readFileSync(input_file);
  const jsonContent = JSON.parse(contents);
  let global_results = [];

  for (let i = 0; i < jsonContent.length; i++) {
    const line = jsonContent[i]
    console.log(line);
    const url = url_builder(line);
    console.log(url);
    const top_x = await getEntriesPerSong(url);
    console.log("here:", top_x);
    append_to_global_results(global_results, top_x);
  };
  writer(global_results);
}


module.exports = {
  do_search_requests,
  get_top_x,
  save_search_results,
  url_builder,
};

// create playlist related functions
