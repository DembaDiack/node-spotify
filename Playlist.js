
const SpotifyWebApi = require('spotify-web-api-node');
const { searchTracks } = require('./app');
const spotifyApi = new SpotifyWebApi({
    clientId: '',
    clientSecret: ''
});
let tracks = [];


spotifyApi.setAccessToken("");

var lines = require('fs').readFileSync("database.txt", 'utf-8')
    .split('\n')
    .filter(Boolean);

    lines.forEach(line => {
        tracks.push(JSON.parse(line).uri);
    })
  



    let i = 0;
    while(i < tracks.length)
    {
        let diff = tracks.length - i;
        let step = diff > 99 ? 99 : diff;
        spotifyApi.addTracksToPlaylist("451sjsMtjsvkzdIrK7Z2qe",tracks.slice(i,i+step));
        i += step;
    }