import chai = require('chai');
import childProcess = require('child_process');
import path = require('path');

const {expect} = chai;

describe('The module build', () => {
  it('creates an importable module', function(done) {
    this.timeout(60000);

    const rootDir = path.resolve(__dirname, '..');
    childProcess
      .exec('npm run build:module', {cwd: rootDir})
      .on('exit', exitCode => {
        expect(exitCode).to.equal(0);

        const ctor = require(path.resolve(rootDir, 'module', 'Geosuggest.umd.js'));
        expect(ctor.default).to.be.a('function');
        done();
      });
  });
});
