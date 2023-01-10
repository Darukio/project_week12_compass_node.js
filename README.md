# Project for week 12 in Node.js Compass course
## Getting started
This repository contains a project for the Node.js course in Compass, which project will run on **Node.js** using **MongoDB** as database.

## Features
- Basic Authentication (**Signup**/**Login** with hashed password and a token).
- Event model with **CRUD** operations.
- Error handling and validations.
- Test cases with Jest and supertest.
- Linting with Eslint.

## Requirements
- Node
- Git
- Postman

## Setup via Git
Clone the repo and install the dependencies.
```
git clone https://github.com/Darukio/project_week8_compass_node.js.git
cd project_week12
npm install
```

## Steps for execute the app locally
### Executing server.js
Open the project in Visual Studio Code, open a new terminal and writes ``npm start`` to run the API.

### Executing tests
Writes ``npm test`` in a terminal to run the tests.

## Routes
- Base route: /api/v1

### POST
- User signup: /users/signup
- User signin: /users/login
- Create event: /events

### GET
- Get all events: /events
- Get event by id: /events/{id}
- Get events by weekday: /events/{dayOfTheWeek}?weekdayParameter=true

### PATCH
- Update event by id: /events/{id}

### DELETE
- Delete event by id: /events/{id}
- Delete events from weekday: /events/{dayOfTheWeekday}?weekdayParameter=true

## Deploy
The deployment was made in Vercel, you can access it with the following link: https://project-week12-compass-node-1q82l31mh-darukio.vercel.app/.
(Make sure you use the correct path, with some route listed above).

## Testing routes with Postman
You can create two environments, one destined to Dev and another to Prod. In both environments, you'll create a variable called "URL" that will hold the URL you'll access during the request. In Dev you'll have your localhost, and in Prod the deployed app URL. First, you'll need to login, if you don't have a user, make a signup request with your first name, last name, birthdate, city, country, email, password and a password confirm. Then, you have to create a variable "Token" and paste there the token given in login. Later, create a new request for the Events route, for example GET (get all events), and copy in the path field: {{URL}}api/v1/events/; also, in the Auth area, choose "Bearer Token" type and write the {{Token}} variable in the text field. Now, you can do a request with an authorized user.

## Project structure
<pre>
.
├───.eslintrc.json
├───.gitignore
├───app.js
├───package-lock.json
├───package.json
├───server.js
├───vercel.json
│
├───controllers
│   ├───authController.js
│   └───eventController.js
│
├───models
│   ├───eventModel.js
│   └───userModel.js
│
├───routes
│   ├───eventRoutes.js
│   └───userRoutes.js
│
├───tests
│   ├───db.js
│   ├───event.test.js
│   └───user.test.js
│
└───utils
    ├───appError.js
    └───catchAsync.js
</pre>
