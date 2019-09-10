<img align="right" src="https://travis-ci.org/clamm/stooge.svg?branch=master"/>

# Stooge

Parse m3u playlists to search for their contents on Spotify and create Spotify playlists from the m3u playlist.

NB: stooge = (derogatory) A subordinate used by another to do unpleasant routine work. (source [https://www.lexico.com/en/definition/stooge](https://www.lexico.com/en/definition/stooge))


## Usage

Install required packages `pip install -r requirements.txt`

Execute with `python3 src/parse_m3u.py example/Pop.m3u`


### Tests

Install [nose](https://nose.readthedocs.org/en/latest/) and [nosetests-json-extended](https://github.com/thschenk/nosetests-json-extended):
`pip install nose nosetests-json-extended`

Run tests on command line with `python3 -m nose --with-json-extended` (or in atom editor using [python-nosetests plugin](https://atom.io/packages/python-nosetests) with F5 - I haven't found convenient way yet to use [nose2](https://github.com/nose-devs/nose2) in atom).

Code written in python 3.6.


## Next steps

* ✔️ setup tests
  * ✔️ mock open() and hand in lines
* ✔️ read file and get relevant lines
* ✔️ parse lines into song / artist information
  * ☐ possibly be smarter in parsing non-conform lines
  * ☐ possibly save entries with (originally) unknown artist/song, to shazam later to find actual song/artist
* ☐ make query out of song / artist information
* ☐ fire search query against [Spotify search API](https://developer.spotify.com/documentation/web-api/reference/search/search/)
  * ☐ figure out authentication and authorization of Spotify API ([docs](https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow))
* ☐ parse search result that was returned by API
  * ☐ log what wasn't found
* ☐ put search result into playlist via [Spotify playlist API](https://developer.spotify.com/documentation/web-api/reference/playlists/)
