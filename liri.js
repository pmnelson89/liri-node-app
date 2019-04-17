require("dotenv").config();

//requirements
const keys = require("./keys.js");;
const Spotify = require("node-spotify-api")
const spotify = new Spotify(keys.spotify);
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");

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

    //if no artist is entered
    if(!param) {
        param = "John Mayer"
    }
   
    //build url
    var queryUrl = "https://rest.bandsintown.com/artists/" + param + "/events?app_id=codingbootcamp";

    //call API with axios
    axios.get(queryUrl).then (
        function (response) {

            //loop through responses
            for (var i = 0; i < 5; i ++) {
            
                var band = response.data[i];

                //store response data
                var logConcert = [
                    "\nBANDS IN TOWN RESULT",
                    "Artist: " + param, 
                    "Venue: " + band.venue.name,
                    "Location: " + band.venue.city,
                    "Date: " + moment(band.datetime).format("MM-DD-YYYY"),
                    "============================="
                ].join("\n\n");

                //print in console
                console.log(logConcert);

                //print in log.txt
                fs.appendFile("log.txt", logConcert, function(err) {
                    if (err) {
                        console.log(err);
                    }
                });  
            }
        }
    );
};

//spotify-this-song
function songSearch(param) {
    
    //if no song entered
    if(!param) {
        param = "The Sign Ace of Base";
    }

    //call spotify API
    spotify.search({ type: "track", query: param}, function (err, data) {
        
        //handle errors
        if (err) {
            console.log(err);
            return;
        }

        var song = data.tracks.items[0];

        //store response
        var logSong = [
            "\nSPOTIFY RESULT",
            "Song Title: " + song.name,
            "Artist: " + song.album.artists[0].name,
            "Song preview: " + song.href,
            "Album: " + song.album.name,
            "============================="
        ].join("\n\n");

        //print in console
        console.log(logSong);

        //print in log.txt
        fs.appendFile("log.txt", logSong, function(err) {
            if (err) {
                console.log(err);
            }
        });
    });  
};

//movie-this
function movieSearch(param) {

    //if no movie entered
    if(!param) {
        param = "Mr. Nobody";
    }

    //build url
    var queryUrl = "http://www.omdbapi.com/?t=" + param + "&y=&plot=short&apikey=trilogy";

    //call OMDB url with axios
    axios.get(queryUrl).then(
        function(response) {

            var movie = response.data;

            //store response
            var logMovie = [
                "\nOMDB RESULT",
                "Title: " + movie.Title,
                "Release Year: " + movie.Year,
                "IMDB Rating: " + movie.imdbRating,
                "Rotten Tomatoes Rating: " + movie.Ratings[1].Value,
                "Plot: " + movie.Plot,
                "Actors: " + movie.Actors,
                "============================="
            ].join("\n\n");

            //print in console
            console.log(logMovie);

            //print in log.txt
            fs.appendFile("log.txt", logMovie, function(err) {
                if (err) {
                    console.log(err);
                }
            });
        },
    );
}

//do-what-it-says
function itSays() {

    //call information from random.txt
    fs.readFile("random.txt", "utf8", function (err, data) {

        if (err) {
            return console.log(err);
        } else {

            //print in console
            console.log(data);

            //pass data from random.txt through the runApp function
            var random = data.split(",");
            runApp(random[0], random[1]);
        }
    });
}

//run the main function
runApp(command, param);