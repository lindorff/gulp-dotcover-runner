var path = require('path');

/* global require,describe,it,beforeEach */
(function() {
    "use strict";
    var expect = require('chai').expect;
    var dotcover;

    describe('Tests for gulp-dotcover-runner', function() {
        beforeEach(function() {
            dotcover = require('../');
        });

        describe('Testing executable names with and without spaces.', function() {

            it('should not quote a non-quoted executable path with no spaces', function() {
                var opts = { executable: "./tools/dotCover/dotCover.exe" };

                expect(dotcover.getExecutable(opts)).to.equal("./tools/dotCover/dotCover.exe");
            });

            it('should unquote a double quoted executable path with no spaces', function() {
                var opts = { executable: '"./tools/dotCover/dotCover.exe"' };

                expect(dotcover.getExecutable(opts)).to.equal("./tools/dotCover/dotCover.exe");
            });

            it('should unquote a single quoted executable path with no spaces', function() {
                var opts = { executable: "'./tools/dotCover/dotCover.exe'" };

                expect(dotcover.getExecutable(opts)).to.equal("./tools/dotCover/dotCover.exe");
            });

            it('should call dotcover with "cover" option', function() {
                var opts = { target: {} };

                expect(dotcover.getArguments(opts, [])).to.include("cover");
            });

            it('should not quote a non-quoted target executable path with no spaces', function() {
                var opts = { target: { executable: "./tools/xunit/xunit.console.exe" }};

                expect(dotcover.getArguments(opts, [])).to.include("/TargetExecutable=./tools/xunit/xunit.console.exe");
            });

            it('should unquote a double quoted target executable path with no spaces', function() {
                var opts = { target: { executable: '"./tools/xunit/xunit.console.exe"' }};

                expect(dotcover.getArguments(opts, [])).to.include("/TargetExecutable=./tools/xunit/xunit.console.exe");
            });

            it('should unquote a single quoted target executable path with no spaces', function() {
                var opts = { target: { executable: "'./tools/xunit/xunit.console.exe'" }};

                expect(dotcover.getArguments(opts, [])).to.include("/TargetExecutable=./tools/xunit/xunit.console.exe");
            });
        })
    });
}());
