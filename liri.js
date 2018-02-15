require("dotenv").config();

// Access to key information:
var keys = require("./keys.js"); // Require imports 
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var userSearch = process.argv[3]; // Either <song name> or <movie name>
	// if (userSearch.length == 0) {
	// 	userSearch = "Mr. Nobody";
	// }
var operator = process.argv[2];
var omdbURL = "http://www.omdbapi.com/?t=" + userSearch + "&apikey=trilogy";
// REQUEST OMDB NPM ================================================================

switch(operator) {
	case "my-tweets":
		var client = new Twitter({
		  consumer_key: keys.twitter.consumer_key,
		  consumer_secret: keys.twitter.consumer_secret,
		  access_token_key: keys.twitter.access_token_key,
		  access_token_secret: keys.twitter.access_token_secret
		});
		 
		var params = {screen_name: 'maximacious', count: 20}; // 20 is limit of most recent tweets
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		  	for (var i = 0; i < tweets.length; i++) {
		  		console.log(tweets[i].text);
		  	}
		  }
		});
		break;
	case "spotify-this-song":
		var spotify = new Spotify({
			id: process.env.SPOTIFY_ID,
			secret: process.env.SPOTIFY_SECRET
		});
		console.log(userSearch);
		spotify.search({ type: 'track', query: userSearch }, function(err, data) {
			if (err) {
				return console.log('Error occurred: ' + err);
			} else {
				console.log(data.tracks[0]);
				console.log("Title: " + body.Title);
				console.log("Year Released: " + body.Year);
				console.log("IMDB Rating: " + JSON.stringify(body.Ratings[0].Value));
				console.log("Rotten Tomatoes Rating: " + JSON.stringify(body.Ratings[1].Value));
				console.log("Language: " + body.Language);
				console.log("Plot: " + body.Plot);
				console.log("Actors: " + body.Actors);
			};
		})
		break;
	case "movie-this":
		request(omdbURL, function (error, response, body) {
			// console.log('error:', error); // Print the error if one occurred
			// console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			// console.log('body:', body); // Print the HTML for the Google homepage.
			// console.log(JSON.parse(response.body, null, 2)); // HOW DO I CLEAN UP THE CODE IN TERMINAL?
			body = JSON.parse(body);

			if (!error && response.statusCode === 200) {
				console.log("Title: " + body.Title);
				console.log("Year Released: " + body.Year);
				console.log("IMDB Rating: " + JSON.stringify(body.Ratings[0].Value));
				console.log("Rotten Tomatoes Rating: " + JSON.stringify(body.Ratings[1].Value));
				console.log("Language: " + body.Language);
				console.log("Plot: " + body.Plot);
				console.log("Actors: " + body.Actors);
			}
		});
		break;
	case "do-what-it-says":

		break;
}


// PUT THIS INSIDE OF A FUNCTION LIKE 
// console.log(JSON.stringify(data, null, 2));
// console.log(err);
