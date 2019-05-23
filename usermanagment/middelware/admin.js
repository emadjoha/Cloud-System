const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = function (req, res, next) {
    /// 401 un-authoriazted
    /// 403 Forbidden
    /// 404
    // forget edit condition with  !req.user.isAdmin permission
    if (req.user.isAdmin) {
      return  res.status(403).send("Access Denied");
    }
    next();

}