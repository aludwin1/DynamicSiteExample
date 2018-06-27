const Profile = require("./profile.js");
const renderer = require('./renderer');

const commonHeader = ['Content-Type', 'text/html'];

function home(request, response) {
  if(request.url === '/') {
    if(request.method.toLowerCase() === 'get') {
      response.setHeader(...commonHeader);
      renderer.view('header', {}, response);
      renderer.view('search', {}, response);
      renderer.view('footer', {}, response);
      response.end();
    } else if (request.method.toLowerCase() === 'post') {
      request.on('data', function(body) {
        const username = body.toString().replace('username=', '');
        response.writeHead(303, { 'Location': '/' + username });
        response.end();
      });

    }
  }
};

function user(request, response) {
  const username = request.url.replace('/', '');
  if(username.length > 0) {
    response.setHeader(...commonHeader);
    renderer.view('header', {}, response);

    const studentProfile = new Profile(username);
    studentProfile.on('end', function(profileJSON) {
      //show profile

      //store the values that we need
      const values = {
        avatarURL: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      };
      //Simple response
      renderer.view('profile', values, response);
      renderer.view('footer', {}, response);
      response.end();
    });

    studentProfile.on('error', function(error) {
      //show error
      renderer.view('error', {errorMessage: error.message}, response);
      renderer.view('search', {}, response);
      renderer.view('footer', {}, response);
      response.end();
    });
  }
}

module.exports = {
  home: home,
  user: user
};
