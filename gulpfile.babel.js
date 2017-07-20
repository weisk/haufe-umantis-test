import gulp from 'gulp';
import tsc from 'gulp-typescript';
import del from 'del';
import browserSync from 'browser-sync';

const server = browserSync.create();

const paths = {
  tsConfig: './client/tsconfig.json',
  assets: './client/**/*.{html,js}',
  styles: './client/styles.css',
  scripts: './client/**/*.ts',
  dest: './public'
};

const clean = () => del(['./public/*']);

function assets() {
  return gulp.src(paths.assets)
    .pipe(gulp.dest(paths.dest));
}

function styles() {
  return gulp.src(paths.styles)
    .pipe(gulp.dest(paths.dest))
    .pipe(server.stream());
}

function scripts() {
  const tsProject = tsc.createProject(paths.tsConfig);
  const tsResult = gulp.src(paths.scripts)
    .pipe(tsProject());

  return tsResult.js.pipe(gulp.dest(paths.dest));
}

function watch() {
  gulp.watch(paths.styles, styles);

  gulp.watch([
    paths.scripts,
    './client/**/*.css',
    '!./client/styles.css'
  ], scripts).on('change', server.reload);

  gulp.watch(paths.assets, assets).on('change', server.reload);
}

function serve() {
  server.init({
    server: {
      baseDir: './public',
      routes: {
        "/node_modules": "node_modules"
      }
    },
    port: process.env.PORT || 3000,
    open: false,
  });
}

const build = gulp.series(
  clean,
  gulp.parallel(
    assets,
    styles,
    scripts
  )
);

const dev = gulp.series(
  build,
  gulp.parallel(
    watch,
    serve
  )
);

export {
  clean,
  build,
  dev
};

export default build;
