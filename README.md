# Project Nights Torii

This is a toy app for exploring [Torii](https://github.com/Vestorly/torii).

## Setup

1. Install dependencies

   ```sh
   $ npm install
   $ bower install
   ```

2. [Register an app with GitHub](https://github.com/settings/applications/new).

   Fill in **Authorization callback URL** with `http://localhost:4200/`.

   Takes note of **Client ID** and **Client Secret**.

## Run

1. Boot Ember CLI’s development server:

   ```sh
   $ GITHUB_CLIENT_ID=yourclientid GITHUB_CLIENT_SECRET=yourclientsecret ember serve
   ```

   Alternatively you can export the environment variables into your shell:

   ```sh
   $ export GITHUB_CLIENT_ID=yourclientid
   $ export GITHUB_CLIENT_SECRET=yourclientsecret
   $ ember serve
   ```

2. Visit `http://localhost:4200/`.

## Notes

### Configuring Torii

Torii is configured in **config/environment.js**:

```js
var ENV = {
  environment: environment,
  baseURL: '/',
  locationType: 'auto',
  EmberENV: {
    FEATURES: {
      // Here you can enable experimental features on an ember canary build
      // e.g. 'with-controller': true
    }
  },

  APP: {
    // Here you can pass flags/options to your application instance
    // when it is created
  },

  torii: {
    providers: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        redirectUri: 'http://localhost:4200/'
      }
    },
    sessionServiceName: 'session'
  }
};
```

At the time of writing Torii expectes to find its configuration in
`window.ENV`. Ember CLI uses `window.MyAppENV` so we need to tweak
`app/index.html` accordingly:

```html
<script>
  window.ProjectNightsENV = {{ENV}};
  window.ENV = window.ProjectNightsENV; // <--- alias MyAppENV as ENV for Torii
  window.EmberENV = window.ProjectNightsENV.EmberENV;
</script>
```

Torii provides a lightweight `Session` object. It is injected into routes,
controllers and views as the property specified by `sessionServiceName`.
If no `sessionServiceName` is specified the session is **not** injected.

## GitHub Torii Provider

Provider know how to initiate an auth flow for third party services. For this
example, we create a GitHub provider in `app/torii-providers/github.js`.
Providers must implement an `open` method that returns a promise. The promise
should resolve with authentication data received from the third party or
reject with an error if something goes wrong.

Typically, initiating an OAuth flow with a third party involves opening a popup
window pointed at the OAuth authorization URL. In GitHub’s case, the URL is
`https://github.com/login/oauth/authorize'. Torii provides an abstraction for
this process, available as `popup` on the provider.

To open a popup window, we call `open` on the popup object passing two
arguments. The first is the URL to open. The second is an array of the
parameters we except to receive back from the third party.

For our GitHub provider, we expect to get two parameters back:

- `code`: a token we can exchange for an access token
- `state`: a unique random string that we passed along when we opened the window
