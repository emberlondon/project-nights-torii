# Project Nights Torii

This is a toy app for exploring [Torii](https://github.com/Vestorly/torii).

## Setup

1. Install dependencies

   ```sh
   $ npm install
   $ bower install
   ```

2. [Register an app with GitHub](https://github.com/settings/applications/new).

   Fill in `Authorization callback URL` with `http://localhost:4200/`.

   Takes note of *Client ID* and *Client Secret*.

## Run

1. Boot Ember CLI’s development server:

   ```sh
   $ GITHUB_CLIENT_ID=yourclientid GITHUB_CLIENT_SECRET=yourclientsecret ember serve
   ```

   Alternatively you can export the environment variable into your shell:

   ```sh
   $ export GITHUB_CLIENT_ID=yourclientid
   $ export GITHUB_CLIENT_SECRET=yourclientsecret
   $ ember serve
   ```

2. Visit `http://localhost:4200/`.
