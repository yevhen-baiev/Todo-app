# To-Do App
A single-page application that allows users to create and manage a list of tasks.

# [Demo](https://yevhen-baiev.github.io/Todo-app/)

# Technologies used
- React.js
- TypeScript
- JavaScript
- Fetch, REST API
- Sass (SCSS)
- Bulma

# Structure
App is built using functional components and React Context.
CSS framework Bulma is used to style the app along with custom SCSS.

# Features & Functionality

## ToDos
- User can create a new todo
- User can delete a todo
- User can edit a todo
- User can mark a todo as completed
- User can mark all ToDos as completed
- User can delete all completed ToDos
- All changes are saved in the server
- `Wait` function was used to simulate server requests to demonstrate the loader.
- User can filter ToDos by all, active and completed. Filter is saved in URL
- User can see the number of active ToDos
- In case of server error, user is notified

# How to run project locally
- Fork and clone this repository
- Run `npm install` to install all dependencies
- Run `npm start` to start the app
- Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

# Dependencies
- Node.version: `v20.17.0` or higher

# Reflections
One of the main goals of this project was to learn how to build a single-page application.
Another challenge was to learn and understand how to work with REST API, different fetch requests such as GET, POST, PATCH and DELETE and errors handling.
