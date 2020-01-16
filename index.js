// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();

server.listen(4000, () => {
    console.log('\n **** server listening on port 4000 ****')
});

server.use(express.json());

// Making sure server works (It does!) GET request
server.get('/', (req, res) => {
    res.send('Server works!');
})

// -------------------------
// POST
// -------------------------
server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    if (userInfo.length === 0) {
        res.status(400).json({success: false, errorMessage: "Please provide name and bio for the user."});
    } else {
        db.insert(userInfo)
        .then( user => {
            res.status(201).json({success: true, user});
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({errorMessage: "There was an error while saving the user to the database" });
        });
    };
});
    
// ----------------------
// GET request for users
// ------------------------

    server.get('/api/users', (req, res) => {
        db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({success: false, errorMessage: "The users information could not be retrieved." })
        });
    });

    server.get('/api/users/:id', (req, res) => {
        db.findById(req.params.id)
        .then(user =>{
            if (user) {
                res.status(200).json({ success: true, user});
            } else {
                res.status(404).json({ success: false, message: "The user with the specified ID does not exist." });
            }
        })
        .catch( err => {
            res.status(500).json({success: false, errorMessage: "The user information could not be retrieved."})
        });
    });

// ------------------------
// DELETE request
// ------------------------
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
    .then(deleted => {
        if(deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({message: "The user with the specified ID does not exist."})
        }
    })
    .catch( () => {
        res.status(500).json({errorMessage: "The user could not be removed"});
    });
});
