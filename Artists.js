const fs = require("fs");
const root = "C:\\Users\\Dems\\OneDrive\\Musique";
const path = require("path");

let isSong = (s) => {
    let temp = s.split(".");
    return temp[1] === "mp3";
}
class Artist
{
    name;
    albums = [];
    data;
    setId(id)
    {
        console.log("seting id : ",id);
        this.id = id;
    }
    constructor(name){
        this.name = name;
    }
    pushAlbum(album)
    {
        this.albums.push(new Album(album));
    }
    pushSong(al,s)
    {
        this.albums.forEach(album => {
            if(album.name === al)
            {
                album.push(s);
            }
        })
    }
}
class Album
{
    name;
    songs = [];
    constructor(name)
    {
        this.name = name;
    }
    push(song)
    {
        this.songs.push(song);
    }
}
const artists = [];

fs.readdirSync(root).forEach(file => {
    artists.push(new Artist(file));
})

artists.forEach(artist => {
    try
    {
        fs.readdirSync(path.join(root,artist.name)).forEach(album => {
            artist.pushAlbum(album);
        })
    }
    catch(err)
    {

    }
})

artists.forEach(artist => {
    try
    {
        artist.albums.forEach(album => {
            fs.readdirSync(path.join(root,artist.name,album.name)).forEach(song => {
                if(isSong(song))
                {
                    artist.pushSong(album.name,song);
                }
                
            })
        })
    }
    catch(err)
    {

    }
})


module.exports = artists;