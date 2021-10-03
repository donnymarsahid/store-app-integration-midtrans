const jwt = require('jsonwebtoken');

exports.authToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).send({ message: 'Access denied' });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).send({ message: 'invalid token' });
  }
};

exports.permission = (permission) => {
  return (req, res, next) => {
    const userStatus = req.user.status;
    if (permission.includes(userStatus)) {
      next();
    } else {
      res.status(401).send({ message: 'you dont have permission' });
    }
  };
};
