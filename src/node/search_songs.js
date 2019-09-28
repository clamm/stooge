const {
  save_search_results,
  do_search_requests
} = require("./spotify_client.js");

do_search_requests("../../example/pop.json", function(results) {
  save_search_results("../../example/songs.json", results);
});
