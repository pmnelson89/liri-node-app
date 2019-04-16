require("dotenv").config();

const keys = require("./keys.js");;
const Spotify = require("node-spotify-api")
const spotify = new Spotify(keys.spotify);
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");
const request = require("request");

//what type of search you want to do
const command = process.argv[2];
//what you want to search for
const param = process.argv.slice(3).join(" ");

//establish command
function runApp(command, param) {
    if (command === "concert-this") {
        concertSearch(param);
    } else if (command === "spotify-this-song") {
        songSearch(param);
    } else if (command === "movie-this") {
        movieSearch(param);
    } else if (command === "do-what-it-says") {
        itSays();
    } else {
        console.log("Please enter a valid command: 'concert-this', 'spotify-this-song', 'movie-this, or 'do-what-it-says'");
    }
}

//concert-this
function concertSearch(param) {
   
    var queryURL = "https://rest.bandsintown.com/artists/" + param + "?app_id=codingbootcamp";

    axios.get(queryURL).then (
        function (response) {
            console.log(response);
            // console.log("Venue: " + response.data[0].venue.name + "\n");
            // console.log("Location: " + response.data[0].venue.city + "\n");
            // console.log("Date: " + moment(response.data[0].datetime).format("MM-DD-YYYY") + "\n");

            // var newConcert = "Bands In Town Results" + "\nVenue: " + response.data[0].venue.name + "\nLocation: " + response.data[0].venue.city + "\nDate: " + moment(response.data[0].datetime).format("MM-DD-YYYY") + "\n";

            // fs.appendFile("log.txt", newConcert, function(err) {
            //     if (err)
            //         console.log(err);
            // });
        }
    );
};

//spotify-this-song
function songSearch(param) {
    
    if(!param) {
        AudioParamMap = "The Sign";
    };

    spotify.search({ type: "track", query: param}, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }

        console.log("\n------------------------------------------\n");
        console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name + "\n");
        console.log("Song Title: " + data.tracks.items[0].name + "\n");
        console.log("Song preview: " + data.tracks.items[0].href + "\n");
        console.log("Album: " + data.tracks.items[0].album.name + "\n");

        var newSong = "Spotify Results" + "\nArist: " + data.tracks.items[0].name + "\nSong Title: " + data.tracks.items[0].name + "\nSong preview: " + data.tracks.items[0].href + "\nAlbum: " + data.tracks.items[0].album.name;

        fs.appendFile("log.txt", newSong, function(err) {
            if (err) 
                console.log(err);
        });
    });
};

//movie-this
function movieSearch(param) {

    if(!param) {
        param = "Mr. Nobody";
    }
    var queryURL = "http://www.omdbapi.com?/t=" + param + "&y=&plot=short&apikey=trilogy";

    axios.request(queryURL).then(

        function (response) {
            console.log(response);
            console.log("Title: " + response.data.Title + "\n");
            console.log("Released: " + response.data.Year + "\n");
            console.log("Rating: " + response.data.imdbRating + "\n");
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].value + "\n");
            console.log("Country: " + response.data.Country + "\n");
            console.log("Language: " + response.data.Language + "\n");
            console.log("Plot: " + response.data.Plot + "\n");
            console.log("Actors: " + response.data.Actors + "\n");

        var newMovie = "IMDB Results" + "\nTitle: " + response.data.Title + "\nReleased: " + response.data.Year + "\nRating: " + response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].value + "\nCountry: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors;

        fs.appendFile("log.txt", newMovie, function (err) {
            if (err)
                console.log(err);
        });
    });
}

function ifSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        } else {
            console.log(data);

            var random = data.split(",");
            runApp(random[0], random[1]);
        }
    });
}

function logResults (data) {
    fs.appendFile("log.txt", data, function (err) {
        if (err)
            console.log(err);
    });
}

runApp(command, param);