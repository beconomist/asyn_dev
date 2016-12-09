var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');
var configFilename = './rss_feeds.txt';

// 
function checkForRSSFile() {
  fs.exists(configFilename, function(exists) {
    if (!exists)
      return next(new Error('Missing RSS file: ' + configFilename));

    next(null, configFilename);
  });
}

function readRSSFile(configFilename) {
  fs.readFile(configFilename, function(err, feedList) {
    if (err) return next(err);

    console.log('feedList: \n' + feedList);
    feedList = feedList
                    .toString()
                    .replace(/^\s+|\s+$/g, '')
                    .split('\n');
    var random = Math.floor(Math.random() * feedList.length);
    next(null, feedList[random]);
  });
}

function downloadRSSFile(feedUrl) {
  request({uri: feedUrl}, function(err, res, body) {
    if (err) return next(err);
    if (res.statusCode != 200)
      return next(new Error('Abnormal response status code'))

    next(null, body);
  });
}

function parseRSSFile(rss) {
  var handler = new htmlparser.RssHandler();
  var parser = new htmlparser.Parser(handler);
  parser.parseComplete(rss);

  if (!handler.dom.items.length)
    return next(new Error('No RSS items found'));

  // console.log(handler.dom.items);
  for (var i = 0; i < handler.dom.items.length; i++) {
      console.log((i+1) + " " + handler.dom.items[i].title);
      console.log("  " + handler.dom.items[i].link);
    }
  }
  // var item = handler.dom.items.shift();
  // console.log(item.title);
  // console.log(item.link);

var tasks = [checkForRSSFile, readRSSFile, downloadRSSFile, parseRSSFile];

function next(err, result) {
  if (err) throw err;

  var currentTask = tasks.shift();

  if (currentTask) {
    currentTask(result);
  }
}

next();
