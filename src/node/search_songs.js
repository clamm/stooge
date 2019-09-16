const {
  save_search_results,
  do_search_requests
} = require("./spotify_client.js");

do_search_requests("../../example/pop.json", save_search_results);