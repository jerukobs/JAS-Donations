const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next){
    const {token} = req.headers
   const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!token) {
      return res.sendStatus(401);
    }
    req.headers['verifyToken'] = verifyToken
    // console.log(verifyToken)
    next();
}

module.exports = {authMiddleware}