
const SpotifyWebApi = require('spotify-web-api-node');
const { searchTracks } = require('./app');
const spotifyApi = new SpotifyWebApi({
    clientId: 'be1775db22fa46379449544b2c4aff9c',
    clientSecret: '64315f8c2be44102ba162baf0eea6d35'
});
let tracks = [];


spotifyApi.setAccessToken("BQB1wPX8KV_vRv2ql1EW2JSi5RWACTV4mFguVv8N3d18XPNMCDKGetYPa9-6ebqupUAW7sf7NzHfuF6ZBPLMYrOGhHw2h7uYM7bggQ9um470bNoFyw4OxM31UG2tYa7ts4W4WfGExdYP7MYeU8ngwNaqYnEjrQssWOK8HRlKB60q3wxbtc6OsTg&refresh_token=AQAbI6ux--bqmsR42DRjSKQ4C0qysMh6sa0Pam8F9pg4YP_Dy_2kyP-NsFBA6sE9SObqe0Rhff4R1obFpGYrqCjacxcd37YjooLAn-JHM91HxQQJO91QK_Zxj_KHex4O60c");

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