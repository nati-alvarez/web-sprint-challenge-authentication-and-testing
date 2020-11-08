const router = require('express').Router();
const authModel = require("./auth-model");
const bcrypt = require("bcryptjs");

router.post('/register', async (req, res) => {
  const {username, password} = req.body;
  if(!username || !password) return res.status(400).json({message: "Username and password required"});
  
  try {
    const userExists = await authModel.getByUsername(username);
    if(userExists) return res.status(400).json({message: "Username taken"});

    const user = await authModel.createUser(username, password);
    if(user) return res.status(201).json(user);
  }catch(err){
    console.log(err);
    res.status(500).json({message: "A server error occurred"});
  }
});

router.post('/login', async (req, res) => {
  const {username, password} = req.body;
  if(!username || !password) return res.status(400).json({message: "Username and password required"});

  const user = await authModel.getByUsername(username);
  if(!user) return res.status(401).json({message: "Incorrect username or password"});
  if(!bcrypt.compareSync(password, user.password)) return res.status(401).json({message: "Incorrect username or password"});

  res.status(200).json(user);
});

module.exports = router;
