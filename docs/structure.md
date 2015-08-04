# Project Structure

    gulp/                   individual gulp tasks
    sources/                project source code
    |- fonts/               project fonts
    |- images/              project images
    |- libraries/           bower libraries
    |- main/                global style, js and css entry point
    |- modules/             project components and modules, organized by features
    |  |- helpers/          helper services
    |  |- screens/          application screens
    |  |- shell/            application shell
    |  |- ui-components/    shared UI components
    |  |- web-services/     project web services
    |  +- ...               additional project modules
    |- translations/        translations files
    e2e/                    tests end-to-end
    dist/                   compiled version (www for mobile)