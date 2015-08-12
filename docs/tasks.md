[Documentation](https://github.com/gulpjs/gulp/blob/master/docs/README.md)

## Default command

```sh
$ gulp
```

Build and optimize the current project, ready for deployment.
This includes linting as well as image, script, stylesheet and HTML optimization and minification.


## Main commands

Task    | Description
--------|-------------------------------------------------------------------------
serve     | Launch a web server with live reload and open app in browser.
serve:dist | Launch a web server using dist files with live reload and open app in browser.
build | Build and optimize the current project, ready for deployment. This includes linting as well as image, script, stylesheet and HTML optimization and minification.
clean | Delete temporary files and dist files.

## Tests

Task    | Description
--------|--------------------------------------------------------------------------
test     | Launch unit tests using karma and jasmine.
test:auto  | Launch karma server and launch unit tests after each change in project files.
protractor | Launch e2e tests using protractor.
protractor:src | Launch e2e tests using protractor (dev).
protractor:dist | Launch e2e tests using protractor (dist).
webdriver-update | Download/Update selenium standalone and chromedriver.
webdriver-standalone | Launch a standalone selenium server.

## Translations

Task    | Description
--------|---------------------------------------------------------------------------
translations     | Generate translations file in .tmp that will be used by server.
translations:extract | Extract Messages from Code and Templates to template.pot.

## Typescript

Task    | Description
--------|---------------------------------------------------------------------------
typescript     | Convert all *.ts found in project to js in the temporary folder.
tsd:install | Get all ts definitions from an external url.
tsd:purge | Delete definition files.

## Html / Jade

Task    | Description
--------|---------------------------------------------------------------------------
html     | Convert all .ts found in project to a .js in the temporary folder.
jade | Convert all .jade found in project to html in the temporary folder.
partials | Put all .html found in project folder + in temporary folder in a template cache file.

## Assets

Task    | Description
--------|---------------------------------------------------------------------------
styles  | Generate main css file using main less file.
fonts   | Copy project fonts in dist folder.
images  | Compress images (using imagemin) then copy them in dist folder.
other   | Copy other specified files in dist folder.

## Documentation

Task    | Description
--------|---------------------------------------------------------------------------
docs     | Generate jsdoc documentation from sources.