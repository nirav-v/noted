const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const app = express();
const notesArray = require('../db/db.json')
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// reading and parsing contents of notes data from db.json 
notes.get('/', (req, res) => {
     readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

// GET Route for a specific note by id parameter
notes.get('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

notes.delete('/:id', (req, res) => {
    console.log(req.params)
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = notesArray.filter((note) => note.id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});

// post method to add note in req.body to the notes array in db.json
notes.post('/', (req, res) => {
    console.log(req.body)
     const { title, text } = req.body;

  // If all the required properties are present
  if (req.body) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');

    res.json(`note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
})

module.exports = notes;

