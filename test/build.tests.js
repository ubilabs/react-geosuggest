const expect = require('chai').expect;

const childProcess = require('child_process');
const path = require('path');
const package = require('../package.json');

describe('The module build', function () {
  it('creates an importable module', function(done) {
    this.timeout(60000);
    
    const rootDir = path.resolve(__dirname, '..');
    childProcess
      .exec('npm run build:module', { cwd: rootDir })
      .on('exit', function (exitCode) {
        expect(exitCode).to.equal(0);
        
        const ctor = require(path.resolve(rootDir, package.main));
        expect(ctor).to.be.a('function');
        done();
      });
  });
});
