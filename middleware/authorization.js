const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = async(req, res, next) => {
    try {
        const jwtToken = req.header('token');
        if (!jwtToken) {
            return res.status(403).json('Not Authorized');
        }
        const payload = jwt.verify(jwtToken, process.env.jwtSecret);
        console.log('PAYLOAD: ', payload)
        req.user = payload.user;
        console.log('REQ USER: ', req.user)
        next();
    } catch (error) {
        console.log('ERROR: ', error);
        return res.status(403).json('Not Authorized');
    }
}