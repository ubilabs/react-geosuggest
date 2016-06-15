# Contribution Guidelines

First off, thanks for contributing to this project :tada: :thumbsup:  
Our communications here on GitHub follow certain guidelines. Please observe the points below.

## Issue Tracker

- before submitting a new issue, please:

    - check for existing related issues

    - check the issue tracker for a specific upstream project that may be more appropriate

    - check against supported versions of this project (i.e. the latest)

- please keep discussions on-topic, and respect the opinions of others

- please contact us privately to discuss security vulnerabilities


## Pull Requests / Merge Requests

- **IMPORTANT**: by submitting a patch, you agree to allow the project owners to license your work under this [LICENSE](LICENSE)

- please provide test cases for all features and bug fixes

- provide documentation for all public API methods

- commit messages should follow the format outlined in [CONVENTIONS.md](CONVENTIONS.md)

### Code Style and Code Quality

- JavaScript

   - [ESLint](http://eslint.org/) configuration files are provided

   - run `npm run lint` to check code style

- CSS

    - CSS code follows [BEM](http://getbem.com/naming/) style

- run `npm run test` before submitting a PR to ensure that your code uses correct style and passes all tests

### Development

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.

### Deployment

To release & deploy, run the following:

```
npm run release:patch|minor|major
```
