import Ember from 'ember';

export default Ember.Route.extend({
  // Before we enter any sub-routes, attempt to fetch the session.
  // If fetching fails, transition directly to the sign-in route.
  beforeModel: function() {
    return this.get('session').fetch()
      .catch(Ember.run.bind(this, function() {
        this.transitionTo('sign-in');
      }));
  },

  actions: {
    // Call open on the session. If successful, transition to the index route.
    authenticate: function() {
      this.get('session').open('github')
        .then(Ember.run.bind(this, function() {
          this.transitionTo('index');
        }));
    },

    // Call close on the session. If successful, transition to the sign-in route.
    deauthenticate: function() {
      this.get('session').close()
        .then(Ember.run.bind(this, function() {
          this.transitionTo('sign-in');
        }));
    }
  }
});
