# Tektroniks Metacatalog Server [![Build Status](https://travis-ci.org/claudiocro/tektronix-metacatalog-server.svg?branch=release)](https://travis-ci.org/claudiocro/tektronix-metacatalog-server?branch=release)

Tektronix Metacatalog Server

For more infos checkout out: https://github.com/claudiocro/tektronix-metacatalog-sane


## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [PhantomJS](http://phantomjs.org/)
* [Sails.js](http://sailsjs.org/)

## Installation

* `git clone https://github.com/claudiocro/tektronix-metacatalog-server.git` this repository
* change into the new directory
* `npm install`

## Running / Development

* `sails lift`
* `node --debug app.js` (debug)
* `node-inspector --save-live-edit` (start node-instector)

API is served at: `http://localhost:1337/api/v1/`

# Convert files

Make shure destination directory exists
`convert file.pdf dir/image.png`

### Release

This app follows the `semantc-release`
* `commit` to master branch

## Further Reading / Useful Links

* [Sails.js](http://sailsjs.org/)
* [semantic-release](https://github.com/semantic-release/semantic-release/)


