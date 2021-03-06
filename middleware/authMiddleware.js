var jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // get token
    const token = req.header("token");

    // return error if token doesn't exist
    if (!token) {
        return res.status(401).json({ message: "Token is missing" });
    }

    // verify token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        } else {
            req.decodedUser = decodedToken.userData;
            next();
        }
    })

}

module.exports = authMiddleware;