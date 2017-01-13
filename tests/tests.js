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

        describe('testing dotcover target output option', function() {

            it('should not quote a non-quoted target path with no spaces', function() {
                var opts = { target: { output: "./build/coverage.xml" }};

                expect(dotcover.getArguments(opts, [])).to.include("/output=./build/coverage.xml");
            });

            it('should unquote a double quoted target path with no spaces', function() {
                var opts = { target: { output: '"./build/coverage.xml"' }};

                expect(dotcover.getArguments(opts, [])).to.include("/output=./build/coverage.xml");
            });

            it('should unquote a single quoted target path with no spaces', function() {
                var opts = { target: { output: "'./build/coverage.xml'" }};

                expect(dotcover.getArguments(opts, [])).to.include("/output=./build/coverage.xml");
            });

            it('should not unquote a single quoted path with spaces', function() {
                var opts = { target: { output: "'./build etc/coverage.xml'" }};

                expect(dotcover.getArguments(opts, [])).to.include('/output="./build etc/coverage.xml"');
            });
        });

        describe('testing dotcover target arguments assemblies', function() {

            it('should return empty when there are no assemblies', function() {
                var assemblies = [];

                expect(dotcover.getTargetArguments({}, assemblies)).to.equal('');
            });

            it('should include a single assembly when there is only one provided', function() {
                var assemblies = [ "bin/debug/some.tests.dll" ];

                expect(dotcover.getTargetArguments({}, assemblies)).to.equal('bin/debug/some.tests.dll');
            });

            it('should not quote a non-quoted path with no spaces', function() {
                var assemblies = [ "bin/debug/some.tests.dll" ];

                expect(dotcover.getTargetArguments({}, assemblies)).to.equal("bin/debug/some.tests.dll");
            });

            it('should unquote a double quoted path with no spaces', function() {
                var assemblies = [ '"bin/debug/some.tests.dll"' ];

                expect(dotcover.getTargetArguments({}, assemblies)).to.equal("bin/debug/some.tests.dll");
            });

            it('should unquote a single quoted path with no spaces', function() {
                var assemblies = [ "'bin/debug/some.tests.dll'" ];

                expect(dotcover.getTargetArguments({}, assemblies)).to.equal("bin/debug/some.tests.dll");
            });

            it('should not unquote a single quoted path with spaces', function() {
                var assemblies = [ "'bin/debug prod/some.tests.dll'" ];

                expect(dotcover.getTargetArguments({}, assemblies)).to.equal('"bin/debug prod/some.tests.dll"');
            });

        });

        describe('testing dotcover target arguments option', function() {

            var target = { arguments: { nologo: true, output: "tests.xml" } };

            it('should return empty when there are no assemblies', function() {
                var assemblies = [];

                expect(dotcover.getTargetArguments(target, assemblies)).to.equal('-nologo -output=tests.xml');
            });

            it('should include a single assembly when there is only one provided', function() {
                var assemblies = [ "bin/debug/some.tests.dll" ];

                expect(dotcover.getTargetArguments(target, assemblies)).to.equal('bin/debug/some.tests.dll -nologo -output=tests.xml');
            });

            it('should not quote a non-quoted path with no spaces', function() {
                var assemblies = [ "bin/debug/some.tests.dll" ];

                expect(dotcover.getTargetArguments(target, assemblies)).to.equal("bin/debug/some.tests.dll -nologo -output=tests.xml");
            });

            it('should unquote a double quoted path with no spaces', function() {
                var assemblies = [ '"bin/debug/some.tests.dll"' ];

                expect(dotcover.getTargetArguments(target, assemblies)).to.equal("bin/debug/some.tests.dll -nologo -output=tests.xml");
            });

            it('should unquote a single quoted path with no spaces', function() {
                var assemblies = [ "'bin/debug/some.tests.dll'" ];

                expect(dotcover.getTargetArguments(target, assemblies)).to.equal("bin/debug/some.tests.dll -nologo -output=tests.xml");
            });

            it('should not unquote a single quoted path with spaces', function() {
                var assemblies = [ "'bin/debug prod/some.tests.dll'" ];

                expect(dotcover.getTargetArguments(target, assemblies)).to.equal('"bin/debug prod/some.tests.dll" -nologo -output=tests.xml');
            });

        });

        describe('testing dotcover attribute filters option', function() {

            var opts = {};

            it('should not include any filters if none are specified', function() {

                expect(dotcover.getArguments(opts, []).join(" "))
                    .to.not.include('/AttributeFilters');
            });

            it('should not include any filters if an empty array is specified', function() {

                opts.attributeFilters = [];

                expect(dotcover.getArguments(opts, []).join(" "))
                    .to.not.include('/AttributeFilters');
            });

            it('should include the filter', function() {

                opts.attributeFilters = [
                    "System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute"
                ];

                expect(dotcover.getArguments(opts, []))
                    .to.include('/AttributeFilters=System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute');
            });

            it('should include multiple filters', function() {

                opts.attributeFilters = [
                    "System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute",
                    "Lindorff.Testing.ExcludeFromCodeCoverageAttribute"
                ];

                expect(dotcover.getArguments(opts, []))
                    .to.include('/AttributeFilters=System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute;Lindorff.Testing.ExcludeFromCodeCoverageAttribute');
            });

        });

        describe('testing dotcover filters options', function() {

            it('should not include any filters if neither are specified', function() {

                expect(dotcover.getArguments({}, []).join(" "))
                    .to.not.include('/Filters');
            });

            it('should include the include filter', function() {
                var opts = { includeFilter: "module=*;type=*;function=*;" };

                expect(dotcover.getArguments(opts, []))
                    .to.include("/Filters=+:module=*;type=*;function=*;");
            });

            it('should include the exclude filter', function() {
                var opts = { excludeFilter: "module=*;type=*;function=*;" };

                expect(dotcover.getArguments(opts, []))
                    .to.include("/Filters=-:module=*;type=*;function=*;");
            });

            it('should include both filters', function() {
                var opts = {
                    includeFilter: "module=*;",
                    excludeFilter: "function=*;"
                };

                expect(dotcover.getArguments(opts, []))
                    .to.include("/Filters=+:module=*;-:function=*;");
            });

        });

    });

}());
