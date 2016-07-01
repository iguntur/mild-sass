'use strict';
const path = require('path');
const gulp = require('gulp');
const iF = require('gulp-if');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const config = require('mild-config');

const plugins = Object.create(null);

module.exports = (source, dest, opts) => {
	opts = opts || config.get('css.options');
	opts.outputStyle = config.get('production') ? 'compressed' : 'expanded';

	plugins.autoprefixer = opts.autoprefixer;
	delete opts.autoprefixer;

	source = path.join(config.get('css.sourcePath'), source);

	return gulp.src(source)
		.pipe(iF(config.get('sourcemaps'), sourcemaps.init()))
		.pipe(sass(opts).on('error', sass.logError))
		.pipe(autoprefixer(plugins.autoprefixer))
		.pipe(concat(dest || 'app.css'))
		.pipe(iF(config.get('sourcemaps'), sourcemaps.write('./')))
		.pipe(gulp.dest(config.get('css.outputPath')));
};
