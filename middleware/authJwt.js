const jwt = require("jsonwebtoken");
const secret_key = "secret_this_should_be_longer_ini_udah_panjang_banget";

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (authHeader) {
        const token = authHeader;
        console.log(token);
        jwt.verify(token, secret_key, (err) => {
            if (err) {
                return res.status(403).json({ 'message': 'token not found' });
            }


            next();
        });
    } else {
        res.sendStatus(401);
    }
};

const authJwt = {
    authenticateJWT,
};
module.exports = authJwt.authenticateJWT;