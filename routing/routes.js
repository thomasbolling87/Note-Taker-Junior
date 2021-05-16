// Needed dependencies
const fs = require('fs');
const path = require('path');

module.exports = app => {

    fs.readFile('db/db.json','utf8', (err,data) => {
      if (err) throw err;
      var notes = JSON.parse(data);
      
      app.get('/api/notes', function (req,res) {
        res.json(notes);
      });

      app.post('/api/notes', function(req,res) {
          let freshNote = req.body;
          notes.push(freshNote);
          updateDb();
          return console.log(`Added a new note: ${freshNote.title}`);
      });

      app.get('/api/notes/:id', function(req,res) {
          res.json(notes[req.params.id]);
      });

      app.delete('/api/notes/:id', function(req,res) {
          notes.splice(req.params.id, 1);
          updateDb();
          console.log(`Delete notews with id ${req.params.id}`);
      });

      app.get('*', function(req,res) {
          res.sendFile(path.join(__dirname, '../public/index.html'));
      });

      app.get('/notes', function(req,res) {
          res.sendFile(path.join(__dirname, '../public/notes.html'))
      })

      function updateDb() {
          fs.writeFile('db/db.json', JSON.stringify(notes), err => {
              if (err) throw err;
              return true;
          });
      }
    });
};