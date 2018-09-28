import jsdom = require('jsdom');
const dom = new jsdom.JSDOM('<!doctype html><html><body></body></html>', {
  url: 'https://example.org/'
});

const globalAny: any = global;

globalAny.window = dom.window;
globalAny.document = dom.window.document;

global = globalAny;

Object.keys(window).forEach(key => {
  if (!(key in global)) {
    (global as any)[key] = (window as any)[key];
  }
});
