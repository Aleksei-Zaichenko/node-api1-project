const express = require('express');
const shortid = require('short-id');

const server = express();

server.use(express.json());

let users = [
    {
        id: "a_unique_id", // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
    }
]
  
server.get('/api/users', (req, res) => {
    if(users){
        res.status(201).json(users);
    } else {
        res.status(500).json({
            errorMessage: "The users information could not be retrieved."
        });
    }
});
    
server.get('/api/users/:id', (req, res) => {
  if(users){
    
    const id = req.params.id;

    const foundUser = users.find(user => user.id == id)

    if (foundUser) {
      res.status(200).json(foundUser);
    } else {
      res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
  } else {
    res.status(500).json({
        errorMessage: "The users information could not be retrieved."
    });
  }
});
  
  server.post('/api/users', (req, res) => {
    if(req.body.name && req.body.bio){
      const newUser = {id: shortid.generate(), ...req.body }
      if(newUser){
        users.push(newUser);
        res.status(201).json(newUser);
      } else {
        res.status(500).json({errorMessage: "There was an error while saving the user to the database"});
      }
    } else {
        res.status(400).json({
            errorMessage:"Please provide name and bio for the user."
        });
    }
  });
 
  server.delete('api/users/:id', (req, res) => {
    const foundUser = users.find(user=> user.id == req.params.id)
    if (foundUser) {
      const newUsersList = users.filter(user => user.id != req.params.id);
      users = newUsersList;

      if(newUsersList.length === users.length){
        res.status(200).json({message:"The user was deleted successfully"})
      } else {
        res.status(500).json({ errorMessage: "The user could not be removed" });
      }

    } else {
      res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
  });
    
  //   router.put('/:id', (req, res) => {
      
  //     const changes = req.body;
  
  //     if(!changes.text && !changes.contents){
  //       res.status(400).json({errorMessage: "Please provide title and contents for the post."})
  //     } else {
  //       PostsDataBase.update(req.params.id, changes)
  //       .then(hub => {
  //         if (hub) {  
  //           PostsDataBase.findById(req.params.id)
  //           .then(hub =>{
  //             res.status(200).json(hub);
  //           })
  //           .catch(err =>{
  //             res.status(500).json({errorMessage: "error reading the updated  "})
  //           })
  //         } else {
  //           res.status(404).json({ message: "The post with the specified ID does not exist." });
  //         }
  //       })
  //       .catch(error => {
  //         // log error to database
  //         console.log(error);
  //         res.status(500).json({
  //           error: "The post information could not be modified."
  //         });
  //       });
  //     }
      
  //   });

server.listen(5000, () => console.log('API running on port 5000'));