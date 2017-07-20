import gulp from 'gulp';
import del from 'del';

const paths = {
  assets: './client/**/*.{css,html}',
  scripts: './client/**/*.ts',
  dest: './public'
};

const clean = () => del(['./public/*']);

function assets() {
  return gulp.src(paths.assets)
    .pipe(gulp.dest(paths.dest));
}

function scripts() {
  return gulp.src(paths.scripts)
    .pipe(gulp.dest(paths.dest));
}

function watch() {
  gulp.watch(paths.assets, assets);
  gulp.watch(paths.scripts, scripts);
}

const build = gulp.series(clean, gulp.parallel(assets, scripts));

export {
  clean,
  build,
  watch
};

export default build;
