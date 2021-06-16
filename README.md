# publish-to-npm

## Description

This is a step-by-step guide for how to publish your first package to NPM.
The NPM registry is an amazing tool, and every Javascript developer should learn to use it for both their personal and professional projects.

For the sake of this guide I am assuming you already have `npm` (at least version 6) and `node` (at least version 14) installed on your computer. If you do not, please see [this guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) for more informaion on how to install `node` and `npm` onto your environment. 

Note: while this guide should be platform agnostic, it was written and tested using an Apple Computer running MacOS. If you have an issue with this guide on another platform, please create an issue [here](https://github.com/AlexGaiser/publish-to-npm/issues) and I will make sure to add the necessary information.

If you have any questions or would like more information on this guide, please create an issue [here](https://github.com/AlexGaiser/publish-to-npm/issues) or feel free to message me on [LinkedIn](https://www.linkedin.com/in/alexander-gaiser/)


## Guide

### Setting up our project

First things first we need to set up our project so that we have something to publish. The specifics of how you set up the project are not important except for the following:

1. You will need a package.json (more details on how this will be set up will be provided below, for now a basic package.json is all that is necessary)
2. You will need a directory (`lib/` in this example) at the root of your project where all business logic related to the application will be stored
3. You will need an output directory (`dist/` in this example) at the root of your project for all your compiled files (the need for this directory will be clear later)
4. Everything you do not wish to publish to needs to stay outside of your `lib/` and `dist/` folders. This includes all of your config files, git files, ReadMe and package.json
5. You will need to install rollup to bundle our project before publishing

After setting up our project, here is the list of dependencies we will be using:
```
  "devDependencies": {
    "@babel/core": "^7.14.5",
    "@babel/preset-env": "^7.14.5",
    "@types/jest": "^26.0.23",
    "@types/node": "^15.12.2",
    "@types/yargs": "^17.0.0",
    "@typescript-eslint/eslint-plugin": "^4.27.0",
    "@typescript-eslint/parser": "^4.27.0",
    "eslint": "^7.28.0",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-jest": "^24.3.6",
    "eslint-plugin-prettier": "^3.4.0",
    "eslint-plugin-react": "^7.24.0",
    "jest": "^27.0.4",
    "prettier": "^2.3.1",
    "rollup": "^2.51.2",
    "rollup-plugin-babel": "^4.4.0",
    "rollup-plugin-commonjs": "^10.1.0",
    "rollup-plugin-node-resolve": "^5.2.0",
    "rollup-plugin-terser": "^7.0.2",
    "rollup-plugin-typescript2": "^0.30.0",
    "ts-jest": "^27.0.3",
    "typescript": "^4.3.2"
  }
```
At minimum you will need is rollup and its related plugins.

This repository is set up to serve as a template for the project structure I have found most convenient. Simply clone it and you will have a basic Typescript project set up and ready to use. All business logic is contained inside the `lib/` directory and `lib/index.ts` is the application's entry point.

### Setting up Rollup.js

Rollup is what we will be using to bundle this application. Babel is a good alternative to Rollup, but Rollup is simpler and works well with Typescript so that is what we will be using for our demo.

Since we have installed the necessary dependencies, we can move on to setting up the config file:
1. Create a file called `rollup.config.js`
2. Add the following to your `rollup.config.js` file

```javascript
//rollup plugins for using commonjs and typescript
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'lib/index.ts', // the typescript entry point of our application 
  output: [
    {
      file: 'dist/cjs.js',// compiling our project to use commonjs for node environments
      format: 'cjs',
      exports: 'named',
    },
    {
      file: 'dist/index.js', // compiling our project to es modules for use in the browser
      format: 'es',
      exports: 'named',
    },
  ],
  plugins: [resolve(), commonjs(), typescript()], // invoking our plugins
};
```
3. Add a build script to your package.json scripts `"build": "rollup -c"`
4. Run `npm run build` at root
5. Check our newly created `dist/` folder and confirm we have all the necessary files including an `index.d.ts` `cjs.js` and `index.js` file.

### Setting up our package.json

There are several properties of our `package.json` that we will need to configure in order to be ready to publish our package.

1. [`name`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#name): this is the name that will be used when we publish our project. It needs to be **unique** in the npm registry. If you have set up an organization, the convention for naming your package is `@organization/package-name`.
2. [`version`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#version): Set this to `0.0.1` to start. As you publish versions you will need to increment this each time. You cannot publish the same version twice. 
3. [`main`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#main): this is the main entry point for your source code. We will point it to `dist/cjs.js` because this is the entry point we will use when the `require` keyword for our project is used and we have compiled this version to use CommonJS.
4. [`browser`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#browser): this is the entry point used when the package is loaded into the browser. In our example it should point to `dist/index.js`.
5. `types`: If you have followed this guide and set up your project as a `Typescript` project, you will need to point to the source of your type definitions so that JS and TS environments can read them. In our example it will point to `dist/index.d.ts`.
6. [`files`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#files) These are all the files that will be included when your project is installed as a dependency. In our case we want to include `dist/`, because we have compiled all our logic to this directory. This field is important because it reduces bundle size end helps ensure that no sensitive information is published to the npm registry.
7. `scripts`: (Optional) if you do not want to run testing, building or publishing manually, you can create a publish script that will run all of your publishing workflow at once. I personally use the script `"publish:prod": "npm run test && npm run ci:lint && npm run build && npm publish --access public" ` for projects with simple publishing workflows.

### Testing our package locally

Before we publish a package to npm, we can test installing and using it locally. 

1. To prepare your project to be installed from a local directory navigate to your project's root
2. Run `npm pack`. This will create a tar file identical to the one that will be deployed to npm when you publish. 
3. Create a new browser or Node project in a separate directory
4. run `npm install <path/to/mypackage.tgz>` (for example `npm install ../../alexgaiser-publish-npm-tutorial-0.0.4.tgz`)
5. You should see something like the following in your package.json
```
  "dependencies": {
    "@alexgaiser/publish-npm-tutorial": "file:../../publish-to-npm"
  }
```
4. This method will let you test your package as if you had published to npm and installed from there. Thus it is a great way to quickly and safely test your package before publishing it.
5. In your project import your package just like you would any other package.
6. If you used this tutorial you should be able to import the `sayHello()` method and run it. 
7. Because we compiled from Typescript, you should also be able to see type information related to the method. You can check this by confirming an `index.d.ts` file is included in the installed package.

### Setting up an NPM account

Next we will need to create an account and set up our environment so that we can publish to NPM

1. Go to [this page](https://docs.npmjs.com/creating-a-new-npm-user-account) and follow the instructions for creating an account
2. Make a note of your password because you will need to log in through your command line
3. Through NPM's website you can see all of your packages and create/manage [organizations](https://docs.npmjs.com/organizations) which allow you to namespace your packages.
4. After you have set up your project open the terminal at your project's root and log in using the command `npm login`. You will need to enter your username, password, and the email you used to create the account.
5. Enter `npm whoami` into the terminal to verify that you have successfully logged in.

### Publishing to NPM

After you have built your project, compiled your code, tested it, and set up your npm account, it is time to publish your package. The truth is, once you have an npm account, you can publish basically anything you like. The above steps are just to make sure you have a project that can run in every environment and will not include any sensitive or unnecessary files in your package.

To publish your npm project, all you need to do is:
1. Build your project: `npm run build`
2. Increment your package.json version `npm version patch` (or minor, or major)
3. Then publish it:
```bash
npm publish --access public
```

Then you should see a message stating that you have successfully published your project to npm!
You can go to your acccount and see the project under your profile and you can now install it like you would any other package!


