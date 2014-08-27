import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    return this.get('session').fetch()
      .catch(Ember.run.bind(this, function() {
        this.transitionTo('sign-in');
      }));
  },

  actions: {
    authenticate: function() {
      this.get('session').open('github')
        .then(Ember.run.bind(this, function() {
          this.transitionTo('index');
        }));
    },

    deauthenticate: function() {
      this.get('session').close()
        .then(Ember.run.bind(this, function() {
          this.transitionTo('sign-in');
        }));
    }
  }
});
