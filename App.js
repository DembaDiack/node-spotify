const artists = require("./Artists");
const SpotifyWebApi = require('spotify-web-api-node');
const https = require("https");
const fs = require("fs");
const path = require("path");
let queries = [];
let tracks = [];
const spotifyApi = new SpotifyWebApi({
    clientId: '',
    clientSecret: ''
});

spotifyApi.clientCredentialsGrant().then(async result => {
    const token = result.body.access_token;
    spotifyApi.setAccessToken(token);
    artists.forEach(artist => {
        artist.albums.forEach(album => {
            album.songs.forEach(song => {
                song = song.split(".mp3")[0];
                let q = artist.name + " " + song;
                // queries = encodeURIComponent(q.trim());
                queries.push(q);
            })
        })
    });
    


    
})

const loop_artists = async (index = 0) => {
    if(index > queries.length){return 0};

    return spotifyApi.searchTracks(queries[index],{limit : 1})
    .then(async result => {

        if(result.body)
        {
            tracks.push(result.body.tracks.items[0]);
            console.log("done query",queries[index],index,"out of",queries.length,"found",result.body.tracks.items[0].name);
            fs.appendFileSync("database.json",JSON.stringify(result.body.tracks.items[0]) + "\n");
        }
        index = index + 1;
        return await loop_artists(index);
    })
    .catch(async err => {
        index = index + 1;
        return await loop_artists(index);
    })
}


module.exports = spotifyApi;
