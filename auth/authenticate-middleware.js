const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if(!token) return res.status(401).json({ you: 'shall not pass!' });

  try{
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  }
  catch(err){
    console.log(err);
    res.status(401).json({you: "shall not pass!"});
  }
};
