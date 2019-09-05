# Stooge


Parse m3u playlists to search for their contents on Spotify and create Spotify playlists from the m3u playlist.


NB: stooge = (derogatory) A subordinate used by another to do unpleasant routine work. (source [https://www.lexico.com/en/definition/stooge](https://www.lexico.com/en/definition/stooge))


Next steps:

* ☐ setup tests
* ✔️ read file and get relevant lines
* ☐ parse lines into song / artist information
* ☐ possibly write out unknowns to shazam later?
* ☐ make query out of song / artist information
* ☐ fire search query against [Spotify search API](https://developer.spotify.com/documentation/web-api/reference/search/search/)
* ☐ figure out authentication and authorization of Spotify API ([docs](https://developer.spotify.com/documentation/general/guides/au☐ thorization-guide/#client-credentials-flow))
* ☐ parse search result that was returned by API
* ☐ put search result into playlist via [Spotify playlist API](https://developer.spotify.com/documentation/web-api/reference/playlists/)
