const { verifyAccessToken } = require('../middlewares/tokenUtils');

exports.authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  const decoded = verifyAccessToken(token);
  if (!decoded) {
    return res.status(403).json({ message: 'Invalid token' });
  }

  req.user = decoded;
  next();
};
