const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
    const { token } = req.headers;
    if (token) {
        const {uid} = jwt.decode(token);
        req.body.uid = uid;
        next();
    } else {
        res.status(400).send({ msg: "login required" });
    }
}
module.exports = { authentication };