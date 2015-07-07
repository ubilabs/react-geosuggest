var gulp = require('gulp'),
  git = require('gulp-git'),
  initGulpTasks = require('react-component-gulp-tasks');


/**
 * Task configuration is loaded from config.js
 *
 * Make any changes to the source or distribution files
 * and directory configuration there
 */

var config = require('./gulpconfig');


/**
 * Tasks are added by the react-component-gulp-tasks package
 *
 * See https://github.com/JedWatson/react-component-gulp-tasks
 * for documentation.
 *
 * You can also add your own additional gulp tasks if you like.
 */

initGulpTasks(gulp, config);

gulp.task('serve', ['dev']);

gulp.task('publish:tag', function(done) {
  var version = require('./package.json').version;
  var message = 'Release ' + version;

  return gulp.src('./*.json')
    .pipe(git.add())
    .pipe(git.commit('chore(release): ' + version));

  git.tag(version, message, function (err) {
    if (err) throw err;
    git.push('origin', 'master', function (err) {
      if (err) throw err;
      done();
    });
  });
});

gulp.task('build-and-publish', ['build', 'publish:tag', 'publish:npm', 'publish:examples']);
gulp.task('release', ['bump', 'build-and-publish']);
gulp.task('release:patch', ['release']);
gulp.task('release:minor', ['bump:minor', 'build-and-publish']);
gulp.task('release:major', ['bump:major', 'build-and-publish']);
