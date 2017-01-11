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

        describe('Testing executable option', function() {

            it('should not quote a non-quoted path with no spaces', function() {
                var opts = { executable: "./tools/dotCover/dotCover.exe" };

                expect(dotcover.getExecutable(opts)).to.equal("./tools/dotCover/dotCover.exe");
            });

            it('should unquote a double quoted path with no spaces', function() {
                var opts = { executable: '"./tools/dotCover/dotCover.exe"' };

                expect(dotcover.getExecutable(opts)).to.equal("./tools/dotCover/dotCover.exe");
            });

            it('should unquote a single quoted path with no spaces', function() {
                var opts = { executable: "'./tools/dotCover/dotCover.exe'" };

                expect(dotcover.getExecutable(opts)).to.equal("./tools/dotCover/dotCover.exe");
            });

            it('should not unquote a single quoted path with spaces', function() {
                var opts = { executable: "'./tools etc/dotCover/dotCover.exe'" };

                expect(dotcover.getExecutable(opts)).to.equal('"./tools etc/dotCover/dotCover.exe"');
            });
        });

        describe('testing dotcover options', function() {

            it('should call dotcover with "cover" option', function() {
                var opts = { target: {} };

                expect(dotcover.getArguments(opts, [])).to.include("cover");
            });
        });

        describe('testing dotcover target executable option', function() {

            it('should not quote a non-quoted path with no spaces', function() {
                var opts = { target: { executable: "./tools/xunit/xunit.console.exe" }};

                expect(dotcover.getArguments(opts, [])).to.include("/TargetExecutable=./tools/xunit/xunit.console.exe");
            });

            it('should unquote a double quoted path with no spaces', function() {
                var opts = { target: { executable: '"./tools/xunit/xunit.console.exe"' }};

                expect(dotcover.getArguments(opts, [])).to.include("/TargetExecutable=./tools/xunit/xunit.console.exe");
            });

            it('should unquote a single quoted path with no spaces', function() {
                var opts = { target: { executable: "'./tools/xunit/xunit.console.exe'" }};

                expect(dotcover.getArguments(opts, [])).to.include("/TargetExecutable=./tools/xunit/xunit.console.exe");
            });

            it('should not unquote a single quoted with spaces', function() {
                var opts = { target: { executable: "'./tools etc/xunit/xunit.console.exe'" }};

                expect(dotcover.getArguments(opts, [])).to.include('/TargetExecutable="./tools etc/xunit/xunit.console.exe"');
            });
        });

        describe('testing dotcover target working directory option', function() {

            it('should not quote a non-quoted target path with no spaces', function() {
                var opts = { target: { workingDirectory: "./tools/xunit" }};

                expect(dotcover.getArguments(opts, [])).to.include("/TargetWorkingDir=./tools/xunit");
            });

            it('should unquote a double quoted target path with no spaces', function() {
                var opts = { target: { workingDirectory: '"./tools/xunit"' }};

                expect(dotcover.getArguments(opts, [])).to.include("/TargetWorkingDir=./tools/xunit");
            });

            it('should unquote a single quoted target path with no spaces', function() {
                var opts = { target: { workingDirectory: "'./tools/xunit'" }};

                expect(dotcover.getArguments(opts, [])).to.include("/TargetWorkingDir=./tools/xunit");
            });

            it('should not unquote a single quoted path with spaces', function() {
                var opts = { target: { workingDirectory: "'./tools etc/xunit'" }};

                expect(dotcover.getArguments(opts, [])).to.include('/TargetWorkingDir="./tools etc/xunit"');
            });
        });

        describe('testing dotcover target arguments option', function() {

            it('should return empty when there are no assemblies', function() {
                var assemblies = [];

                expect(dotcover.getArguments({}, assemblies)).to.include('/TargetArguments=');
            });

            it('should include a single assembly when there is only one provided', function() {
                var assemblies = [ "bin/debug/some.tests.dll" ];

                expect(dotcover.getArguments({}, assemblies)).to.include('/TargetArguments=bin/debug/some.tests.dll');
            });

            it('should not quote a non-quoted path with no spaces', function() {
                var assemblies = [ "bin/debug/some.tests.dll" ];

                expect(dotcover.getArguments({}, assemblies)).to.include("/TargetArguments=bin/debug/some.tests.dll");
            });

            it('should unquote a double quoted path with no spaces', function() {
                var assemblies = [ '"bin/debug/some.tests.dll"' ];

                expect(dotcover.getArguments({}, assemblies)).to.include("/TargetArguments=bin/debug/some.tests.dll");
            });

            it('should unquote a single quoted path with no spaces', function() {
                var assemblies = [ "'bin/debug/some.tests.dll'" ];

                expect(dotcover.getArguments({}, assemblies)).to.include("/TargetArguments=bin/debug/some.tests.dll");
            });

            it('should not unquote a single quoted path with spaces', function() {
                var assemblies = [ "'bin/debug prod/some.tests.dll'" ];

                expect(dotcover.getArguments({}, assemblies)).to.include('/TargetArguments="bin/debug prod/some.tests.dll"');
            });

        });

    });

}());