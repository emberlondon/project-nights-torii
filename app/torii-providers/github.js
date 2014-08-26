import Ember from 'ember';
import { configurable } from 'torii/configuration';

var BASE_URL        = 'https://github.com/login/oauth/authorize';
var RESPONSE_PARAMS = ['code', 'state'];
var STATE_ERROR     = 'State does not match. The GitHub OAuth2 response cannot be trusted.';

export default Ember.Object.extend({
  name: 'github',
  configNamespace: 'providers.github',

  baseUrl: configurable('baseUrl', BASE_URL),
  clientId: configurable('clientId'),
  redirectUri: configurable('redirectUri'),
  scope: configurable('scope', null),

  open: function() {
    var params = this.getProperties(
      'clientId',
      'redirectUri',
      'scope'
    );
    var state = uuid.v4();
    params.state = state;
    var url = buildUrl(this.get('baseUrl'), params);

    return this.get('popup').open(url, RESPONSE_PARAMS)
      .then(function(authData) {
        if (authData.state === state) {
          return authData;
        } else {
          throw new Error(STATE_ERROR);
        }
      });
  }
});

function buildUrl(baseUrl, params) {
  return baseUrl + buildQueryString(params);
}

function buildQueryString(object) {
  var result = {};

  Ember.keys(object).forEach(function(key) {
    result[key.underscore()] = object[key];
  }, this);

  return '?' + Ember.$.param(result);
}
