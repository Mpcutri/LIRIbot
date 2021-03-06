// VARIABLES ================================================================
require('dotenv').config();
const db = require('db');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var omdbURL = "http://www.omdbapi.com/?apikey=trilogy&";

// PROCESS.ENV ================================================================
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
})

// TWITTER NPM ================================================================
var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

// SPOTIFY NPM ================================================================
var spotify = new Spotify({
  id: <your spotify client id>,
  secret: <your spotify client secret>
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});

// REQUEST OMDB NPM ================================================================
request(omdbURL, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

// SPOTIFY Search ================================================================
search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);