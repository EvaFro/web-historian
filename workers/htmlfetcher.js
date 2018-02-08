// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');


exports = archive.readListOfUrls(urls=>console.log("the file contians these ",urls));

