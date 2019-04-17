# liri-node-app

This application uses Node.js to create a bot that takes in arguments and returns data.

#### How To Use

In your command line, enter "node liri.js" followed by the command you want to perform and the parameter you would like to search for.

There are four commands to choose from:
* concert-this
* spotify-this-song
* movie-this
* do-what-it-says

## concert-this
This command uses axios to pull the next five shows from the Bands In Town API and displays them in the console as well as the log.txt file.  This information will include the artist, the venue, the city, and the date of each show.  If no artist is entered, the app will default to John Mayer.

* __Terminal:__ 

![alt text](screenshots/concert-this-terminal.png "concert-this results in terminal")

* __log.txt:__

![alt text](screenshots/concert-this-log.png "concert-this results in log.txt")

* __Default:__

![alt text](screenshots/concert-this-default.png "concert-this results with no artist")

## spotify-this-song
This command pulls song information from the Spotify API and displays it in the console as well as the log.txt file.  This information will include the artist, the song name, a preview link of the song from Spotify, and the album the song is from.  If no song is entered for the search, the app will default to "The Sign" by Ace of Base. __NOTE:  YOU MUST HAVE A SPOTIFY STORED IN YOUR OWN .ENV FILE FOR THIS TO WORK.__

* __Terminal:__

![alt text](screenshots/spotify-this-terminal.png "spotify-this-song in terminal")

* __log.txt:__

![alt text](screenshots/spotify-this-log.png "spotify-this-song in log.txt")

* __Default:__

![alt text](screenshots/spotify-this-default.png "spotify-this-song results with no song")

## movie-this
This command uses axios to pull movie information from the OMDB API and displays it in the console as well as the log.txt file.  This information will include the title, year of release, IMDB rating, Rotten Tomatoes rating, Country the movie was produced, language of the movie, the plot, and the actors in the movie.  If no movie is entered for the search, the app will default to "Mr. Nobody"

* __Terminal:__

![alt text](screenshots/movie-this-terminal.png "movie-this results in terminal")

* __log.txt:__

![alt text](screenshots/movie-this-log.png "movie-this results in log.txt")

* __Default:__

![alt text](screenshots/movie-this-default.png "movie-this results with no movie")

## do-what-it-says
This command pulls the information stored in the random.txt file and passes it through the app as a command and a search parameter. 

![alt text](screenshots/do-what.png "do-what-it-says results")