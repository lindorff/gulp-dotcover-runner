'use strict';

var _ = require('lodash'),
    child_process = require('child_process'),
    gutil = require('gulp-util'),
    es = require('event-stream'),
    path = require('path'),
    temp = require('temp'),
    fs = require('fs');

var PLUGIN_NAME = 'gulp.dotcover.runner';
var EXECUTABLE_NAME = 'dotCover.exe';

var runner = function gulpDotcoverRunner(opts) {

    opts = opts || {};

    var files = [];

    var stream = es.through(function write(file) {
        if (_.isUndefined(file)) {
            fail(this, 'File may not be null.');
        }

        files.push(file);
        this.emit('data', file);
    }, function end() {
        run(this, files, opts);
    });

    return stream;
};

runner.getExecutable = function(options) {
    if (!options.executable)
        return EXECUTABLE_NAME;

    // trim any existing surrounding quotes and then wrap in ""
    var executable = unquotePathsIfNeeded(options.executable);

    return !path.extname(options.executable) ? path.join(executable, EXECUTABLE_NAME) : executable;
};

function unquotePathsIfNeeded(source) {

    if (!source)
        return;

    var replacements = [ '\\s', '"', "'" ].join(',');
    var regex = new RegExp("^[" + replacements + "]+|[" + replacements + "]+$", "g");

    var path = source.replace(regex, '');
    var qualifier = path.trim().indexOf(' ') > -1 ? '"' : '';

    return qualifier + path + qualifier;
}

runner.getArguments = function(options, assemblies) {

    options.target = options.target || {};

    var assemblyArgs = assemblies.map(function(asm) {
        return unquotePathsIfNeeded(asm);
    }).reduce(function(p,c) {
        return p.concat(c);
    }, []);

    var args = [];

    args.push("cover");
    args.push("/TargetExecutable=" + unquotePathsIfNeeded(options.target.executable));
    args.push("/TargetWorkingDir=" + unquotePathsIfNeeded(options.target.workingDirectory));
    args.push("/TargetArguments=" + assemblyArgs.join(" "));
    args.push("/output=" + unquotePathsIfNeeded(options.target.output));

    return args;
};

function fail(stream, msg) {
    stream.emit('error', new gutil.PluginError(PLUGIN_NAME, msg));
}

function run(stream, files, options) {

    var assemblies = files.map(function (file) {
        return file.path;
    });

    if (assemblies.length === 0) {
        return fail(stream, 'Some assemblies required.');
    }

    var exe = runner.getExecutable(options);
    var args = (runner.getArguments(options, assemblies));
    var opts = {
        stdio: "inherit"
    };

    var child = child_process.spawn(
        exe,
        args,
        opts);

    child.on('error', function (e) {
        fail(stream, e.code === 'ENOENT' ? 'Unable to find \'' + exe + '\'.' : e.message);
    });

    child.on('close', function (code) {

        if (options.teamcity)
            gutil.log("##teamcity[importData type='dotNetCoverage' tool='dotcover' path='" + options.target.output + "']");

        if (code !== 0) {
            gutil.log(gutil.colors.red('dotCover failed.'));
            fail(stream, 'dotCover failed.');
        }
        else {
            gutil.log(gutil.colors.cyan('dotCover finished.'));
        }

        return stream.emit('end');
    });
}

module.exports = runner;
