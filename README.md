<img align="right" src="https://travis-ci.org/clamm/stooge.svg?branch=master"/>

# Stooge

Parse m3u playlists to search for their contents on Spotify and create Spotify playlists from the m3u playlist.

NB: stooge = (derogatory) A subordinate used by another to do unpleasant routine work. (source [https://www.lexico.com/en/definition/stooge](https://www.lexico.com/en/definition/stooge))


## Usage

The program is structured in three parts:

1. read and parse the original .m3u file and save the result as json file to disk ([parse_m3u.py](./src/python/))
1. read json file and search songs in Spotify and save result as json file to disk ([search_songs.js](./src/node/))
1. read second json file and post songs to playlist in Spotify ([create_playlist.js](./src/node/))


### Python

Install necessary python packages:
```
cd src/python
pip install -r requirements.txt
```

Execute with `python3 parse_m3u.py ../../example/Pop.m3u`

#### Tests

Run tests on command line with `python3 -m nose --with-json-extended` (or in atom editor using [python-nosetests plugin](https://atom.io/packages/python-nosetests) with F5 - I haven't found convenient way yet to use [nose2](https://github.com/nose-devs/nose2) in atom). Also run `git update-index --assume-unchanged nosetests.json` to ignore any changes to the file.

Code written in python 3.6.


### Node JS

Install required node js packages with
```
cd src/node
npm install
```

Execute with `node search_songs.js ../../example/pop.json`


#### Tests

Run tests on command line with `npm test` (and with `Ctrl + Option + m` in atom).

Code written in NodeJS 12.10.


## Next steps

* ✔️ setup python tests
  * ✔️ mock open() and hand in lines
* ✔️ read file and get relevant lines
* ✔️ parse lines into song / artist information
  * ☐ possibly be smarter in parsing non-conform lines
  * ☐ possibly save entries with (originally) unknown artist/song, to shazam later to find actual song/artist
* ✔️ make query out of song / artist information
* ✔️ fire search query against [Spotify search API](https://developer.spotify.com/documentation/web-api/reference/search/search/)
  * ✔️ figure out authentication and authorization of Spotify API ([docs](https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow)) --> I think [Client Credentials Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow) is the way to go
  * ✔️figure out how to build on [app.js](https://github.com/spotify/web-api-auth-examples/blob/master/client_credentials/app.js) to access Spotify APIs
  * ✔️ add linting and tests for nodejs
  * ☐ figure out how to loop over individual song requests (given that they have async callbacks) and I want one file with _all songs_
* ✔️ parse search result that was returned by API
  * ☐ log what wasn't found
* ☐ put search result into playlist via [Spotify playlist API](https://developer.spotify.com/documentation/web-api/reference/playlists/)
* ☐ add licence to repo
* ☐ write shell script to call different parts of program


# Acknowledgement

Thanks to Spotify for providing the [Authentication Flow example app](https://github.com/spotify/web-api-auth-examples) and @FQ400 for making sense of it!
