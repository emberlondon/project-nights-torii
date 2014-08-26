import Ember from 'ember';
import ajax from 'ic-ajax';
var Promise = Ember.RSVP.Promise;

export default Ember.Object.extend({
  open: function(authData) {
    return ajax({
      url: '/api/authorizations',
      type: 'POST',
      data: authData
    }).then(function(data) {
      var accessToken = data.access_token;
      localStorage.accessToken = accessToken;
      return { accessToken: accessToken };
    });
  },

  fetch: function() {
    var accessToken = localStorage.accessToken;

    if (accessToken) {
      return Promise.resolve({ accessToken: accessToken });
    } else {
      return Promise.reject();
    }
  },

  close: function() {
    delete localStorage.accessToken;
    return Promise.resolve();
  }
});
