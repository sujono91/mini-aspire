# Mini Aspire

Mini Aspire App for managing loans by users

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* Install [Node.js](https://nodejs.org/en/)
* Install [Yarn](https://yarnpkg.com/en/) globally using npm

### Installing

* Clone Repository

```
git clone git@github.com:sujono91/mini-aspire.git
```

* Install Dependencies

```
yarn
```

* Runs the mock server in local (optional)

```
yarn json:server
```

**NOTES: YOU NEED TO CHANGE THE `BASE_URL` IN `src/api/index.js` IF YOU WANT TO CHANGE THE API TARGET TO LOCAL**

* Runs the app in the development mode

```
yarn start
```

## Running the tests

```
yarn test
```

## Deployment

* Builds the app for production to the build folder

```
yarn build
```

* [Deployment Link](http://dull-punishment.surge.sh/)

## Built With

* React 16.3.0 (UI Library)
* PropTypes 15.6.1 (Runtime React props type)
* Material UI 1.0.0-beta.40 (Material design for React)
* React Router 4.2.2 (Routing component)
* Prettier 1.11.1 (Code Formatter)
* JSON Server 0.12.1 (Mock Server for REST API)

## Authors

* **Sujono** - [@sujono91](https://github.com/sujono91)
