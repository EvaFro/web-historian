var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
// importing from the httphelper
const http = require('./http-helpers');

exports.handleRequest = function (req, res) {
  const reqType = req.method;
  
  if (reqType === 'GET') {
    if (req.url === '/') {
      let newUrl = `${archive.paths.siteAssets}/index.html`;
      
      
      http.serveAssets(res, newUrl);
    } else {
      let testUrl = `${archive.paths.archivedSites}${req.url}`;
      http.serveAssets(res, testUrl);
    }
  }
  
  if (reqType === 'POST') {
    console.log('ReqType is POST, and doing this');

    res.end(archive.paths.list);
  }
  
};
