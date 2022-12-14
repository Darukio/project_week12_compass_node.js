# Project for week 8 in Node.js Compass course
## Getting started
This repository contains a project for the Node.js course in Compass, which project will run on **Node.js** using **MongoDB** as database.

## Features
- Basic Authentication (**Signup**/**Login** with hashed password and a token).
- Event model with **CRUD** operations.
- Error handling and validations.

## Requirements
- Node
- Git
- Postman
- MongoDB Compass

## Setup via Git
Clone the repo and install the dependencies.
```
git clone https://github.com/Darukio/project_week8_compass_node.js.git
cd project_week8
npm install
```

## Steps for execute the app
### Database Connection
Open the MongoDB Compass app and create a new connection.

In the URL field paste the following string: ``mongodb+srv://Paulo:0dWhRZMZgeYO848h@cluster0.dtrwe1o.mongodb.net/test``

### Executing server.js
Open the project in Visual Studio Code, open a new terminal and writes ``npm start`` to run the API

### Routes
- Base route: api/v1

#### POST
- User signup: /users/signup
- User signin: /users/login
- Create event: /events

#### GET
- Get all events: /events
- Get event by id: /events/event/{id}
- Get events by weekday: /events/{dayOfTheWeek}

#### PATCH
- Update event by id: /events/event/{id}

#### DELETE
- Delete event by id: /events/event/{id}
- Delete events from weekday: /events/event/{dayOfTheWeekday}

## Project structure
<pre>
.
├───.env
├───.eslintrc.json
├───.gitignore
├───app.js
├───package-lock.json
├───package.json
├───server.js
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
└───utils
    ├───appError.js
    └───catchAsync.js
</pre>
