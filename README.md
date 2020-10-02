# React iTunes App

This repo is an example of an app that uses the iTunes search API. There are tests and linting setup.
Additional the current version of some package (mainly jest) require 10.16.2 or greater. However,
if you are wanting to run the code without running test it should work with lower versions of node.

## Usage
Basic install should be `npm install` and `npm start` to run the dev server.

- `Albums`: shows a list of albums from the artist
- `Search`: allows you to search with input text for albums by the artist
- `Favorites`: my favorite picks

## CLI

There are several npm scripts setup to help. The following can be run with `npm run ${script_name}`

- `test`: runs jest tests once and exits
- `test:watch` runs jest tests in watch mode
- `start`: starts the app with webpack-dev-server
- `build`: builds the app for `--mode production`
- `link`: runs eslint with mostly `airbnb` eslint rules.


