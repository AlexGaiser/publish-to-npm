# publish-to-npm

## Description

This is a step-by-step guide for how to publish your first package to NPM.
THe NPM registry is an amazing tool, and every Javascript developer should learn to use it for both their personal and professional projects.

For the sake of this guide I am assuming you already have `npm` (at least version 6) and `node` (at least version 14) installed on your computer. If you do not, please see [this guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) for more informaion on how to install `node` and `npm` onto your environment. 

Note: while this guide should be platform agnostic, it was written and tested using an Apple Computer running MacOS. If you have an issue with this guide on another platform, please create an issue [here](https://github.com/AlexGaiser/publish-to-npm/issues) and I will make sure to add the necessary information.

If you have any questions or would like more information on this guide, please create an issue [here](https://github.com/AlexGaiser/publish-to-npm/issues) or feel free to message me on [LinkedIn](https://www.linkedin.com/in/alexander-gaiser/)


## Guide

### Setting up our project

First things first we need to set up our project so that we have something to publish. The specifics of how you set up the project are not important except for the following:

1. You will need a package.json (more details on how this will be set up will be provided below, for now a basic package.json is all that is necessary)
2. You will need a directory (`lib/` in this example) at the root of your project where all business logic related to the application will be stored
3. You will need an output directory (`dist/` in this example) at the root of your project for all your compiled files (the need for this directory will be clear later)
4. Everything you do not wish to publish to needs to stay outside of your `lib/` and `dist/` folders. This includes all of your config files, git files, ReadMe and package.json.

This repository is set up to serve as a template for the project structure I have found most convenient.

### Setting up an NPM account

Next we will need to create an account and set up our environment so that we can publish to NPM

1. Go to [this page](https://docs.npmjs.com/creating-a-new-npm-user-account) and follow the instructions for creating an account
2. Make a note of your password because you will need to log in through your command line
3. Through NPM's website you can see all of your packages and create/manage [organizations](https://docs.npmjs.com/organizations) which allow you to namespace your packages.
4. After you have set up your project open the terminal at your project's root and log in using the command `npm login`. You will need to enter your username, password, and the email you used to create the account.
5. Enter `npm whoami` into the terminal to verify that you have successfully logged in.


### Setting up our package.json

There are several properties of our `package.json` that we will need to configure in order to be ready to publish our package.

1. [`name`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#name): this is the name that will be used when we publish our project. It needs to be **unique** in the npm registry. If you have set up an organization, the convention for naming your package is `@organization/package-name`.
2. [`version`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#version): Set this to `0.0.1` to start. As you publish versions you will need to increment this each time. You cannot publish the same version twice. 
3. [`main`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#main): this is the main entry point for your source code. We will point it to `dist/cjs.js` because this is the entry point we will use when the `require` keyword for our project is used and we have compiled this version to use CommonJS.
4. [`browser`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#browser): this is the entry point used when the package is loaded into the browser. In our example it should point to `dist/index.js`.
5. `types`: If you have followed this guide and set up your project as a `Typescript` project, you will need to point to the source of your type definitions so that JS and TS environments can read them. In our example it will point to `dist/index.d.ts`.
6. [`files`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#files) These are all the files that will be included when your project is installed as a dependency. In our case we want to include `dist/`, because we have compiled all our logic to this directory. This field is important because it reduces bundle size end helps ensure that no sensitive information is published to the npm registry.
7. `scripts`: (Optional) if you do not want to run testing, building or publishing manually, you can create a publish script that will run all of your publishing workflow at once. I personally use the script `"publish:prod": "npm run test && npm run ci:lint && npm run build && npm publish --access public" ` for projects with simple publishing workflows.




