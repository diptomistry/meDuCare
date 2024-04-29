import pool from '../database.js';

async function verifyToken(req, res, next) {
  try {
    // 1. Get and validate authorization header
    const authHeader = req.headers.authorization;
 //   console.log(authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res.status(200).json({ message: 'Unauthorized: Missing or invalid token' });
    }

    // 2. Extract token
    const token = authHeader.split(' ')[1];
   // console.log(token);

    // 3. Verify token with single query
    const [rows] = await pool.execute('SELECT * FROM Users WHERE Token = ?', [token]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // 4. Check for session expiry
    const now = Date.now();
    if (rows[0].expiry < now) {
      return res.status(401).json({ message: 'Unauthorized: Session expired' });
    }

    // 5. Attach user ID to request object
    req.userId = rows[0].UserID;

    // 6. Proceed to next middleware
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export default verifyToken;
