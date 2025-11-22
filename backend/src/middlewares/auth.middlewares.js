const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token; 
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // OLD APIs still work (they use req.userId)
    req.userId = decoded.id;

    // NEW APIs (Habits, Habit Logs) use req.user.id
    req.user = { id: decoded.id };

    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
