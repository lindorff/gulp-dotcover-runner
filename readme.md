# gulp-dotcover-runner
*gulp runner for JetBrains' dotCover.  Work in progress, but does work...*


## Installation

```bat
npm install --save-dev gulp-dotcover-runner
```

## Usage

```javascript
var gulp = require('gulp'),
    dotcover = require('gulp-dotcover-runner');

gulp.task('test', function () {
  return gulp.src(['**/*.Test.dll'], {read: false})
    .pipe(dotcover({
      executable: "./tools/dotCover/dotCover.exe",
      teamcity: true,
      target: {
        executable: "./tools/xunit/xunit.console.exe",
        workingDirectory: ".",
        output: "coverage.xml"
      }
    }));
});
```

## To Do

* [ ] Tests!
* [ ] Support additional dotCover options
  * [x] `TargetExecutable`
  * [x] `TargetArguments`
  * [x] `TargetWorkingDir`
  * [x] `Output`
  * [ ] `TempDir`
  * [ ] `InheritConsole` - not sure if we will expose this at all
  * [ ] `AnalyseTargetArguments`
  * [ ] `Scope`
  * [ ] `Filters`
  * [ ] `AttributeFilters`
  * [ ] `DisableDefaultFilters`
  * [ ] `SymbolSearchPaths`
  * [ ] `AllowSymbolServerAccess`
  * [ ] `ReturnTargetExitCode`
  * [ ] `ProcessFilters`
  * [ ] `LogFile`
* [ ] Support target arguments (currently just sending the assembly list)
* [ ] Improve this readme
