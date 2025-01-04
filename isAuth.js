const jwt = require("jsonwebtoken");
const { User } = require("../config/myDataBase");

// Middleware to verify access tokens
exports.verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authorization header is invalid" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Access token missing" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findById(decoded.userId);
        if (!user || user.lastPasswordChange > decoded.iat * 1000) {
            return res.status(401).json({ message: "Token is invalid or expired" });
        }

        req.user = user; // Pass user data to the request
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Access token expired", expiredAt: error.expiredAt });
        }
        console.error(error);
        return res.status(403).json({ message: "Token verification failed" });
    }
};

// Controller to handle refresh token
exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token is required" });
        }

        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);

        // Fetch user and validate
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        // Generate new tokens
        const accessToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '15m' });
        const newRefreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_SECRET_KEY, { expiresIn: '7d' });

        return res.status(200).json({
            message: "Tokens refreshed",
            accessToken,
            refreshToken: newRefreshToken,
        });
    } catch (error) {
        console.error("Token verification error:", error.message);
        return res.status(403).json({ message: "Invalid or expired refresh token" });
    }
};
