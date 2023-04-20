const path = require('path');
const fs = require('fs');
var uniqid = require('uniqid');

// routing
module.exports = (app) => {

    // GET /api/notes should return db.json file and saved notes.
    app.get('/api/notes', (req, res) => {
      res.sendFile(path.join(__dirname, '../db/db.json'));
    });
  
    // GET /api/notes should return the index.html file.
    // app.post('/api/notes', (req, res) => {
    //   res.sendFile(path.join(__dirname, '../public/index.html'));
    // })

    app.post('/api/notes', (req, res) => {
        const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));
        const newNote = req.body;
        newNote.id = uniqid(); // Assign a unique id to the new note
        notes.push(newNote);
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes));
        res.json(newNote);
      });
    
      // GET /notes should return the index.html file.
      app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
      });
    
  };

  