const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // pour obtenir le token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // verfier l'authenticité du token
    const userId = decodedToken.userId; // avoir l'id qui se trouve dans le token
    if (req.body.userId && req.body.userId !== userId /* vérification de l'id */) {
      throw 'Invalid user ID';
    } else {
      next(); // effectue la requête à venir 
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};