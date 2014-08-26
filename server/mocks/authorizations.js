var https = require('https');

module.exports = function(app) {
  app.use('/api/authorizations', function(req, res) {
    res.set('Content-Type', 'application/json');

    fetchAccessToken(req.param('code'), function(data) {
      res.send(data);
    });
  });
};

function fetchAccessToken(code, callback) {
  var env          = process.env;
  var clientId     = env.GITHUB_CLIENT_ID;
  var clientSecret = env.GITHUB_CLIENT_SECRET;
  var path         = '/login/oauth/access_token' +
                     '?client_id=' + clientId +
                     '&client_secret=' + clientSecret +
                     '&code=' + code;

  var options = {
    hostname: 'github.com',
    method: 'POST',
    path: path,
    headers: {
      Accept: 'application/json'
    }
  };

  var result = '';

  var req = https.request(options, function(res) {
    res.on('data', function(d) {
      result += d;
    });

    res.on('end', function() {
      callback(result);
    });
  });

  req.end();

  req.on('error', function(e) {
    console.error(e);
  });
}
