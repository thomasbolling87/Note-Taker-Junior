// Needed dependencies
const express = require('express');
const fs = require('fs');

// Enabling Express 
const app = express();
let PORT = process.env.PORT || 3000;

// Connecting express to the public folder
app.use(express.static('./public'));

// Data parsing setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// This will load the app starting with the index.html page first
app.get('/', (req, res) => {
  res.sendFile('public/index.html', { root: __dirname })
});

// Loads the notes.html page
app.get('/notes', (req, res) => {
  res.sendFile('public/notes.html', { root: __dirname })
});

// Creating the GET route for the notes
app.get('/api/notes', (req, res) => {
  let dataInput = JSON.parse(fs.readFileSync('./db/db.json'));
  res.json(dataInput);
});

// Creating the note POST route
app.post('/api/notes', (req, res) => {
  let newNote = req.body;
  let dataInput = JSON.parse(fs.readFileSync('./db/db.json'));
  
  // This list turns the parsed data into a string that will be added to the id so that it is clickable
  let list = (dataInput.length).toString();

  // Adds the notes to the list as a string via an array
  newNote.id = list;
  dataInput.push(newNote);
  fs.writeFileSync (
    './db/db.json', JSON.stringify(dataInput));
    console.log(`A new note has been added: ${newNote.title}`)
  res.status(300).json(dataInput);
});

// This will allow the user to DELETE a note
app.delete('/api/notes/:id', (req, res) => {

  // This delete varaiable will select the ids of the lis value to delete them
  let deletedNote = req.params.id;
  let removedNote = JSON.parse(fs.readFileSync('./db/db.json'));

  // Splice does the opposite of push and will remove a value instead of adding to it
  removedNote.splice(deletedNote.id, 1);
  const cutNote = fs.writeFileSync (
    './db/db.json', JSON.stringify(removedNote));
    console.log(`A note has been deleted with the id: ${req.params.id}`)
  res.status(300).json()
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});



