const {
  url_builder,
  get_top_x,
  do_search_requests
} = require("./spotify_client.js");

(function() {
  var assert = require("assert");
  suite("search songs unit tests", function() {
    var song_artist = {
      "artist": "Katy Perry",
      "track": "Hot N Cold"
    };

    var search_response = {
      "tracks": {
        "items": [{
            "artists": [{
              "name": "Katy Perry",
              "type": "artist",
          }],
            "name": "Hot N Cold",
            "type": "track",
            "uri": "spotify:track:0iGckQFyv6svOfAbAY9aWJ"
        },
          {
            "artists": [{
              "name": "Katy Perry",
              "type": "artist",
          }],
            "name": "Hot N Cold",
            "type": "track",
            "uri": "spotify:track:0IZM2onaTBMRTEIcc5oIi9"
        },
          {
            "artists": [{
              "name": "Katy Perry",
              "type": "artist",
          }],
            "name": "Hot N Cold",
            "type": "track",
            "uri": "spotify:track:22Lg6vvMS2JC07aAjsGvtU"
        },
          {
            "artists": [{
              "name": "Katy Perry",
              "type": "artist",
          }],
            "name": "Hot N Cold",
            "type": "track",
            "uri": "spotify:track:1cdRmcbR7BXyv7iTjV7U8i"
        }]
      }
    };


    test("url_builder should return a string", function() {
      var expected = "https://api.spotify.com/v1/search?query=artist=Katy%20Perry&track=Hot%20N%20Cold&type=track&offset=0&limit=5";
      return assert.equal(url_builder(song_artist), expected);
    });

    test("get_top_x should return 3 results", function() {
      var asserting_callback = function(x) {
        return assert.equal(x.top_3.length, 3);
      };
      get_top_x(search_response, asserting_callback);
    });

    test("get_top_x should return results with artists, track and uri", function() {
      var asserting_callback = function(x) {
        x.top_3.forEach(function(item) {
          assert.equal("uri" in item, true);
          assert.equal("artists" in item, true);
          assert.equal("name" in item, true);
          assert.equal(item.uri.includes("spotify:track"), true);
        });
      };
      get_top_x(search_response, asserting_callback);
    });

    test("get_top_x should throw error if there is no keys for tracks or items", function() {
      return assert.throws(function() {
        get_top_x({}, []);
      }, Error, "no tracks or items found in body");
    });
  });

  suite("search songs integration tests", function() {
    test("integration test: do_search_requests returns results", function() {
      var input_file = "../../example/pop_short.json";
      var asserting_callback = function(results) {
        console.log(results);
        // assert.equal(results.length, 137);
        // results.forEach(function(item) {
        //   assert.equal(item.length, 3);
        // });
      };
      do_search_requests(input_file, asserting_callback);
    });

  });
}).call(this);