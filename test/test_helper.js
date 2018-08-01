const jsdom = require('jsdom'),
  dom = new jsdom.JSDOM('<!doctype html><html><body></body></html>', {
    url: 'https://example.org/'
  });

global.window = dom.window;
global.document = dom.window.document;

Object.keys(window).forEach(key => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});
