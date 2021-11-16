// Require/import the Express module
const { request, response } = require('express');
const express = require('express');

//Create a web server
const webServer = express();

// Serve all content in the frontend folder
webServer.use(express.static('frontend'));

//Start the web server on a specific port
// and write to the console that it is up and running
webServer.listen(3000, function () {
  console.log('Listening on port 3000');
});

// read json from the data.json file
let persons = require('./persons.json');

//Create a route/url that serves the persons data
webServer.get('/persons', (request, response) => {
  response.json(persons);
});

// Create a route/url that servers the data for ONE person
// based on whitch id we send to the route
webServer.get('/persons/:id', (request, response) => {
  // A request parameter can be read like this
  // (note that the plus sign convert from string to number)
  let id = +request.params.id;
  //Search for a person in the persons array that
  //has an id identical to the id we read from the request
  let person = persons.find(person => id === person.id);
  // Return the person data as json
  response.json(person || null);
});

// Create a route/url that servers the data for persons 
// whosr name matches the search parameter

webServer.get('/persons/namesearch/:search', (request, response) => {
  // A request parameter can be read like this
  // (note that the plus sign convert from string to number)
  // (Note that we convert to lower case)
  let search = request.params.search.toLowerCase();
  //Search for a person in the persons array that
  //has an id identical to the id we read from the request
  let foundPersons = persons.filter(person =>
    (person.firstName + person.lastName).toLowerCase().includes(search)
  );
  // Return the person data as json
  // (only return the first 25 hits if more than 25 persons found)
  response.json(foundPersons.slice(0, 25));
});