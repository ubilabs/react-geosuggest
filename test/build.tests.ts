import chai = require('chai');
import childProcess = require('child_process');
import path = require('path');

const {expect} = chai;

describe('The module build', () => {
  // eslint-disable-next-line prefer-arrow-callback
  it('creates an importable module', function (done) {
    // eslint-disable-next-line no-invalid-this
    this.timeout(60000);

    const rootDir = path.resolve(__dirname, '..');
    childProcess
      .exec('npm run build:module', {cwd: rootDir})
      .on('exit', (exitCode) => {
        expect(exitCode).to.equal(0);

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const ctor = require(path.resolve(
          rootDir,
          'module',
          'Geosuggest.umd.js'
        ));
        expect(ctor).to.be.a('function');
        done();
      });
  });
});
