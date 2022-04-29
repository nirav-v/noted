const express = require('express');
const path = require('path');
const fs = require('fs')
// all routes in notes.js stored in variable api
const api = require('./routes/notes.js');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('./helpers/fsUtils');

const notesArray = require('./db/db.json');
const { fstat } = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// all route paths in notes.js will start with /notes
app.use('/api/notes', api);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
