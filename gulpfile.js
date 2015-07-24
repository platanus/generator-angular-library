var gulp = require('gulp'),
    bump = require('gulp-bump'),
    git = require('gulp-git'),
    npm = require('npm'),
    prompt = require('gulp-prompt');

gulp.task('bump', function (cb) {
  var versionType = 'major';
  gulp.src(['.']).pipe(
    prompt.prompt({
      type: 'list',
      name: 'bump',
      message: 'What type of bump would you like to do?',
      choices: ['patch', 'minor', 'major']
    }, function(res){
      versionType = res.bump;
      gulp.src(['./package.json'])
        .pipe(bump({type: versionType}))
        .pipe(gulp.dest('./'))
        .on('end', function(){
          cb();
        });
    }));
});

gulp.task('publish-git', ['bump'], function (cb) {
  var pkg = require('./package.json');
  var msg = 'Bumps version '+pkg.version;
  gulp.src('./*.json')
    .pipe(git.add())
    .pipe(git.commit(msg))
    .pipe(git.tag('v'+pkg.version, msg, function(){
      git.push('origin', 'master', { args: '--tags' }, function(){
        cb();
      });
    }));
});

gulp.task('publish-npm', ['publish-git'], function(cb) {
  npm.load({}, function(error) {
    if (error) return console.error(error);
    npm.commands.publish(['.'], function(error) {
      if (error) return console.error(error);
      cb();
    });
  });
});
