import gulp from 'gulp';
import tsc from 'gulp-typescript';
import del from 'del';
import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';

import server from './server';

const bsServer = browserSync.create();
const bsConfig = {
  server: {
    baseDir: './public',
    middleware: [ historyApiFallback() ],
    routes: {
      "/node_modules": "node_modules"
    }
  },
  port: process.env.PORT || 3000,
  open: false
};

const paths = {
  tsConfig: './client/tsconfig.json',
  assets: './client/**/*.{html,js}',
  styles: './client/**/*.css',
  scripts: './client/**/*.ts',
  dest: './public'
};

const clean = () => del(['./public/*']);

function assets() {
  return gulp.src(paths.assets)
    .pipe(gulp.dest(paths.dest))
    .pipe(bsServer.stream());
}

function styles() {
  return gulp.src(paths.styles)
    .pipe(gulp.dest(paths.dest))
    .pipe(bsServer.stream());
}

function scripts() {
  const tsProject = tsc.createProject(paths.tsConfig);
  const tsResult = gulp.src(paths.scripts)
    .pipe(tsProject());

  return tsResult
    .js
    .pipe(gulp.dest(paths.dest))
    .pipe(bsServer.stream());
}

function watch() {
  gulp.watch(paths.styles, styles);
  gulp.watch(paths.scripts, scripts);
  gulp.watch(paths.assets, assets);
}

function serve_dev() {
  return bsServer.init(bsConfig);
}

function serve() {
  server();
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
    serve_dev,
    serve
  )
);

export {
  clean,
  build,
  dev,
  serve
};

export default serve;
