// middleware/adminMiddleware.js
import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  try {
    let token;
    
    // Get token from header or cookies
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
    
    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: 'Not authorized to access this route' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Set user in request
    req.user = {
      id: decoded.id,
      role: decoded.role
    };
    
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }
};

export const authorizeAdmin = (req, res, next) => {
  // Check if user exists and has admin role
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access forbidden: Admin role required' });
  }
  
  next();
};