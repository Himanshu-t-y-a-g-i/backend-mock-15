const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
    const { token, boardid, taskid } = req.headers;
    if (token) {
        const { uid } = jwt.decode(token);
        req.body.uid = uid;
        req.body.boardid = boardid;
        req.body.taskid = taskid;
        next();
    } else {
        res.status(400).send({ msg: "login required" });
    }
}
module.exports = { authentication };