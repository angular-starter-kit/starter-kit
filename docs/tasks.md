## Default command

```sh
$ gulp
```


Build and optimize the current project, ready for deployment.
This includes linting as well as image, script, stylesheet and HTML optimization and minification.


## Main commands

Task    | Description
--------|-------------------------------------------------------------------------
serve     | launch a web server with live reload and open app in browser.
serve:dist | launch a web server using dist files with live reload and open app in browser.
build | Build and optimize the current project, ready for deployment. This includes linting as well as image, script, stylesheet and HTML optimization and minification.
clean | delete temporary files

## Tests

Task    | Description
--------|--------------------------------------------------------------------------
test     | launch unit tests using karma and jasmine.
protractor | launch e2e tests using protractor.

## Translations

Task    | Description
--------|---------------------------------------------------------------------------
translations     | Generate translations file in .tmp that will be used by server.
translations:extract | Extracting Messages from Code and Templates.

## Typescript

Task    | Description
--------|---------------------------------------------------------------------------
typescript     | Convert all *.ts from project to a .js in .tmp folder.
tsd:install | Get all ts definitions from an external url

