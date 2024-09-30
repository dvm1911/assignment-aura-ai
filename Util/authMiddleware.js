const jwt = require('jsonwebtoken');

const tokenSecretKey = "dd2fe518-149d-4e1e-823a-673335131ce5";

function authenticateToken( req, res, next) {

    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
      
    jwt.verify(token, tokenSecretKey, (err, user) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = user;
    next();    
    })
}

module.exports = { authenticateToken };