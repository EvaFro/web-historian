var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
// importing from the httphelper
const http = require('./http-helpers');
const fs = require('fs');

exports.handleRequest = function (req, res) {
  const reqType = req.method;
  
  if (reqType === 'GET') {
    res.writeHead(200, http.headers);
    if (req.url === '/') {
      let newUrl = `${archive.paths.siteAssets}/index.html`;
      http.serveAssets(res, newUrl);

    } else if (req.url === '/styles.css') {
      let testUrl = `${archive.paths.siteAssets}${req.url}`;
      http.serveAssets(res, testUrl, (data) => {
        res.end(data);
      });
    } else {
      let testUrl = `${archive.paths.archivedSites}/${req.url}`;
      http.serveAssets(res, testUrl, (data) => {
        res.end(data);
      });
    }
  }
  
  if (reqType === 'POST') {
    req.on('data', (data) => {
      let workingUrl = data.toString().slice(4);
      res.writeHead(302, http.headers);
      archive.isUrlInList(workingUrl, (exsits)=>{
        if (exsits) {
          archive.isUrlArchived(workingUrl, (exsits) => {
            if (exsits) {
              var asset = `${archive.paths.archivedSites}/${workingUrl}`;
              http.serveAssets(res, asset);
            } else {
              archive.downloadUrls([workingUrl]);
              var asset = `${archive.paths.siteAssets}/loading.html`;
              http.serveAssets(res, asset);
            }
          });
        } else {
          archive.addUrlToList(workingUrl, () => {
            console.log('done!');
            var asset = `${archive.paths.siteAssets}/loading.html`;
            http.serveAssets(res, asset);  
          });
          
          
        }
      });
    });
  }
};
