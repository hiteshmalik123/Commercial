import jwt from 'jsonwebtoken';

export const authmiddleware = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).send('No token provided');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).send('Invalid token format');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded); // Log decoded token

      if (roles.length && !roles.includes(decoded.role)) {
        console.log('Access denied. User role:', decoded.role); // Log denied access and role
        return res.status(403).send('Access denied: insufficient role');
      }

      req.user = decoded;
      next();
    } catch (error) {
      console.log('Token verification error:', error); // Log detailed error
      return res.status(500).send('Invalid token');
    }
  };
};
