const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {

    const token = req.header('ath-token');

    if (!token) res.status(401).json({
        error: ['acces Denied !']
    });
    try {
        let verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (ex) {
        res.status(400).json({
            error: ['Invalid Token!']
        });
    }
}