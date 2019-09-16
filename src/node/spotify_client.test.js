const url_builder = require("./spotify_client.js");

(function() {
  var assert = require("assert");
  suite("search songs", function() {
    test("url_builder should return a string", function() {
      return assert.equal(url_builder("artist", "song"), "artistsong");
    });
  });
}).call(this);