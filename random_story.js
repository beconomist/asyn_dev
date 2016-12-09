// Serial flow control is implemented in this program. Four tasks, including checkForRSSFile, readRSSFile, downloadRSSFile, parseRSSFile are processed one after another, even if they are all asynschronous functions.
var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');
var configFilename = './rss_feeds.txt';

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
  request({uri: feedUrl}, function(err, res, rawHTML) {
    if (err) return next(err);
    if (res.statusCode != 200)
      return next(new Error('Abnormal response status code'))

    next(null, rawHTML);
  });
}

function parseRSSFile(rawHTML) {
  var handler = new htmlparser.RssHandler();
  var parser = new htmlparser.Parser(handler);
  parser.parseComplete(rawHTML);

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

// Tasks array: add each task to be performed to an array in execution order
var tasks = [checkForRSSFile, readRSSFile, downloadRSSFile, parseRSSFile];

// Helper function: it executes each task
function next(err, result) {
  if (err) throw err;
  var currentTask = tasks.shift();
  if (currentTask) {
    currentTask(result);
  }
}

next();
