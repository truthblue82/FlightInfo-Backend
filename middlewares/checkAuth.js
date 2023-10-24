const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  if (req.url === '/login' || req.url === '/signup' ) {
    next();
  } else {
    try {
      const token = req.headers.authorization.replace(/Bearer /ig, '');
      const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      
      if (decode) {
        next();
      }
    } catch (err) {
      res.status(401).json({ error: 'Authentication failed!' });
    }
  }
}
