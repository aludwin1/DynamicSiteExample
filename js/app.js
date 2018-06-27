//Problem: We need a simple way to look at a user's badge count and JavaScript points from a web browser
//Solution: Use Node.js to perform the profile lookups and serve our templates via HTTP

//Create a web server
const http = require('http');
const router = require('./router');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
  router.home(request, response);
  router.user(request, response);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//Handle HTTP route GET / and POST / i.e. Home
  //If the url = "/" && GET, show search
  //If the url = "/" && POST, redirect to /:username
//Handle HTTP route GET /:username i.e. /chalkers

//Function that handles the reading of files and merge in value


