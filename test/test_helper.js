const jsdom = require('jsdom'),
  doc = jsdom.jsdom('<!doctype html><html><body></body></html>'),
  win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach(key => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});
